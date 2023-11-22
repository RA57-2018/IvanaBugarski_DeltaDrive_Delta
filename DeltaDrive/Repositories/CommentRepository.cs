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
            _dbContext.Comments.Add(comment);
            await _dbContext.SaveChangesAsync();
            return comment;
        }
    }
}
