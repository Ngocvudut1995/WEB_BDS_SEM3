using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class TaiKhoanController : ApiController
    {
        DataTraCuuVPDataContext db;
        //[HttpGet]
        //public int KT_TaiKhoan_TonTai(string user)
        //{
        //    var kh = (from a in db.KhachHangs where a.Username == user select a).SingleOrDefault();
        //    if (kh != null) return 1;
        //    return 0;
        //}
        //[HttpPost]
        //public IHttpActionResult TaoTK(JObject data)
        //{
        //    dynamic json = data;
           
        //    try
        //    {
        //        KhachHang kh = new KhachHang();
        //        kh.MaKH = Guid.NewGuid();
        //        kh.Username = json._user;
        //        kh.Pass =json._pass;
        //        kh.DiaChi = json._diachi;
        //        kh.SoDT = json._sodt;
        //        kh.CoQuan = json._coquan;
        //        kh.Email = json._email;
        //        kh.FlagActive = false;
        //        kh.TenKH = json._tenkh;
        //        kh.CMND = json._cmnd;
        //        MailMessage msg = new MailMessage();
                
        //        msg.From = new MailAddress("ngocvupct1995@gmail.com");
        //        string to_mail = json._email.ToString();
        //        msg.To.Add(to_mail);
        //        msg.Subject = "Kích Hoạt Tài Khoản BDS";
        //        msg.Body = "Bạn Đã Tạo Tài Khoản của chúng tôi. Mời bạn Vào Link "+ "http://localhost:61482/Home/Active/"+kh.MaKH+" để kích hoạt.";
        //        msg.IsBodyHtml = false;
        //        SmtpClient smtp = new SmtpClient();
        //        smtp.Host = "smtp.gmail.com";
        //        smtp.EnableSsl = true;
        //        NetworkCredential NetworkCred = new NetworkCredential("ngocvupct1995@gmail.com", "toilanumber1");
        //        smtp.UseDefaultCredentials = true;
        //        smtp.Credentials = NetworkCred;
        //        smtp.Port = 587;
        //        smtp.Send(msg);
        //        db.KhachHangs.InsertOnSubmit(kh);
        //        db.SubmitChanges();
        //        return Ok(json);
        //    }
        //    catch (Exception)
        //    {
        //        return NotFound();
        //    }
        //}
        //[HttpPut]
        //public IHttpActionResult KichHoatTK(JObject data)
        //{
        //    dynamic json = data;
        //    Guid ma_kh = Guid.NewGuid() ;
        //    if (!string.IsNullOrEmpty(json.makh.ToString()))
        //    {
        //        ma_kh = Guid.Parse(json.makh.ToString());
        //    }
            
        //    try
        //    {
        //        var kh = (from a in db.KhachHangs where a.MaKH == ma_kh select a).SingleOrDefault();
        //        kh.FlagActive = true;
        //        db.SubmitChanges();
        //        return Ok(json.makh);
        //    }
        //    catch (Exception)
        //    {
        //        return NotFound();
        //    }
        //}
        [HttpGet]
        public IEnumerable<BDS_Detail> get_Land_by_IDCustumer(Guid makh)
        {   
            List<BDS_Detail> list = new List<BDS_Detail>();
            using (db = new DataTraCuuVPDataContext())
            {
                db.Connection.Open();
                var sql = from a in db.Lands
                    join c in db.Overview_Lands on a.IDLand equals c.IDLand
                    join d in db.Customers on a.IDCustomer equals d.IDCustomer
                    select new
                    {
                        a.IDLand,
                        d.CustomerName,
                        c,
                        
                    };
                
                
                            
                foreach (var item in sql)
                {
                    list.Add(new BDS_Detail
                    {
                        _IDLand = item.IDLand,
                        _NumberHouse =  item.c.NumberHouse,
                        

                    });
                }
                db.Connection.Close();
                return list;
               
            }

        }

        [HttpGet]
        public IEnumerable<Customer> get_all_customer()
        {   List<Customer> list = new List<Customer>();
            using (db = new DataTraCuuVPDataContext())
            {
                db.Connection.Open();
                var query = (from a in db.Customers select a).ToList();
                foreach (var item in query)
                {
                    list.Add(new Customer
                    {
                        IDCustomer = item.IDCustomer,
                        CustomerName = item.CustomerName,

                    });
                }
                db.Connection.Close();
                return list;
            }
        } 

    }
}
