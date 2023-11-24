using DeltaDrive.Dto;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Models;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDrive.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IVehicleService _vehicleService;
        private readonly Random _random = new Random();

        public VehicleController(ICommentService commentService, IVehicleService vehicleService)
        {
            _commentService = commentService;
            _vehicleService = vehicleService;
        }

        [HttpGet("/getAllVehicles")]
        public async Task<IEnumerable<Vehicle>> GetAllVehiclesAsync()
        {
            IEnumerable<Vehicle> vehicles = await _vehicleService.GetAllVehiclesAsync();
            return vehicles;
        }

        [HttpGet("/getVehiclesById/{id}")]
        public async Task<IActionResult> GetVehicleByIdAsync(int id)
        {
            try
            {
                var vehicle = await _vehicleService.GetVehicleByIdAsync(id);

                if (vehicle == null)
                {
                    return NotFound($"Vehicle with ID {id} not found");
                }

                return Ok(vehicle);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("/getHistory/{id}")]
        public async Task<IEnumerable<Ride>> GetHistoryAsync(String id)
        {
            IEnumerable<Ride> ride = await _vehicleService.GetHistoryAsync(id);
            return ride;
        }

        [HttpPost("/bookVehicle")]
        public async Task<IActionResult> BookVehicleAsync([FromBody] BookVehicleDTO request)
        {
            try
            {
                // Simulate a 25% chance of rejection
                bool isRejected = _random.Next(0, 100) < 25;

                if (isRejected)
                {
                    return BadRequest("Driver rejected the request");
                }

                var bookVehicle = await _vehicleService.BookVehicleAsync(request);
                return Ok(bookVehicle);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("/sendFeedback")]
        public async Task<IActionResult> AddCommentAsync([FromBody] CommentDTO request)
        {
            Console.WriteLine($"Received request");
            try
            {
                var comment = await _commentService.AddCommentAsync(request.Rating, request.Content, request.RideId);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
