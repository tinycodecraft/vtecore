using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace vteCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StreamController : ControllerBase
    {
        private readonly ILogger<StreamController> logger;
        private readonly IFileService fileService;
        public StreamController(ILogger<StreamController> lg, IFileService fs)
        {
            logger = lg;
            fileService = fs;
        }
        [HttpGet]
        [Route("Download/{type}/{filename}")]
        public async Task Get(string type, string filename)
        {
            var besplit = type != null && type.Contains(".");
            if (besplit)
            {

                // var pathtype = type.Substring(0,type.IndexOf("."));
                type = type.Substring(type.IndexOf(".") + 1);
            }
            var filepath = await fileService.DownloadFilesAsync(Response.Body, type, filename, !besplit);

            var provider = new FileExtensionContentTypeProvider();
            var filecontenttype = string.Empty;
            if (!provider.TryGetContentType(filepath, out filecontenttype))
            {
                filecontenttype = "application/octet-stream";

            }

            var isinline = CanInline(filename);

            System.Net.Mime.ContentDisposition cd = new System.Net.Mime.ContentDisposition
            {
                FileName = filename,
                Inline = isinline  // false = prompt the user for downloading;  true = browser to try to show the file inline
            };
            Response.Headers.Add("Content-Disposition", cd.ToString());
            Response.Headers.Add("X-Content-Type-Options", "nosniff");


            Response.Headers.ContentType = filecontenttype;

            return;


        }
    }
}
