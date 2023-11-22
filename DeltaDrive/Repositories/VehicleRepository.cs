using DeltaDrive.Database;
using DeltaDrive.Dto;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Models;
using Microsoft.EntityFrameworkCore;

namespace DeltaDrive.Repositories
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly MyDbContext _dbContext;

        public VehicleRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Vehicle>> GetAllVehiclesAsync()
        {
            IEnumerable<Vehicle> vehicles = await _dbContext.Vehicles.ToListAsync();
            return vehicles;
        }

        public async Task<Vehicle> GetVehicleByIdAsync(String id)
        {
            return await _dbContext.Vehicles.Where(x => x.Id == id && !x.IsDeleted).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Ride>> GetHistoryAsync()
        {
            IEnumerable<Ride> ride = await _dbContext.Ride.ToListAsync();
            return ride;
        }

        public async Task<Vehicle> BookVehicleAsync(BookVehicleDTO request)
        {
            Vehicle vehicle = new Vehicle();
            vehicle.UserId = request.User.Id;
            vehicle.RequestSend = true;
            return vehicle;
        }

        public async Task<Vehicle> ApproveBookVehicleAsync(BookVehicleDTO request)
        {
            Vehicle vehicle = new Vehicle();
            vehicle.UserId = request.User.Id;
            vehicle.Available = true;
            return vehicle;
        }
    }
}
