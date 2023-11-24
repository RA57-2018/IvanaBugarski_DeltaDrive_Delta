using DeltaDrive.Models;

namespace DeltaDrive.Interfaces.Services
{
    public interface ICommentService
    {
        Task<Comment> AddCommentAsync(int rating, string content, int RideId);
    }
}
