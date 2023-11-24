using DeltaDrive.Dto;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Models;

namespace DeltaDrive.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _vehicleRepository;

        public VehicleService(IVehicleRepository vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public async Task<IEnumerable<Vehicle>> GetAllVehiclesAsync()
        {
            return await _vehicleRepository.GetAllVehiclesAsync();
        }

        public async Task<Vehicle> GetVehicleByIdAsync(int id)
        {
            return await _vehicleRepository.GetVehicleByIdAsync(id);
        }

        public async Task<IEnumerable<Ride>> GetHistoryAsync(String id)
        {
            return await _vehicleRepository.GetHistoryAsync(id);
        }

        public async Task<Ride> BookVehicleAsync(BookVehicleDTO request)
        {
            return await _vehicleRepository.BookVehicleAsync(request);
        }

        public async Task<Ride> FinishRideAsync(int rideId)
        {
            return await _vehicleRepository.FinishRideAsync(rideId);
        }
    }
}
