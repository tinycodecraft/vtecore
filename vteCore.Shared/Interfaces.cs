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
        public interface IRqWeatherForcast: IRequest<ErrorOr<IEnumerable<RM.WeatherForcast>>>
        {
            string ConnectionId { get; set; }
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
            string GenerateWordWithData(string xmldata, string templatename, string type = null);
            Task<string> DownloadFilesAsync(Stream fileStream, string type, string filename,bool inupload=false);
            Task<FileUploadSummary> UploadFileAsync(Stream fileStream, string contentType, string type);
        }

        public interface IUserService
        {
            //username can be id or name 
            bool HasUser(string username);
            //change password by admin without oldpassword
            bool ChangePassword(string username, string password, string byusername, string oldpassword = null);

            IUser? Login(string username, string password);
        }

        public interface IUser
        {
            public string UserName { get; }
            public string Email { get; }
            public string UserId { get; }

        }


    }


}