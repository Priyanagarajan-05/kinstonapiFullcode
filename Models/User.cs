using System.ComponentModel.DataAnnotations;

namespace KinstonBackend.Models
{
    public class User
    {
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; }

        [Required]
        public string Role { get; set; } // Values: Admin, Professor, Student

        public bool IsActive { get; set; } = true;

       
    }
}
