﻿using Microsoft.AspNetCore.Http;
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
        private readonly IWebHostEnvironment webEnv;
        public StreamController(ILogger<StreamController> lg, IFileService fs,IWebHostEnvironment env)
        {
            logger = lg;
            fileService = fs;
            webEnv = env;
        }

        [HttpGet]
        [Route("Download/{type}/{filename}")]
        public IActionResult Download(string type,string filename)
        {
            var isShared = type != null && type.Contains(".");
            if (isShared)
            {

                // var pathtype = type.Substring(0,type.IndexOf("."));
                type = type.Substring(type.IndexOf(".") + 1);
            }
            var path = fileService.CreatePathFor(type, filename, !isShared);
            var provider = new FileExtensionContentTypeProvider();
            var filecontenttype = string.Empty;
            if (!provider.TryGetContentType(path, out filecontenttype))
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

            //enableRangeprocessing help partial stream large file
            return File(new FileStream(path,FileMode.Open,FileAccess.Read), filecontenttype, enableRangeProcessing: true);
        }

        //Not Sure why the following has network problem
        [HttpGet]
        [Route("Load/{type}/{filename}")]
        public async Task Get(string type, string filename)
        {
            //if the dot present in type parameter
            //the share folder is used instead of upload folder
            //share folder is the generated file place.
            //upload folder is the uploaded file place.
            var isShared = type != null && type.Contains(".");
            if (isShared)
            {

                // var pathtype = type.Substring(0,type.IndexOf("."));
                type = type.Substring(type.IndexOf(".") + 1);
            }

            var filepath = await fileService.DownloadFilesAsync(Response.Body, type, filename, !isShared);

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
