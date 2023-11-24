using DeltaDrive.Models;

namespace DeltaDrive.Dto
{
    public class BookVehicleDTO
    {
        public int Id { get; set; }
        public String UserId { get; set; }
        public String StartingLocation { get; set; }
        public String EndingLocation { get; set; }
        public String TotalPrice { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
    }
}
