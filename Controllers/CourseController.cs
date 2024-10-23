/*
 * 
using KinstonBackend.Data;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace KinstonBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Course>> GetCourses()
        {
            return _context.Courses.Where(c => c.IsApproved == false).ToList(); // Return only pending courses
        }

        [HttpPost]
        public IActionResult CreateCourse([FromBody] Course course)
        {
            if (course == null)
                return BadRequest();

            course.IsApproved = false; // Mark as pending approval
            _context.Courses.Add(course);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCourses), new { id = course.CourseId }, course);
        }

        // Approve or reject a course
        [HttpPost("approve/{id}")]
        public IActionResult ApproveCourse(int id)
        {
            var course = _context.Courses.Find(id);
            if (course == null)
                return NotFound();

            course.IsApproved = true;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("reject/{id}")]
        public IActionResult RejectCourse(int id)
        {
            var course = _context.Courses.Find(id);
            if (course == null)
                return NotFound();

            _context.Courses.Remove(course);
            _context.SaveChanges();

            return Ok();
        }

        // Method to get the next module of a course
        [HttpGet("{courseId}/modules/{moduleId}/next")]
        public ActionResult<KinstonBackend.Models.Module> GetNextModule(int courseId, int moduleId)
        {
            var modules = _context.Modules.Where(m => m.CourseId == courseId).OrderBy(m => m.ModuleId).ToList();
            var currentModule = modules.FirstOrDefault(m => m.ModuleId == moduleId);

            if (currentModule == null)
            {
                return NotFound();
            }

            int currentIndex = modules.IndexOf(currentModule);
            if (currentIndex == -1 || currentIndex == modules.Count - 1)
            {
                return NotFound("This is the last module.");
            }

            return modules[currentIndex + 1]; // Move to the next module
        }
    }
}
*/


/* -- worknn 
 * 
using KinstonBackend.Data;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace KinstonBackend.Controllers
{
    [Route("api/courses")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Course>> GetCourses()
        {
            // Return all approved courses for students
            return _context.Courses.Where(c => c.IsApproved).ToList();
        }

        [HttpPost]
        public IActionResult CreateCourse([FromBody] Course course)
        {
            if (course == null)
                return BadRequest("Course details are required.");

            course.IsApproved = false; // Mark as pending approval
            _context.Courses.Add(course);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCourses), new { id = course.CourseId }, course);
        }

        [HttpPost("approve/{id}")]
        public IActionResult ApproveCourse(int id)
        {
            var course = _context.Courses.Find(id);
            if (course == null)
                return NotFound();

            course.IsApproved = true;
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("reject/{id}")]
        public IActionResult RejectCourse(int id)
        {
            var course = _context.Courses.Find(id);
            if (course == null)
                return NotFound();

            _context.Courses.Remove(course);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("{courseId}/modules")]
        public ActionResult<IEnumerable<Module>> GetModules(int courseId)
        {
            return _context.Modules.Where(m => m.CourseId == courseId).ToList();
        }
    }
}
*/


