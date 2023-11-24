using System.ComponentModel.DataAnnotations;

namespace DeltaDrive.Models
{
    public class Data
    {
        [Key]
        public int DataId { get; set; }
        public String brand { get; set; }
        public String firstName { get; set; }
        public String lastName { get; set; }
        public String latitude { get; set; }
        public String longitude { get; set; }
        public String startPrice { get; set; }
        public String pricePerKM { get; set; }
    }
}
