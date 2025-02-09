using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(DataContext context) : BaseApiController
{
    [HttpPost("register")]

    public async Task<ActionResult<AppUser>> Register(RegisterDTO registerDTO ){


        if(await UserExitist(registerDTO.Username)) return BadRequest("User name are taken!");

        using var hmac = new HMACSHA256();


        var user = new AppUser
        {
            UserName = registerDTO.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDTO.Password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();


        return user;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AppUser>> Login(LoginDTO loginDTO){

        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName.ToLower() == loginDTO.username.ToLower());

        if (user == null){

            return Unauthorized("Invalid username");
        }

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDTO.password));


        for (int i = 0; i < computeHash.Length; i++)
        {
            if(computeHash[i] != user.PasswordHash[i]){

                return Unauthorized("Invalid Password");
            }
        }


        return user;
    }

    private async Task<bool> UserExitist(string username){

        return await context.Users.AnyAsync(x => x.UserName.ToLower() == username.ToLower());
    }

}
