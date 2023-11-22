using DeltaDrive.Dto;
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

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync(UserLoginDTO login)
        {
            try
            {
                var loginResult = await userService.LoginUser(login);

                if (loginResult != null)
                {
                    return Ok(loginResult);
                }
                else
                {
                    return BadRequest(loginResult);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
}
