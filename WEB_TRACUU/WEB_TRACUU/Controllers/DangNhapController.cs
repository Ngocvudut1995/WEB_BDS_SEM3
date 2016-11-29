using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class DangNhapController : ApiController
    {
        //DataClasses1DataContext db = new DataClasses1DataContext();
        //[HttpGet]
        //public Guid? KT_DangNhap(string user,string pass)
        //{
        //    var kh = (from a in db.KhachHangs where a.Username == user && a.Pass == pass select a).SingleOrDefault();
        //    if (kh != null) return kh.MaKH;
        //    return null;
        //}
        //[HttpGet]
        //public ThongTinKH ThongTinKH(Guid makh)
        //{
        //    var kh = (from a in db.KhachHangs where a.MaKH == makh select a).SingleOrDefault();
        //    if (kh != null) return new ThongTinKH
        //    {
        //        _MaKH = kh.MaKH,
        //        _TenKH = kh.TenKH,
        //        _CMND = kh.CMND,
        //        _CoQuan = kh.CoQuan,
        //        _DiaChi = kh.DiaChi,
        //        _Email = kh.Email,
        //        _SoDT = kh.SoDT,
        //        _User = kh.Username
        //    };
        //    return null;
        //}
    }
}
