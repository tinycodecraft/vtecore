﻿using System.ComponentModel.DataAnnotations;
using vteCore.dbService;

namespace vteCore.Mappers
{
    public class UserMap : BaseDto<UserMap, DFAUser>, IAuthResult, IAuthAuditResult, IUser
    {

        public int Id { get; set; }

        [Display(Order = 0, Name = "User Id")]
        public string UserId { get; set; }
        [Display(Order = 1, Name = "User Name")]
        public string UserName { get; set; }

        //Pleae note that if the json post without Email field.  It will get status 400 on post
        [Display(Order = 2, Name = "User Email")]
        public string? Email { get; set; }

        public bool IsDivisionAdmin { get; set; }

        [Display(Order = 8, Name = "Is Division Admin")]
        public string DivisionEnabled
        {
            get
            {
                return this.IsDivisionAdmin ? "T" : "F";
            }
        }


        public bool IsDataAdmin { get; set; }

        [Display(Order = 9, Name = "Is Data Admin")]
        public string DataEnabled
        {
            get
            {
                return this.IsDataAdmin ? "T" : "F";
            }
        }

        public bool IsControlAdmin { get; set; }

        [Display(Order = 10, Name = "Is Control Admin")]
        public string ControlEnabled
        {
            get
            {
                return this.IsControlAdmin ? "T" : "F";
            }
        }

        public DateTime? loginedAt { get; set; }

        public bool IsReset { get; set; }

        [Display(Order = 3, Name = "Change Password Required")]
        public string ResetEnabled
        {
            get
            {
                return this.IsReset ? "T" : "F";
            }
        }

        public bool NeedReset
        {
            get
            {
                return this.IsReset;
            }
        }
        public DateTime updatedAt { get; set; }
        public string updatedBy { get; set; }
        [Display(Order = 4, Name = "Post")]
        public string post { get; set; }
        
        public bool Disabled { get; set; }

        [Display(Order = 7, Name = "Disabled")]
        public string DisabledEnabled
        {
            get
            {
                return this.Disabled ? "T" : "F";
            }
        }

        [Display(Order = 6, Name = "Level")]
        public int level { get; set; }
        [Display(Order = 5, Name = "Division")]
        public string Division { get; set; }

        public override void AddCustomMappings()
        {
            SetCustomMappings()
                .Map(dest => dest.UserName, src => src.UserName)
                .Map(dest => dest.IsAdmin, src => src.IsDivisionAdmin || src.IsDataAdmin || src.IsControlAdmin)
                .Map(dest => dest.AdminScope, src => src.IsControlAdmin ? nameof(AdminScopeType.Full) : (src.IsDataAdmin ? nameof(AdminScopeType.Archive) : (src.IsDivisionAdmin ? nameof(AdminScopeType.Division) : "")))
                .Map(dest => dest.updatedAt, src => DateTime.Now)
                .Ignore(dest => dest.IsReset)
                .Ignore(dest => dest.Disabled)
                .Ignore(dest => dest.DFAUserConfigs)
                .Ignore(dest => dest.EncPassword)
                .Ignore(dest => dest.Id)
                ;


            SetCustomMappingsReverse()
                .Map(dest => dest.UserId, src => src.UserId ?? src.UserName.ToLower())
                .Map(dest => dest.Email, src => src.UserName.ToLower() + "@unknown.com")
                .Map(dest => dest.UserName, src => src.UserName)
                .Map(dest => dest.IsDivisionAdmin, src => src.AdminScope == nameof(AdminScopeType.Division) && src.IsAdmin)
                .Map(dest => dest.IsDataAdmin, src => src.AdminScope == nameof(AdminScopeType.Archive) && src.IsAdmin)
                .Map(dest => dest.IsControlAdmin, src => src.AdminScope == nameof(AdminScopeType.Full) && src.IsAdmin);




        }

    }
}
