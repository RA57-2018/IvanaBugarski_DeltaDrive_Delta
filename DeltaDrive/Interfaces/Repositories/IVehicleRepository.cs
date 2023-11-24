using DeltaDrive.Dto;
using DeltaDrive.Models;

namespace DeltaDrive.Interfaces.Repositories
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetAllVehiclesAsync();
        Task<Vehicle> GetVehicleByIdAsync(int id);
        Task<IEnumerable<Ride>> GetHistoryAsync();
        Task<Vehicle> BookVehicleAsync(BookVehicleDTO request);
        Task<Vehicle> ApproveBookVehicleAsync(BookVehicleDTO request);
    }
}
