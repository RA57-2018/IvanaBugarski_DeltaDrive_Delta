using DeltaDrive.Dto;
using DeltaDrive.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDrive.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost("/registration")]
        public async Task<IActionResult> RegisterAsync([FromBody] RegistrationDTO registrationDTO)
        {
            try
            {
                var registeredUser = await _userService.RegisterAsync(registrationDTO);

                if (registeredUser != null)
                {
                    return Ok(registeredUser);
                }
                else
                {
                    return BadRequest("User registration failed");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("/token")]
        public async Task<IActionResult> GetToken([FromBody] UserLoginDTO userDto)
        {
            var user = await _userService.LoginUser(userDto);
            return Ok(user);
        }
    }
}
