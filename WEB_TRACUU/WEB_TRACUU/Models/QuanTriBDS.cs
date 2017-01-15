using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class QuanTriBDS
    {
        public Guid _MaVP { get; set; }
        public string _TenVp { get; set; }
        public string _TenLoai { get; set; }
        public string _DiaCHi { get; set; }
        public System.Nullable<decimal> _Gia;
        public string _DienTich { get; set; }
        public  int _IDDienTich { get; set; }
        public  string tenKH { get; set; }
        public Guid _MaKH { get; set; }
        public System.Nullable<System.DateTime> _ModifyDate { get; set; }
        public System.Nullable<System.DateTime> _ExpireDate { get; set; }
        public System.Nullable<System.DateTime> _CreateDate { get; set; }
        public bool HetHan;
    }
}