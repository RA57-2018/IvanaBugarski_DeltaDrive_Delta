using DeltaDrive.Dto;
using DeltaDrive.Models;

namespace DeltaDrive.Interfaces.Services
{
    public interface IUserService
    {
        Task<User> RegisterAsync(RegistrationDTO registrationDTO);
        Task<IResult> LoginUser(UserLoginDTO login);
    }
}
