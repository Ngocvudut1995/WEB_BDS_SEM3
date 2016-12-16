using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class BDS_Detail
    {
        public System.Guid _IDLand { get; set; }
        public System.Guid _IDCustomer { get; set; }

        public string _Name { get; set; }
        public string _NameCustomer { get; set; }
        public string _EmailCustomer { get; set; }
        public string _PhoneCustomer { get; set; }
        public string _Image { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public System.Nullable<System.DateTime> _CreateDate { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public System.Nullable<System.DateTime> _ModifyDate { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public System.Nullable<System.DateTime> _ExpireDate { get; set; }

        public string _Price { get; set; }

        public string _Decription { get; set; }

        public string _Acreage { get; set; }

        public string _TypeName { get; set; }
        public int? _IDType { get; set; }

        public string _Street { get; set; }

        public string _Ward { get; set; }

        public string _Trousers { get; set; }

        public string _NumberHouse { get; set; }
        public System.Nullable<bool> _Sell;

        public System.Nullable<decimal> _Price_detail;
        public IEnumerable<Image_Slide_VP> _Images_detail;
    }
}