using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vteCore.Extensions;

namespace vteCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly ILogger<FilesController> logger;
        private readonly IFileService fileService;

        public FilesController(ILogger<FilesController> lg, IFileService fs)
        {
            logger = lg;
            fileService = fs;
        }

        [HttpPost]
        [Route(nameof(SimpleUpload))]
        [ProducesResponseType(StatusCodes.Status415UnsupportedMediaType)]
        [MultipartFormData]
        [DisableFormValueModelBinding]
        [RequestSizeLimit(512 * 1024 * 1024)]
        //size limit using with formoption set in Program service builder
        public async Task<IActionResult> SimpleUpload(string connectionid, string type)
        {
            var fileUploadSummary = await fileService.UploadFileAsync(HttpContext.Request.Body, Request.ContentType, type);

            return CreatedAtAction(nameof(SimpleUpload), fileUploadSummary);
        }


    }
}
