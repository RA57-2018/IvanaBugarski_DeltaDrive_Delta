using DeltaDrive.Database;
using DeltaDrive.Dto;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Models;
using Microsoft.EntityFrameworkCore;
using shortid;

namespace DeltaDrive.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _dbContext;

        public UserRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> RegisterUserAsync(RegistrationDTO registrationDTO)
        {
            if (await IsEmailInUseAsync(registrationDTO.Email))
            {
                throw new Exception("Email is already in use.");
            }

            User newUser = new User
            {
                Id = ShortId.Generate(),
                FirstName = registrationDTO.FirstName,
                LastName = registrationDTO.LastName,
                Email = registrationDTO.Email,
                RoleId = Models.Role.PASSENGER,
                Password = registrationDTO.Password,
                BirthdayDate = registrationDTO.BirthdayDate
            };

            User savedUser = (await _dbContext.Users.AddAsync(newUser)).Entity;
            await _dbContext.SaveChangesAsync();

            return savedUser;
        }

        public async Task<User> LoginUserAsync(UserLoginDTO userLoginDto)
        {
            User user = _dbContext.Users.Where(x => x.Email == userLoginDto.Email && x.Password == userLoginDto.Password && !x.IsDeleted).FirstOrDefault();
            return user;
        }

        private async Task<bool> IsEmailInUseAsync(string email)
        {
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
            return existingUser != null;
        }

    }
}
