using vteCore.Shared;
using Microsoft.AspNetCore.Http;
using System;
using static vteCore.Shared.Interfaces;

namespace vteCore.Middleware
{

    public class LanguageAccessorService : ILanguageService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public LanguageAccessorService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            var lang = _httpContextAccessor.HttpContext?.Request.Headers["Accept-Language"].ToString();
            LanguageId = string.IsNullOrEmpty(lang) ? "en-US" : lang;
        }
        public string LanguageId { get; }
    }
}
