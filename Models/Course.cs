using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace KinstonBackend.Models
{
    public class Course
    {
        

        public int CourseId { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public int ProfessorId { get; set; } // FK to User

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public decimal Price { get; set; }

        public bool IsApproved { get; set; } = false; // Defaults to false for pending approval
        public int EnrollmentCount { get; set; } = 0; // Count of students enrolled
        [JsonIgnore]
        public List<Module> Modules { get; set; }
    }
}
