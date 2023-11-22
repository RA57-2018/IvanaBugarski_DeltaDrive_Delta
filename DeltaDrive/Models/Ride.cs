namespace DeltaDrive.Models
{
    public class Ride
    {
        public String Id { get; set; }
        public String StartingLocation { get; set; }
        public String EndingLocation { get; set; }
        public Double TotalPrice { get; set; }
        public String UserId { get; set; }
        public User User { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}