using KinstonBackend.Data;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace KinstonBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize(Roles = "Admin,Professor")] // Only Admin and Professors can create courses
    public class CoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/courses
        [HttpGet]
        public ActionResult<IEnumerable<Course>> GetCourses()
        {
            // Return all approved courses
            var courses = _context.Courses.Where(c => c.IsApproved).ToList();
            return Ok(courses);
        }

        // POST: api/courses
        [HttpPost]
      // [Authorize(Roles = "Professor")] // Professors can create courses
        public IActionResult CreateCourseWithModules([FromBody] CourseCreationRequest request)
        {
            if (request == null)
                return BadRequest("Course and module details are required.");

            // Create a new Course
            var course = new Course
            {
                Title = request.Title,
                Description = request.Description,
                ProfessorId = request.ProfessorId, // Assigning the Professor who is creating the course
                StartDate = request.StartDate,
                EndDate = request.EndDate,
                Price = request.Price,
                IsApproved = false, // Course pending approval
                EnrollmentCount = 0
            };

            _context.Courses.Add(course);
            _context.SaveChanges();

            // Add the provided modules to the course
            foreach (var module in request.Modules)
            {
                var newModule = new Module
                {
                    Title = module.Title,
                    Content = module.Content,
                    CourseId = course.CourseId, // Linking to the newly created course
                    Order = module.Order // Optional: Use if you want to enforce ordering of modules
                };
                _context.Modules.Add(newModule);
            }

            _context.SaveChanges();

            return CreatedAtAction(nameof(GetCourses), new { id = course.CourseId }, course);
        }


        /*
        // POST: api/courses/approve/{id}
        [HttpPost("approve/{id}")]
    //    [Authorize(Roles = "Admin")] // Only Admin can approve a course
        public IActionResult ApproveCourse(int id)
        {
            var course = _context.Courses.Find(id);
            if (course == null)
                return NotFound("Course not found.");

            course.IsApproved = true;
            _context.SaveChanges();

            return Ok("Course approved successfully.");
        }

        // POST: api/courses/reject/{id}
        [HttpPost("reject/{id}")]
       // [Authorize(Roles = "Admin")] // Only Admin can reject a course
        public IActionResult RejectCourse(int id)
        {
            var course = _context.Courses.Find(id);
            if (course == null)
                return NotFound("Course not found.");

            _context.Courses.Remove(course);
            _context.SaveChanges();

            return Ok("Course rejected and deleted successfully.");
        }*/
        // Add endpoints for approving or rejecting courses
        [HttpPut("approve/{id}")]
        public IActionResult ApproveCourse(int id)
        {
            var course = _context.Courses.Find(id);

            if (course == null)
                return NotFound();

            course.IsApproved = true;
            _context.SaveChanges();

            return Ok("Course approved.");
        }

        [HttpPut("reject/{id}")]
        public IActionResult RejectCourse(int id)
        {
            var course = _context.Courses.Find(id);

            if (course == null)
                return NotFound();

            _context.Courses.Remove(course);
            _context.SaveChanges();

            return Ok("Course rejected and removed.");
        }

















        // GET: api/courses/{courseId}/modules
        [HttpGet("{courseId}/modules")]
   //     [Authorize] // Only authorized users can view course modules
        public ActionResult<IEnumerable<Module>> GetModules(int courseId)
        {
            var modules = _context.Modules.Where(m => m.CourseId == courseId).ToList();
            return Ok(modules);
        }

        // GET: api/courses/pending
        [HttpGet("pending")]
        public IActionResult GetPendingCourses()
        {
            var pendingCourses = _context.Courses
                                         .Where(c => c.IsApproved == false)
                                         .ToList();
            return Ok(pendingCourses);
        }


        // Fetch approved courses (IsApproved == 1)
        [HttpGet("approved")]
        public IActionResult GetApprovedCourses()
        {
            var approvedCourses = _context.Courses
                .Where(c => c.IsApproved == true)
                .Select(c => new
                {
                    c.CourseId,
                    c.Title,
                    c.StartDate,
                    c.EndDate,
                    c.Price
                })
                .ToList();

            return Ok(approvedCourses);
        }

        [HttpGet("professor/{professorId}/courses")]
        public IActionResult GetCoursesWithEnrollmentCount(int professorId)
        {
            // Fetch courses created by this professor with enrollment count
            var courses = _context.Courses
                .Where(c => c.ProfessorId == professorId)
                .Select(c => new
                {
                    c.CourseId,
                    c.Title,
                    c.StartDate,
                    c.EndDate,
                    c.Price,
                    EnrollmentCount = _context.Enrollments.Count(e => e.CourseId == c.CourseId)
                })
                .ToList();

            return Ok(courses);
        }


    }
}

/*
      // In CoursesController.cs
      [HttpGet("{courseId}/modules")]
      public IActionResult GetModulesByCourseId(int courseId)
      {
          var modules = _context.Modules
              .Where(m => m.CourseId == courseId)
              .Select(m => new
              {
                  m.ModuleId,
                  m.Title,
                  m.Content,
                  m.Order
              })
              .ToList();

          return Ok(modules);
      }

      */