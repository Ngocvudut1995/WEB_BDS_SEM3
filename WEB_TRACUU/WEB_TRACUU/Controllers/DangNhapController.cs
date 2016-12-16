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
        private DataTraCuuVPDataContext db;
        [HttpGet]
        public ThongTinKH KT_DangNhap(string user, string pass)
        {
            using (db = new DataTraCuuVPDataContext())
            {   
                var kh = (from a in db.Customers where a.Username == user && a.Pass == pass && a.Flag_Active == true select a).SingleOrDefault();
                if (kh != null) return new ThongTinKH
                {
                    _MaKH = kh.IDCustomer,
                    _TenKH = kh.CustomerName,
                    _CMND = kh.CMND,
                    _CoQuan = kh.Organization,
                    _DiaChi = kh.Address,
                    _Email = kh.Email,
                    _SoDT = kh.PhoneNumber,
                    _User = kh.Username,
                    _Admin = kh.Admin
                };
                return null;
                
            }
           
        }
        [HttpGet]
        public ThongTinKH ThongTinKH(Guid makh)
        {
            using (db = new DataTraCuuVPDataContext()) 
            {
                var kh = (from a in db.Customers where a.IDCustomer == makh select a).SingleOrDefault();
                if (kh != null) return new ThongTinKH
                {
                    _MaKH = kh.IDCustomer,
                    _TenKH = kh.CustomerName,
                    _CMND = kh.CMND,
                    _CoQuan = kh.Organization,
                    _DiaChi = kh.Address,
                    _Email = kh.Email,
                    _SoDT = kh.PhoneNumber,
                    _User = kh.Username,
                    _Admin = kh.Admin,
                    _Phone = kh.PhoneNumber,
                    _Birthday = kh.Birthday,
                    _Address = kh.Address,
                    _Gender = kh.Gender
                };
                return null;
            }
            
        }
    }
}
