using DeltaDrive.Database;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Models;

namespace DeltaDrive.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly MyDbContext _dbContext;

        public CommentRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Comment> AddCommentAsync(Comment comment)
        {
            Comment newComment = new Comment();
            newComment.Id = 1;
            newComment.Content = comment.Content;
            newComment.Rating = comment.Rating;
            newComment.IsDeleted = false;
            _dbContext.Comments.Add(newComment);
            await _dbContext.SaveChangesAsync();
            return comment;
        }
    }
}
