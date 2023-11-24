using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Models;

namespace DeltaDrive.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        public CommentService(ICommentRepository commentRepository)
        {
            _commentRepository = commentRepository;
        }

        public async Task<Comment> AddCommentAsync(int rating, string content, int rideId)
        {
            Comment comment = new Comment(rating, content, rideId);

            return await _commentRepository.AddCommentAsync(comment);
        }
    }
}
