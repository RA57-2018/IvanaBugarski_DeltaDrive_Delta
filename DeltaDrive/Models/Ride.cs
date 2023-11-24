namespace DeltaDrive.Models
{
    public class Ride
    {
        public int Id { get; set; }
        public String StartingLocation { get; set; }
        public String EndingLocation { get; set; }
        public String TotalPrice { get; set; }
        public String UserId { get; set; }
        public User User { get; set; }
        public Boolean IsDeleted { get; set; }
        public Boolean IsEnded { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
    }
}
