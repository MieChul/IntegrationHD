using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace HealthDesk.Api.Helpers
{
    public static class PathHelper
    {
        public static string GetAssetRootPath(IWebHostEnvironment env)
        {
#if DEBUG

            return @"D:\IntegrationHD\HealthDesk.Ui\src\assets";
#else
          
            return Path.Combine(env.WebRootPath, "assets");
#endif
        }
    }
}