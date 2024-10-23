
using KinstonBackend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace KinstonBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all professors and students pending approval (IsActive = false)
        [HttpGet("pending-approvals")]
        public IActionResult GetPendingUsers()
        {
            var pendingUsers = _context.Users
                .Where(u => !u.IsActive && (u.Role == "Professor" || u.Role == "Student"))
                .ToList();

            return Ok(pendingUsers);
        }

        // Approve or reject user by ID
        [HttpPut("approve-user/{id}")]
        public IActionResult ApproveUser(int id, [FromQuery] bool approve)
        {
            var user = _context.Users.Find(id);

            if (user == null)
                return NotFound();

            user.IsActive = approve;
            _context.SaveChanges();

            return Ok(approve ? "User approved." : "User rejected.");
        }
    }
}