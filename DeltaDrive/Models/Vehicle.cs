namespace DeltaDrive.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public String Brand { get; set; }
        public Double Distance { get; set; }
        public Double Rating { get; set; }
        public Double StartingPrice { get; set; }
        public Double PricePerKm { get; set; }
        public Double TotalPrice { get; set; }
        public Boolean IsDeleted { get; set; }
        public Boolean IsAvailable { get; set; }
        public Comment Comment { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public Location CurrentLocation { get; set; }
    }
}
