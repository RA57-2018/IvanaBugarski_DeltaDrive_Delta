namespace DeltaDrive.Models
{
    public class Vehicle
    {
        public String Id { get; set; }
        public String Brand { get; set; }
        public Double StartingPrice { get; set; }
        public Double PricePerKm { get; set; }
        public Boolean IsDeleted { get; set; }
        public Boolean Available { get; set; }
        public String UserId { get; set; }
        public User User { get; set; }
        public Location CurrentLocation { get; set; }
        public Boolean RequestSend { get; set; }
    }
}
