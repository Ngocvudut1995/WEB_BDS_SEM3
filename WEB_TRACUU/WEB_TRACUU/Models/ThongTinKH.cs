using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class ThongTinKH
    {
        public Guid _MaKH { get; set; }
        public string _TenKH { get; set; }
        public string _DiaChi { get; set; }
        public string _CoQuan { get; set; }
        public string _SoDT { get; set; }
        public string _Email { get; set; }
        public string  _CMND  { get; set; }
        public string _User { get; set; }
    }
}