using vteCore.Models;

namespace vteCore.Mappers
{
    public class UserMap:BaseDto<UserMap,QM.LoginProps>,IUser
    {
        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public override void AddCustomMappings()
        {
            SetCustomMappings()
                .Map(dest => dest.UserName, src => src.UserName);

            SetCustomMappingsReverse()
                .Map(dest => dest.UserId, src => src.UserName.ToLower())
                .Map(dest => dest.Email, src => src.UserName.ToLower() + "@unknown.com")
                .Map(dest => dest.UserName, src => src.UserName);


                
        }

    }
}
