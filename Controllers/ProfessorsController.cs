
using KinstonBackend.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProfessorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ProfessorsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get pending professors (IsActive == false)
    [HttpGet("pending")]
    public IActionResult GetPendingProfessors()
    {
        var pendingProfessors = _context.Users
            .Where(u => u.Role == "Professor" && u.IsActive == false) // Using bool comparison
            .ToList();

        return Ok(pendingProfessors);
    }

    // Approve a professor (set IsActive to true)
    [HttpPost("approve/{id}")]
    public IActionResult ApproveProfessor(int id)
    {
        var professor = _context.Users.FirstOrDefault(u => u.UserId == id && u.Role == "Professor"); // Using correct property

        if (professor == null)
        {
            return NotFound();
        }

        professor.IsActive = true;
        _context.SaveChanges();
        return Ok();
    }

    // Reject a professor (delete from DB or handle as needed)
    [HttpPost("reject/{id}")]
    public IActionResult RejectProfessor(int id)
    {
        var professor = _context.Users.FirstOrDefault(u => u.UserId == id && u.Role == "Professor"); // Using correct property

        if (professor == null)
        {
            return NotFound();
        }

        _context.Users.Remove(professor);
        _context.SaveChanges();
        return Ok();
    }
}

