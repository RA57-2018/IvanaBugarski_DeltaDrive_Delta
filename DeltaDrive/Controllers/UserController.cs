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
        public IActionResult Post(RegistrationDTO registrationDTO)
        {
            try
            {
                if (userService.registration(registrationDTO))
                {
                    Console.WriteLine("Registration successfull");
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error");
            }
            return Ok(true);
        }
    }
}
