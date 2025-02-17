using System;
using API.DTOs;
using API.Entitites;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();

    Task<IEnumerable<AppUser>> GetUsersAsync();

    Task<AppUser?> GetUserByIdAsync(int id);
    Task<AppUser?> GetUserByUsernameAsync(string username);


    Task<IEnumerable<MemberDto>> GetMemberAsync();

    Task<MemberDto?> GetMemberAsync(string username);
    
}
