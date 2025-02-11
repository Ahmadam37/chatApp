using System;
using API.Data;
using API.Entitites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController(DataContext dataContext) : BaseApiController
{
    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> Getauth()
    {
        return "secrit";
    }
    [HttpGet("not-found")]
    public ActionResult<AppUser> GetnotFound()
    {
        var thing = dataContext.Users.Find(-1);
        if (thing == null)
        {
            return NotFound();
        }
        return thing;
    }


    [HttpGet("server-error")]
    public ActionResult<AppUser> GetServerError()
    {
        var thing = dataContext.Users.Find(-1) ?? throw new Exception("Bad");

        return thing;
    }
    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This is not good request");
    }


}
