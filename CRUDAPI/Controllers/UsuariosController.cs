using CRUDAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUDAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : Controller
    {
        private readonly Contexto _contexto;


        public UsuariosController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> PegarTodosUsuariosAsync()
        {
            return await _contexto.Usuarios.ToListAsync();
        }

        [HttpGet("{usuarioId}")]
        public async Task<ActionResult<Usuario>> PegarUsuarioPeloIdAsync(int usuarioId)
        {
            Usuario usuario = await _contexto.Usuarios.FindAsync(usuarioId);

            if(usuario == null)
            {
                return NotFound();
            }
            else
            {
                return usuario;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Usuario>> SalvarUsuarioAsync(Usuario usuario)
        {
            await _contexto.Usuarios.AddAsync(usuario);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> AtualizarUsuarioAsync(Usuario usuario)
        {
            _contexto.Usuarios.Update(usuario);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{usuarioId}")]
        public async Task<ActionResult> DeletarUsuarioAsync(int usuarioId)
        {
            Usuario usuario = await _contexto.Usuarios.FindAsync(usuarioId);

            if (usuario == null)
            {
                return NotFound();
            }
            _contexto.Remove(usuario);
            await _contexto.SaveChangesAsync();
            return Ok();                      
        }
    }
}
