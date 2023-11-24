namespace DeltaDrive.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public String Content { get; set; }
        public int Rating { get; set; }
        public Boolean IsDeleted { get; set; }
        public int RideId { get; set; }

        public Comment() { }
        public Comment(int rating, String content, int rideId)
        {
            Rating = rating;
            Content = content;
            RideId = rideId;
        }   
    }
}
