using System;
using API.DTOs;
using API.Entitites;
using API.Extensions;
using AutoMapper;

namespace API.Helper;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>().ForMember(d => d.Age , o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
        .ForMember(d => d.Age , o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
        .ForMember(d => d.PhotoUrl , o=> o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUser>();

    }


}
