using API.DTOs;
using API.Entities;
using API.Entitites;
using API.Helper;
using API.Helpers;

namespace API.Interfaces;

public interface ILikesRepository
{
  Task<UserLike?> GetUserLike(int sourceUserId, int likedUserId);
    Task<AppUser?> GetUserWithLikes(int userId);
    Task<PageList<LikeDto>> GetUserLikes(LikesParams likesParams);
}
