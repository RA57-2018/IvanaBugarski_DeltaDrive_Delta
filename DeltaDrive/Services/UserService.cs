using DeltaDrive.Dto;
using DeltaDrive.Models;

namespace DeltaDrive.Services
{
    public class UserService
    {
        public UserService() { }

        public Boolean registration(RegistrationDTO registrationDTO)
        {
            User user = new User(registrationDTO);
            user.Role = Role.PASSENGER;
            Console.WriteLine(user);

            return true;
        }
    }
}
