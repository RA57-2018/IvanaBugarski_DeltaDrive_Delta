using DeltaDrive.Models;

namespace DeltaDrive.Dto
{
    public class LoginResponseDTO
    {
        public string Access { get; set; }
        public string Refresh { get; set; }
        public User User { get; set; }
    }
}
