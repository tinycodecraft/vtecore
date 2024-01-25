using vteCore.Abstraction.Models;

namespace vteCore.Abstraction
{
    public class Interfaces
    {

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



        public interface IUser
        {
            public string UserName { get; }
            public string Email { get; }
            public string UserId { get; }

        }


    }


}