using DeltaDrive.Dto;
using DeltaDrive.Models;

namespace DeltaDrive.Interfaces.Services
{
    public interface IVehicleService
    {
        Task<IEnumerable<Vehicle>> GetAllVehiclesAsync();
        Task<Vehicle> GetVehicleByIdAsync(String id);
        Task<IEnumerable<Ride>> GetHistoryAsync();
        Task<Vehicle> BookVehicleAsync(BookVehicleDTO request);
        Task<Vehicle> ApproveBookVehicleAsync(BookVehicleDTO request);
    }
}
