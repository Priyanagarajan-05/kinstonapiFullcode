

using KinstonBackend.Data;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StudentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get pending students (IsActive == false)
    [HttpGet("pending")]
    public IActionResult GetPendingStudents()
    {
        var pendingStudents = _context.Users
            .Where(u => u.Role == "Student" && u.IsActive == false) // Using bool comparison
            .ToList();

        return Ok(pendingStudents);
    }

    // Approve a student (set IsActive to true)
    [HttpPost("approve/{id}")]
    public IActionResult ApproveStudent(int id)
    {
        var student = _context.Users.FirstOrDefault(u => u.UserId == id && u.Role == "Student"); // Using correct property

        if (student == null)
        {
            return NotFound();
        }

        student.IsActive = true;
        _context.SaveChanges();
        return Ok();
    }

    // Reject a student (delete from DB or handle as needed)
    [HttpPost("reject/{id}")]
    public IActionResult RejectStudent(int id)
    {
        var student = _context.Users.FirstOrDefault(u => u.UserId == id && u.Role == "Student"); // Using correct property

        if (student == null)
        {
            return NotFound();
        }

        _context.Users.Remove(student);
        _context.SaveChanges();
        return Ok();
    }



    // Fetch student details by username
    // Fetch student details by email instead of username
    [HttpGet("details/{email}")]
    public IActionResult GetStudentDetails(string email)
    {
        var student = _context.Users
            .Where(u => u.Role == "Student" && u.Email == email) // Use Email instead
            .Select(u => new
            {
                u.UserId,
                u.Name,
                u.Email
            })
            .FirstOrDefault();

        if (student == null)
        {
            return NotFound();
        }

        return Ok(student);
    }

    // completed course display in the studnet side


}
