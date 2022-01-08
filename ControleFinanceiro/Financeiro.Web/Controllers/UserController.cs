using Financeiro.Dominio.Contratos;
using Financeiro.Dominio.Entidades;
using Financeiro.Web.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Financeiro.Web.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserRepositorio _userRepositorio;
        public UserController(IUserRepositorio userRepositorio)
        {
            _userRepositorio = userRepositorio;
        }

        [HttpPost("login")]
        public ActionResult VerificarUser([FromBody] User user)
        {
            try
            {
                var userRetorno = _userRepositorio.GetUser(user.Email);
                var userId = _userRepositorio.GetUserId(user.Email);


                if (userRetorno != null)
                {
                    User usuario = _userRepositorio.Validar(user);
                    if (usuario == null || !Hash.Validate(user.Senha, Environment.GetEnvironmentVariable("AUTH_SALT"), usuario.Senha))
                    {
                        return BadRequest("Senha inválida");
                    }
                    var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
                    var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    var tokenOptions = new JwtSecurityToken(
                        issuer: "https://localhost:5001",
                        audience: "https://localhost:5001",
                        claims: new List<Claim>
                        {
                            new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                            new Claim(ClaimTypes.Name, usuario.Nome.ToString()),
                        },
                        expires: DateTime.Now.AddMinutes(30),
                        signingCredentials: signingCredentials
                        );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                    return Ok(new { Token = tokenString, userId });

                }
                return Unauthorized();
            }
            catch (Exception erro)
            {
                return BadRequest(erro.ToString());
            }
        }

        [HttpPost("register")]
        public async Task<ActionResult> CadastrarUser([FromBody] User user)
        {
            try
            {
                var emailCadastrado = _userRepositorio.GetUser(user.Email);
                var nomeCadastrado = _userRepositorio.GetName(user.Nome);

                if (emailCadastrado != null)
                {
                    return BadRequest("Email já cadastrado no sistema");
                }
                if (nomeCadastrado != null)
                {
                    return BadRequest("Nome já cadastrado no sistema");
                }
                User usuario = new User
                {
                    Nome = user.Nome,
                    Email = user.Email,
                    Senha = Hash.Create(user.Senha, Environment.GetEnvironmentVariable("AUTH_SALT")),
                    DataDeCriacão = DateTime.Now
                };

                await _userRepositorio.PostUser(usuario);

                return Ok();

            }

            catch (Exception erro)
            {
                return BadRequest(erro.ToString());
            }
        }
    }
}
