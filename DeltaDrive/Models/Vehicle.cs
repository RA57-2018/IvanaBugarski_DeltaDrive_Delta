using System.ComponentModel.DataAnnotations;

namespace DeltaDrive.Models
{
    public class Vehicle
    {
        [Key]
        public int Id { get; set; }
        public String brand { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String latitude { get; set; }
        public String longitude { get; set; }
        public String startPrice { get; set; }
        public String pricePerKM { get; set; }
        public Boolean IsDeleted { get; set; }
        public Boolean Available { get; set; }
        public String UserId { get; set; }
        public Boolean RequestSend { get; set; }

        public void SetAvailableRandomly()
        {
            Random random = new Random();
            Available = random.Next(2) == 0;
        }
    }
}
