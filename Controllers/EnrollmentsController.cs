/*
using iText.Layout;
using iText.Kernel.Pdf;
using iText.Layout.Element;
using KinstonBackend.Data;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace KinstonBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnrollmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult EnrollInCourse([FromBody] Enrollment enrollment)
        {
            if (enrollment == null)
                return BadRequest("Enrollment details are required.");

            // Check if already enrolled in another course
            var existingEnrollment = _context.Enrollments
                .Any(e => e.StudentId == enrollment.StudentId && e.CourseId == enrollment.CourseId);
            if (existingEnrollment)
                return BadRequest("Already enrolled in this course.");

            _context.Enrollments.Add(enrollment);
            _context.SaveChanges();

            // Increment enrollment count in Course
            var course = _context.Courses.Find(enrollment.CourseId);
            if (course != null)
            {
                course.EnrollmentCount++;
                _context.SaveChanges();
            }

            return CreatedAtAction(nameof(GetMyEnrollments), new { id = enrollment.EnrollmentId }, enrollment);
        }

        [HttpGet("my")]
        public ActionResult<IEnumerable<Enrollment>> GetMyEnrollments(int studentId)
        {
            return _context.Enrollments.Where(e => e.StudentId == studentId).ToList();
        }



        [HttpPut("{enrollmentId}/rating")]
        public IActionResult RateCourse(int enrollmentId, [FromBody] int? rating)
        {
            var enrollment = _context.Enrollments.Find(enrollmentId);
            if (enrollment == null)
            {
                return NotFound();
            }

            enrollment.Rating = rating ?? 0; // If rating is null, set it to 0
            _context.SaveChanges();
            return NoContent(); // Respond with 204 No Content
        }

        // Add this method to EnrollmentsController
        [HttpGet("certificate/{enrollmentId}")]
        public IActionResult GenerateCertificate(int enrollmentId)
        {
            var enrollment = _context.Enrollments.Find(enrollmentId);
            if (enrollment == null)
            {
                return NotFound("Enrollment not found.");
            }

            var course = _context.Courses.Find(enrollment.CourseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            // Create PDF
            using (var stream = new MemoryStream())
            {
                var pdfWriter = new PdfWriter(stream);
                var pdfDocument = new PdfDocument(pdfWriter);
                var document = new Document(pdfDocument);

                // Add content to PDF
                document.Add(new Paragraph("Kinston E-Learning University").SetFontSize(20));
                document.Add(new Paragraph($"Date: {DateTime.Now}").SetFontSize(12));
                document.Add(new Paragraph($"Student Name: {enrollment.Student.Name}").SetFontSize(12));
                document.Add(new Paragraph($"Course Title: {course.Title}").SetFontSize(12));
                document.Add(new Paragraph($"Course Description: {course.Description}").SetFontSize(12));
                document.Add(new Paragraph($"Start Date: {course.StartDate.ToShortDateString()}").SetFontSize(12));
                document.Add(new Paragraph($"End Date: {course.EndDate.ToShortDateString()}").SetFontSize(12));
                document.Add(new Paragraph("Digitally Signed").SetFontSize(12));

                document.Close();

                var fileBytes = stream.ToArray();
                return File(fileBytes, "application/pdf", $"Certificate_{enrollmentId}.pdf");
            }
        }
    }
}
*/

using iText.Layout;
using iText.Kernel.Pdf;
using iText.Layout.Element;
using KinstonBackend.Data;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace KinstonBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnrollmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EnrollmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /*
        [HttpPost]
        public IActionResult EnrollInCourse([FromBody] Enrollment enrollment)
        {
            if (enrollment == null)
                return BadRequest("Enrollment details are required.");

            // Check if already enrolled in another course
            var existingEnrollment = _context.Enrollments
                .Any(e => e.StudentId == enrollment.StudentId && e.CourseId == enrollment.CourseId);
            if (existingEnrollment)
                return BadRequest("Already enrolled in this course.");

            _context.Enrollments.Add(enrollment);
            _context.SaveChanges();

            // Increment enrollment count in Course
            var course = _context.Courses.Find(enrollment.CourseId);
            if (course != null)
            {
                course.EnrollmentCount++;
                _context.SaveChanges();
            }

            return CreatedAtAction(nameof(GetMyEnrollments), new { id = enrollment.EnrollmentId }, enrollment);
        }*/
        [HttpPost]
        public IActionResult EnrollInCourse([FromBody] Enrollment enrollment)
        {
            if (enrollment == null)
                return BadRequest("Enrollment details are required.");

            // Check if already enrolled
            var existingEnrollment = _context.Enrollments
                .Any(e => e.StudentId == enrollment.StudentId && e.CourseId == enrollment.CourseId);
            if (existingEnrollment)
                return BadRequest("You are already enrolled in this course.");

            // Add new enrollment
            _context.Enrollments.Add(enrollment);
            _context.SaveChanges();

            // Update enrollment count for course
            var course = _context.Courses.Find(enrollment.CourseId);
            if (course != null)
            {
                course.EnrollmentCount++;
                _context.SaveChanges();
            }

            return CreatedAtAction(nameof(GetMyEnrollments), new { id = enrollment.EnrollmentId }, enrollment);
        }









        [HttpGet("my")]
        public ActionResult<IEnumerable<Enrollment>> GetMyEnrollments(int studentId)
        {
            return _context.Enrollments.Where(e => e.StudentId == studentId).ToList();
        }



        [HttpPut("{enrollmentId}/rating")]
        public IActionResult RateCourse(int enrollmentId, [FromBody] int? rating)
        {
            var enrollment = _context.Enrollments.Find(enrollmentId);
            if (enrollment == null)
            {
                return NotFound();
            }

            enrollment.Rating = rating ?? 0; // If rating is null, set it to 0
            _context.SaveChanges();
            return NoContent(); // Respond with 204 No Content
        }
        /*
        // Add this method to EnrollmentsController
        [HttpGet("certificate/{enrollmentId}")]
        public IActionResult GenerateCertificate(int enrollmentId)
        {
            var enrollment = _context.Enrollments.Find(enrollmentId);
            if (enrollment == null)
            {
                return NotFound("Enrollment not found.");
            }

            var course = _context.Courses.Find(enrollment.CourseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            // Create PDF
            using (var stream = new MemoryStream())
            {
                var pdfWriter = new PdfWriter(stream);
                var pdfDocument = new PdfDocument(pdfWriter);
                var document = new Document(pdfDocument);

                // Add content to PDF
                document.Add(new Paragraph("Kinston E-Learning University").SetFontSize(20));
                document.Add(new Paragraph($"Date: {DateTime.Now}").SetFontSize(12));
                document.Add(new Paragraph($"Student Name: {enrollment.Student.Name}").SetFontSize(12));
                document.Add(new Paragraph($"Course Title: {course.Title}").SetFontSize(12));
                document.Add(new Paragraph($"Course Description: {course.Description}").SetFontSize(12));
                document.Add(new Paragraph($"Start Date: {course.StartDate.ToShortDateString()}").SetFontSize(12));
                document.Add(new Paragraph($"End Date: {course.EndDate.ToShortDateString()}").SetFontSize(12));
                document.Add(new Paragraph("Digitally Signed").SetFontSize(12));

                document.Close();

                var fileBytes = stream.ToArray();
                return File(fileBytes, "application/pdf", $"Certificate_{enrollmentId}.pdf");
            }
        }*/

    }
}