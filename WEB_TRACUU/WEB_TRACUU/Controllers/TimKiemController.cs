using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.NetworkInformation;
using System.Web.Http;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json.Linq;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class TimKiemController : ApiController
    {
       // Rent_OfficeEntities db = new Rent_OfficeEntities();
       DataClasses1DataContext db = new DataClasses1DataContext();
       TKVanPhong tkVanPhong = new TKVanPhong();
        public IEnumerable<TKVanPhong> get_VP()
        {   
            IList<TKVanPhong> list = new List<TKVanPhong>();
            list = tkVanPhong.getALL();
            return list;
        }
       

        public TKVanPhong get_vp_by_id(string mavp)
        {   TKVanPhong vp;
            var sql= (from a in db.VanPhongs where a.MaVP == mavp
                      select new { a.MaVP, a.TenVP, a.Gia, a.DienTich, a.MoTa, a.Avarta,a.SoNha,a.MaQuan }).SingleOrDefault();
           vp = new TKVanPhong
                {
                _MaVP = sql.MaVP,
                    _Anh = sql.Avarta,
                    _Dientich = sql.DienTich,
                    _Gia = sql.Gia,
                    _Mota = sql.MoTa,
                    _TenVp = sql.TenVP,
                    _SoNha = sql.SoNha,
                    _MaQuan =  (int) sql.MaQuan

           };
            return vp;
        }
        //Get DS Các Quận
        public IEnumerable<Quan> get_county()
        {   IList<Quan> list = new List<Quan>();
            var sql = (from a in db.Quans select a).ToList();
            foreach (var item  in sql)
            {
                list.Add(new Quan
                {
                    MaQuan = item.MaQuan,
                    TenQuan = item.TenQuan
                });
            }
            return list;
        }

        //Get DS Hinh Thuc
        public IEnumerable<HinhThuc> get_HinhThuc()
        {
            IList<HinhThuc> list = new List<HinhThuc>();
            var sql = (from a in db.HinhThucs select a).ToList();
            foreach (var item in sql)
            {
                list.Add(new HinhThuc
                {
                    MaHinhThuc = item.MaHinhThuc,
                    TenHinhThuc = item.TenHinhThuc
                });
            }
            return list;
        }
        //Get DS Hinh Thuc
        public IEnumerable<PhanLoaiThue> get_DanhMuc()
        {
            IList<PhanLoaiThue> list = new List<PhanLoaiThue>();
            var sql = (from a in db.PhanLoaiThues select a).ToList();
            foreach (var item in sql)
            {
                list.Add(new PhanLoaiThue
                {
                    MaLoai = item.MaLoai,
                    TenLoai = item.TenLoai
                });
            }
            return list;
        }
        [HttpPut]
        public IHttpActionResult add_office_follow(JObject data)
        {
            //this.contactRepository.SaveContact(contact);

            dynamic json = data;
            if (json.id == null) return NotFound();
            try
            {
                TheoDoi td = new TheoDoi();
                td.MaKH = json._makh;
                td.MaVP = json._mavp;
                db.TheoDois.InsertOnSubmit(td);
                db.SubmitChanges();
                return Ok(json);
            }
            catch (Exception)
            {
                return NotFound();
            }
         //var response = Request.CreateResponse<Contactcs>(System.Net.HttpStatusCode.Created, item);

        }
        [HttpPost]
        public void SendMail()
        {   MailMessage msg = new MailMessage();
            msg.From = new MailAddress("ngocvudut1995@gmail.com");
            msg.To.Add("ngocvudut1995@gmail.com");
            msg.Body = "Demo";
            msg.IsBodyHtml = false;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.EnableSsl = true;
            NetworkCredential NetworkCred = new NetworkCredential("ngocvupct1995@gmail.com", "toilanumber1");
            smtp.UseDefaultCredentials = true;
            smtp.Credentials = NetworkCred;
            smtp.Port = 587;
            smtp.Send(msg);

            // Gmail Address from where you send the mail
            //var fromAddress = "ngocvupct1995@gmail.com";
            //// any address where the email will be sending
            //var toAddress = "ngocvudut1995@gmail.com";
            ////Password of your gmail address
            //const string fromPassword = "toilanumber1";
            //// Passing the values and make a email formate to display
            //string subject = "Demo";
            //string body = "Demo";
            //// smtp settings
            //var smtp = new System.Net.Mail.SmtpClient();
            //{
            //    smtp.Host = "smtp.gmail.com";
            //    smtp.Port = 587;
            //    smtp.EnableSsl = true;
            //    smtp.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            //    smtp.Credentials = new NetworkCredential(fromAddress, fromPassword);
            //    smtp.Timeout = 20000;
            //}
            //// Passing values to smtp object
            //smtp.Send(fromAddress, toAddress, subject, body);
        }
    }
}
