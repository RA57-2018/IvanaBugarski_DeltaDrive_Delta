using DeltaDrive.Dto;

namespace DeltaDrive.Models
{
    public class User
    {
        public User(RegistrationDTO registrationDTO)
        {
            FirstName = registrationDTO.FirstName;
            LastName = registrationDTO.LastName;
            Email = registrationDTO.Email;
            Password = registrationDTO.Password;
            BirthdayDate = registrationDTO.BirthdayDate;
        }

        public int Id { get; set; }
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public String Email { get; set; }
        public String Password { get; set; }
        public DateTime BirthdayDate { get; set; }
        public Role Role { get; set; }
        public Boolean IsDeleted { get; set; }
    }
}
