using System.ComponentModel.DataAnnotations;

namespace KinstonBackend.Models
{
    public class CourseCreationRequest
    {
        // Course-related properties
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public int ProfessorId { get; set; } // Id of the professor creating the course

        // List of modules for this course
        public List<ModuleCreationRequest> Modules { get; set; } = new List<ModuleCreationRequest>();
    }

    public class ModuleCreationRequest
    {
        [Required]
        public string Title { get; set; }

        public string Content { get; set; }

        public int Order { get; set; } // To maintain the order of the modules
    
}
}
