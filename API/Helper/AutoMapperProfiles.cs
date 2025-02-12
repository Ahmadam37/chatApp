using System;
using API.DTOs;
using API.Entitites;
using AutoMapper;

namespace API.Helper;

public class AutoMapperProfiles : Profile
{
    protected AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>();
        CreateMap<Photo, PhotoDto>();

    }


}
