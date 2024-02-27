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

        public DateTime? loginedAt { get; set; }
        public bool IsReset { get; set; }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }
        public string post { get; set; }
        public bool Disabled { get; set; }
        public int level { get; set; }
        public string Division { get; set; }

        public override void AddCustomMappings()
        {
            SetCustomMappings()
                .Map(dest => dest.UserName, src => src.UserName)
                .Map(dest=> dest.IsAdmin, src=> src.IsDivisionAdmin || src.IsDataAdmin || src.IsControlAdmin)
                .Map(dest=> dest.AdminScope, src=> src.IsControlAdmin ? nameof(AdminScopeType.Full): (src.IsDataAdmin ? nameof(AdminScopeType.Archive): (src.IsDivisionAdmin ? nameof(AdminScopeType.Division): "")))
                .Map(dest=> dest.updatedAt, src=> DateTime.Now)
                .Ignore(dest=> dest.IsReset)
                .Ignore(dest=> dest.Disabled)
                .Ignore(dest=> dest.DFAUserConfigs)
                .Ignore(dest=> dest.EncPassword)
                .Ignore(dest=> dest.Id)                
                ;


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
