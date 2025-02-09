using System;
using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(DataContext context) : BaseApiController
{
    [HttpPost("register")]

    public async Task<ActionResult<AppUser>> Register(string username , string password){

        using var hmac = new HMACSHA256();


        var user = new AppUser
        {
            UserName = username,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
            PasswordSalt = hmac.Key
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();


        return user;
    }

}
