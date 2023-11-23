using DeltaDrive.Dto;
using DeltaDrive.Models;
using DeltaDrive.Services;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDrive.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost("registration")]
        public async Task<IActionResult> RegisterAsync(RegistrationDTO registrationDTO)
        {
            try
            {
                var registeredUser = await userService.RegisterAsync(registrationDTO);

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

        [HttpPost("token")]
        public async Task<IActionResult> GetToken([FromBody] UserLoginDTO userDto)
        {
            var user = await userService.LoginUser(userDto);
            return Ok(user);
        }
    }
}
