using API.Entitites;

namespace API.Interfaces;

public interface ITokenService
{
    Task<string> CreateToken(AppUser user);
}