using MediatR;
using vteCore.ErrorOr;
using vteCore.Shared.Models;

namespace vteCore.Shared
{
    public interface IResultGateway<T>: IObservable<KeyValuePair<string,T>> 
    {
        Task OnDeliverResultAsync(KeyValuePair<string, T> result);
    }

    public class Interfaces
    {
        public interface IRqBase<T>: IRequest<ErrorOr<T>>
        {
            string ConnectionId { get; set; }
        }

        public interface IRqWeatherForcast: IRqBase<IEnumerable<RM.WeatherForcast>>
        {
            
        }

        
        

        public interface ILanguageService
        {
            public string LanguageId { get; }
        }
        public interface IBelongtoTable
        {
            string tablename { get; set; }
        }
        public interface IFileService
        {
            string CreatePathFor(string type, string filename, bool inupload = false);
            string GenerateWordWithData(string xmldata, string templatename, string type = null);
            Task<string> DownloadFilesAsync(Stream fileStream, string type, string filename,bool inupload=false);
            Task<FileUploadSummary> UploadFileAsync(Stream fileStream, string contentType, string type);
        }

        public interface IUserService
        {

            bool Remove(string ids);
            bool Save(IUser user);

            //username can be id or name 
            bool HasUser(string username);
            //change password by admin without oldpassword
            bool ChangePassword(string username, string password, string byusername, string oldpassword = null);

            RM.LinkResult Export(EM.MantineTableProps query);
            IAuthResult? Login(string username, string password);

            RM.UserListResult List(EM.MantineTableProps query);

            IUser Get(string id);
        }

        public interface IUser
        {
            int Id { get; }
            DateTime? loginedAt { get; }
            bool IsReset { get; }
            DateTime updatedAt { get; }
            string updatedBy { get; }
            string post { get; }
            bool Disabled { get; }
            int level { get; }
            string Division { get; }

            bool IsDivisionAdmin { get; }
            bool IsDataAdmin { get; }
            bool IsControlAdmin { get; }

            string UserName { get; }
            string Email { get; }
            string UserId { get; }


        }

        public interface IAuthAuditResult
        {
            DateTime? loginedAt { get; }
            bool IsReset { get; }
            DateTime updatedAt { get; }
            string updatedBy { get; }
            string post { get; }
            bool Disabled { get; }
            int level { get; }
            string Division { get; }

        }

        public interface IAuthResult
        {
            bool IsDivisionAdmin { get;  }
            bool IsDataAdmin { get; }
            bool IsControlAdmin { get; }
            bool NeedReset { get;  }

            string UserName { get; }
            string Email { get; }
            string UserId { get; }

        }

        public interface IAuthExpire
        {

        }

    }


}