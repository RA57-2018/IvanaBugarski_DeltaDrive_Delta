using DeltaDrive.Database;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Repositories;
using DeltaDrive.Services;
using Microsoft.EntityFrameworkCore;
using CsvHelper;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using DeltaDrive.Models;
using Microsoft.Extensions.DependencyInjection;
using CsvHelper.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();

// Add services to the container.
builder.Services.AddRazorPages();

var connectionString = builder.Configuration.GetValue<string>("ConnectionString");
connectionString += ";Include Error Detail=true";

builder.Services.AddDbContext<MyDbContext>(options => options.UseNpgsql(connectionString));

// Add MVC services
builder.Services.AddControllers();

//repositories
builder.Services.AddTransient<ICommentRepository, CommentRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IVehicleRepository, VehicleRepository>();

//services
builder.Services.AddTransient<ICommentService, CommentService>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IVehicleService, VehicleService>();

//builder.Services.AddHttpClient("ServiceOneNotify");

builder.Services.AddSignalR();

var app = builder.Build();

// Exception handling for service construction
try
{
    var env = app.Environment;

    if (env.IsDevelopment())
    {
        app.UseDeveloperExceptionPage();
    }
    else
    {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
    }

   using (var reader = new StreamReader("delta-drive.csv"))
{
    using (var csv = new CsvReader(reader, new CsvConfiguration(CultureInfo.InvariantCulture)))
    {
        csv.Context.RegisterClassMap<DataMap>();
        var records = csv.GetRecords<Vehicle>().Take(1000).ToList();

        using (var scope = app.Services.CreateScope())
        {
            var dbContext = scope.ServiceProvider.GetRequiredService<MyDbContext>();

            foreach (var dataRecord in records)
            {
                var vehicle = new Vehicle
                {
                    brand = dataRecord.brand,
                    firstName = dataRecord.firstName,
                    lastName = dataRecord.lastName,
                    latitude = dataRecord.latitude,
                    longitude = dataRecord.longitude,
                    startPrice = dataRecord.startPrice,
                    pricePerKM = dataRecord.pricePerKM,
                    IsDeleted = false,
                    UserId = "default",
                    RequestSend = false
                };
                vehicle.SetAvailableRandomly();
                dbContext.Vehicles.Add(vehicle);
            }

            dbContext.SaveChanges();
        }
    }
}

    app.UseCors("AllowAll");

    app.UseRouting();

    // Uncomment the following line to enable HTTPS redirection in production
    // app.UseHttpsRedirection();

    app.UseStaticFiles();

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
        //endpoints.MapHub<SignalRide>("/signalRide");
        endpoints.MapControllers();
    });

    app.Run();
}
catch (AggregateException ex)
{
    foreach (var innerException in ex.InnerExceptions)
    {
        Console.WriteLine($"Exception during service construction: {innerException}");
    }
}
