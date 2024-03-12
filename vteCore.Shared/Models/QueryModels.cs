﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using vteCore.Shared.Tools;

namespace vteCore.Shared.Models
{
    public class SortProps
    {
        public bool Desc { get; set; }

        public string Id { get; set; }

    }

    public class FilterProps
    {
        public string Id { get; set; }  
        public dynamic Value { get; set; }


    }

    public class DescProps
    {
        public string value { get; set; }
        public string label { get; set; }
    }


    public class MantineTableProps
    {
        public string Type { get; set; }

        //record start index
        public int Start { get; set; }

        //page size
        public int Size { get; set; }

        public FilterProps[] Filtering { get; set; }

        public string GlobalFilter { get; set; }

        public SortProps[] Sorting { get; set; }

        public bool? WithDisabled { get; set; }

        public string? SelectedIds { get; set; }
    }
    

}
