﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace vteCore.Shared.Models
{
    public class ItWordDownload
    {
        public string Type { get; set; }
    }

    public class RtLinkResult
    {
        public string Status { get; set; }        
        public string DownloadLink { get; set; }

        public string Type { get; set; }
    }
}
