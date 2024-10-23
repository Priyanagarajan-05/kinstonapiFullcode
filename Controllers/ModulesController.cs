using KinstonBackend.Data;
using KinstonBackend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace KinstonBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModulesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ModulesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/modules
        [HttpPost]
        public IActionResult CreateModule([FromBody] Module module)
        {
            if (module == null)
                return BadRequest("Module details are required.");

            _context.Modules.Add(module);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetModules), new { id = module.ModuleId }, module);
        }

        // GET: api/modules/course/{courseId}
        [HttpGet("course/{courseId}")]
        public ActionResult<IEnumerable<Module>> GetModules(int courseId)
        {
            var modules = _context.Modules.Where(m => m.CourseId == courseId).ToList();
            return Ok(modules);
        }

        // GET: api/modules/{id}
        [HttpGet("{id}")]
        public ActionResult<Module> GetModule(int id)
        {
            var module = _context.Modules.Find(id);
            if (module == null)
                return NotFound();

            return Ok(module);
        }

        // PUT: api/modules/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateModule(int id, [FromBody] Module module)
        {
            if (id != module.ModuleId)
                return BadRequest();

            _context.Entry(module).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/modules/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteModule(int id)
        {
            var module = _context.Modules.Find(id);
            if (module == null)
                return NotFound();

            _context.Modules.Remove(module);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
