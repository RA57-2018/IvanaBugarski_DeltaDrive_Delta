using DeltaDrive.Models;
using Microsoft.EntityFrameworkCore;

namespace DeltaDrive.Database
{
    public class MyDbContext : DbContext
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Ride> Rides { get; set; }
        public DbSet<Location> Locations { get; set; }

        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) { }

        public MyDbContext(DbContextOptions options, IHttpContextAccessor httpContextAccessor)
            : base(options)
        {
            _httpContextAccessor = httpContextAccessor ??
                throw new ArgumentNullException(nameof(httpContextAccessor));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comment>().HasQueryFilter(m => !m.IsDeleted);
            modelBuilder.Entity<User>().HasQueryFilter(m => !m.IsDeleted);
            modelBuilder.Entity<Vehicle>().HasQueryFilter(m => !m.IsDeleted);
            modelBuilder.Entity<Ride>().HasQueryFilter(m => !m.IsDeleted);
            modelBuilder.Entity<Location>().HasQueryFilter(m => !m.IsDeleted);

            base.OnModelCreating(modelBuilder);
        }
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }
    }
}
