using DeltaDrive.Dto;

namespace DeltaDrive.Models
{
    public class User
    {
        public String Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public DateTime BirthdayDate { get; set; }
        public Role RoleId { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}
