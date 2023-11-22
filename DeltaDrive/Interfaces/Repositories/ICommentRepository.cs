using DeltaDrive.Models;

namespace DeltaDrive.Interfaces.Repositories
{
    public interface ICommentRepository
    {
        Task<Comment> AddCommentAsync(Comment comment);
    }
}
