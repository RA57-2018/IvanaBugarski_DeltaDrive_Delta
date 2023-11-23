using DeltaDrive.Database;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Repositories;
using DeltaDrive.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

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

builder.Services.AddHttpClient("ServiceOneNotify");

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

    app.UseCors("AllowAll");

    app.UseRouting();

    // Uncomment the following line to enable HTTPS redirection in production
    // app.UseHttpsRedirection();

    app.UseStaticFiles();

    app.UseAuthorization();

    app.UseEndpoints(endpoints =>
    {
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
