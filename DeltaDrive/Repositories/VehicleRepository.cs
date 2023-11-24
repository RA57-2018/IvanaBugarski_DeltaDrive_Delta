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
            IEnumerable<Vehicle> vehicles = await _dbContext.Vehicles.Take(100).ToListAsync();
            return vehicles;
        }

        public async Task<Vehicle> GetVehicleByIdAsync(int id)
        {
            return await _dbContext.Vehicles.Where(x => x.Id == id && !x.IsDeleted).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<Ride>> GetHistoryAsync(String id)
        {
            IEnumerable<Ride> ride = await _dbContext.Rides.Where(x => x.UserId == id).ToListAsync();
            return ride;
        }

        public async Task<Ride> BookVehicleAsync(BookVehicleDTO request)
        {
            Vehicle vehicle = await _dbContext.Vehicles.FindAsync(request.Id);

            vehicle.UserId = request.UserId;
            vehicle.RequestSend = true;
            _dbContext.Vehicles.Update(vehicle);
            await _dbContext.SaveChangesAsync();

            Ride ride = new Ride
            {
                UserId = request.UserId,
                StartingLocation = request.StartingLocation,
                EndingLocation = request.EndingLocation,
                TotalPrice = request.TotalPrice
            };

            _dbContext.Rides.Add(ride);
            await _dbContext.SaveChangesAsync();

            return ride;
        }


        public async Task<Vehicle> ApproveBookVehicleAsync(BookVehicleDTO request)
        {
            Vehicle vehicle = new Vehicle();
            vehicle.UserId = request.UserId;
            vehicle.Available = true;
            return vehicle;
        }
    }
}
