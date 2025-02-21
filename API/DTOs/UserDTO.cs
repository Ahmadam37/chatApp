using System;

namespace API.DTOs;

public class UserDTO
{

    public required string username { get; set; }
    public required string KnownAs { get; set; }

    public required string token { get; set; }


    public  string? PhotoUrl { get; set; }




}
