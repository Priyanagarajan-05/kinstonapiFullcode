namespace KinstonBackend.DTOs
{
    public class LoginRequestDto
    {
        public string Email { get; set; }
        public string Password { get; set; } // Not PasswordHash
   
    }
}
