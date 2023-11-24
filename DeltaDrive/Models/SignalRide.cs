using Microsoft.AspNetCore.SignalR;

namespace DeltaDrive.Models
{
    public class SignalRide : Hub
    {
        public async Task SendLocationUpdate(String driverId, Double latitude, Double longitude)
        {
            await Clients.All.SendAsync("ReceiveLocationUpdate", driverId, latitude, longitude);
        }
    }
}
