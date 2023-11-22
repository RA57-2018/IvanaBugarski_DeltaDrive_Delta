using DeltaDrive.Dto;
using DeltaDrive.Models;

namespace DeltaDrive.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User> RegisterUserAsync(RegistrationDTO registrationDTO);
        Task<User> LoginUserAsync(UserLoginDTO userLoginDto);
    }
}
