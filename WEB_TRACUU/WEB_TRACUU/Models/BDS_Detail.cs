using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class BDS_Detail
    {
        public System.Guid _IDLand { get; set; }

        public string _Name { get; set; }

        public string _Image { get; set; }

        public System.Nullable<System.DateTime> _CreateDate { get; set; }

        public System.Nullable<System.DateTime> _ModifyDate { get; set; }

        public System.Nullable<decimal> _Price { get; set; }

        public string _Decription { get; set; }

        public string _Acreage { get; set; }

        public string _TypeName { get; set; }

        public string _Street { get; set; }

        public string _Ward { get; set; }

        public string _Trousers { get; set; }

        public string _NumberHouse { get; set; }


        public IEnumerable<Image_Slide_VP> _Images_detail;
    }
}