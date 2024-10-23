using KinstonBackend.Data;
using KinstonBackend.DTOs;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace KinstonBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Register a new professor or student
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
                return BadRequest("User with this email already exists.");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);
            user.IsActive = false; // Account needs admin approval
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Notify admin to approve/reject
            NotifyAdmin(user);

            return Ok("User registered successfully. Awaiting admin approval.");
        }

        private void NotifyAdmin(User user)
        {
            // Logic to notify admin of new registration (e.g., via email or system notification)
            // This can be extended to include email or real-time notifications.
        }

        // Activate or reject user by Admin
        [HttpPut("activate-user/{id}")]
        public async Task<IActionResult> ActivateUser(int id, [FromQuery] bool approve)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound("User not found.");

            if (approve)
            {
                user.IsActive = true;
                return Ok("User approved successfully.");
            }
            else
            {
                user.IsActive = false;
                return Ok("User rejected.");
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
        /*
        // User login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDto loginDto)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials.");

            if (!user.IsActive)
                return Unauthorized("Your account is not approved yet.");

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("YourSuperSecretKey1234567890123456");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("id", user.UserId.ToString()),
                    new Claim("role", user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token valid for 1 hour
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new
            {
                token = tokenString,
                role = user.Role,
                username = user.Name
            });
        }*/
        // User login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequestDto loginDto)
        {
            var user = _context.Users.SingleOrDefault(u => u.Email == loginDto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                return Unauthorized("Invalid credentials.");

            if (!user.IsActive)
                return Unauthorized("Your account is not approved yet.");

            // Generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("YourSuperSecretKey1234567890123456");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
            new Claim("id", user.UserId.ToString()),
            new Claim("role", user.Role)
        }),
                Expires = DateTime.UtcNow.AddHours(1), // Token valid for 1 hour
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // Include UserId in the response
            return Ok(new
            {
                token = tokenString,
                role = user.Role,
                username = user.Name,
                userId = user.UserId // Include UserId in the response
            });
        }




    }
}


/* -- displays email and name in professor side --


// User login
[HttpPost("login")]
public IActionResult Login([FromBody] LoginRequestDto loginDto)
{
    var user = _context.Users.SingleOrDefault(u => u.Email == loginDto.Email);

    if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
        return Unauthorized("Invalid credentials.");

    if (!user.IsActive)
        return Unauthorized("Your account is not approved yet.");

    // Generate JWT Token
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.UTF8.GetBytes("YourSuperSecretKey1234567890123456");
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new[]
        {
    new Claim("id", user.UserId.ToString()),
    new Claim("role", user.Role)
}),
        Expires = DateTime.UtcNow.AddHours(1), // Token valid for 1 hour
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };

    var token = tokenHandler.CreateToken(tokenDescriptor);
    var tokenString = tokenHandler.WriteToken(token);

    return Ok(new
    {
        token = tokenString,
        role = user.Role,
        username = user.Name,
        userId = user.UserId // Adding UserId to the response
    });
}
*/


