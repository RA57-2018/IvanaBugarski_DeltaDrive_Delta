using DeltaDrive.Database;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Repositories;
using DeltaDrive.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "CorsPolicy",
        builder => builder
            .SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
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
    // Configure the HTTP request pipeline.
    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
    }

    app.UseCors("CorsPolicy");

    app.UseRouting();
    // Comment out the following line to disable HTTPS redirection
    // app.UseHttpsRedirection();
    app.UseStaticFiles();

    // Add this line to enable MVC routes
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
