using DeltaDrive.Dto;
using DeltaDrive.Interfaces.Repositories;
using DeltaDrive.Interfaces.Services;
using DeltaDrive.Models;
using System.Text;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace DeltaDrive.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public Task<User> RegisterAsync(RegistrationDTO registrationDTO)
        {
            return _userRepository.RegisterUserAsync(registrationDTO);
        }

        public async Task<IResult> LoginUser(UserLoginDTO login)
        {
            string accessToken = "";
            string refreshToken = "";
            User currentUser = null;
            var userFound = await _userRepository.LoginUserAsync(login);

            accessToken = GenerateAccessToken(login.Email);
            refreshToken = GenerateRefreshToken();
            currentUser = userFound;

            return Results.Ok(new LoginResponseDTO
            {
                Access = accessToken,
                Refresh = refreshToken,
                User = currentUser
            });
        }

        private string GenerateAccessToken(string email)
        {
            var key = GenerateRandomString(50);
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));

            var expirationTime = DateTime.UtcNow.AddHours(1);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email)
            };

            var token = new JwtSecurityToken(
                issuer: "smtp.mailtrap.live",
                audience: "userservice",
                claims: claims,
                expires: expirationTime,
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256)
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenString;
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

        private string GenerateRandomString(int length)
        {
            const string validChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

            using (var rng = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[length];
                rng.GetBytes(randomBytes);

                var stringBuilder = new StringBuilder(length);

                foreach (byte randomByte in randomBytes)
                {
                    stringBuilder.Append(validChars[randomByte % validChars.Length]);
                }

                return stringBuilder.ToString();
            }
        }
    }
}
