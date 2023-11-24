using DeltaDrive.Dto;
using DeltaDrive.Models;

namespace DeltaDrive.Interfaces.Services
{
    public interface IVehicleService
    {
        Task<IEnumerable<Vehicle>> GetAllVehiclesAsync();
        Task<Vehicle> GetVehicleByIdAsync(int id);
        Task<IEnumerable<Ride>> GetHistoryAsync(String id);
        Task<Ride> BookVehicleAsync(BookVehicleDTO request);
        Task<Ride> FinishRideAsync(int rideId);
    }
}
