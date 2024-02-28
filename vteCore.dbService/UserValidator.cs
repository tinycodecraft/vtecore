using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vteCore.dbService
{
    public class UserValidator: AbstractValidator<UserMap> 
    {
        public UserValidator() {
            RuleFor(x => x.post).NotEmpty();
            RuleFor(x => x.Division).NotEmpty();
            RuleFor(x=> x.UserId).NotEmpty();
            RuleFor(x => x.UserName).NotEmpty();
        }
    }
}
