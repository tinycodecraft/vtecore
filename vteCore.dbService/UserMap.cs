using vteCore.dbService;

namespace vteCore.Mappers
{
    public class UserMap:BaseDto<UserMap,DFAUser>,IAuthResult,IAuthAuditResult,IUser
    {
        public string UserId { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }
        public bool IsDivisionAdmin { get ; set ; }
        public bool IsDataAdmin { get ; set ; }
        public bool IsControlAdmin { get ; set ; }

        public DateTime? loginedAt { get; }
        public bool IsReset { get; }
        public DateTime updatedAt { get; }
        public string updatedBy { get; }
        public string post { get; }
        public bool Disabled { get; }
        public int level { get; }
        public string Division { get; }

        public override void AddCustomMappings()
        {
            SetCustomMappings()
                .Map(dest => dest.UserName, src => src.UserName);

            SetCustomMappingsReverse()
                .Map(dest => dest.UserId, src => src.UserId ?? src.UserName.ToLower())
                .Map(dest => dest.Email, src => src.UserName.ToLower() + "@unknown.com")
                .Map(dest => dest.UserName, src => src.UserName)
                .Map(dest => dest.IsDivisionAdmin, src=> src.AdminScope == nameof(AdminScopeType.Division) && src.IsAdmin)
                .Map(dest => dest.IsDataAdmin, src=> src.AdminScope == nameof(AdminScopeType.Archive) && src.IsAdmin)
                .Map(dest => dest.IsControlAdmin, src=> src.AdminScope == nameof(AdminScopeType.Full) && src.IsAdmin);



                
        }

    }
}
