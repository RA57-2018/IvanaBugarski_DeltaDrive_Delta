using DeltaDrive.Dto;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Models;
using Microsoft.AspNetCore.Mvc;

namespace DeltaDrive.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehicleController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IVehicleService _vehicleService;

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
        public async Task<IActionResult> GetVehicleByIdAsync(String id)
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

        [HttpGet("/getHistory")]
        public async Task<IEnumerable<Ride>> GetHistoryAsync()
        {
            IEnumerable<Ride> ride = await _vehicleService.GetHistoryAsync();
            return ride;
        }

        [HttpPost("/bookVehicle")]
        public async Task<IActionResult> BookVehicleAsync([FromBody] BookVehicleDTO request)
        {
            try
            {
                var bookVehicle = await _vehicleService.BookVehicleAsync(request);
                return Ok(bookVehicle);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("/approveBookVehicle")]
        public async Task<IActionResult> ApproveBookVehicleAsync([FromBody] BookVehicleDTO request)
        {
            try
            {
                var bookVehicle = await _vehicleService.ApproveBookVehicleAsync(request);
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
            try
            {
                var comment = await _commentService.AddCommentAsync(request.Rating, request.Content);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
