namespace DeltaDrive.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public String Content { get; set; }
        public int Rating { get; set; }
        public Boolean IsDeleted { get; set; }

        public Comment(int rating, String content)
        {
            Rating = rating;
            Content = content;
        }   
    }
}
