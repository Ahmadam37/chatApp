using System;
using API.Data;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")] //api/users
public class UserController(DataContext context) : ControllerBase
{

    [HttpGet]
    public async  Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();

        return Ok(users);
    }
    
    [HttpGet("{id:int}")] // api/users/2
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await context.Users.FindAsync(id);

        if(user == null){
            return NotFound();
        }

        return user;
    }
}
