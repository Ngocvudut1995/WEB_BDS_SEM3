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
        private DataTraCuuVPDataContext db;
        //= new DataTraCuuVPDataContext();
       TKVanPhong tkVanPhong = new TKVanPhong();
        public IEnumerable<TKVanPhong> get_VP()
        {   
            IList<TKVanPhong> list = new List<TKVanPhong>();
            list = tkVanPhong.getALL();
            return list;
        }


      
        //Get DS Các Quận
        public IEnumerable<Trouser> get_trouser()
        {
            var db = new DataTraCuuVPDataContext();
            try
            {   db.Connection.Open();
                IList<Trouser> list = new List<Trouser>();
                var sql = (from a in db.Trousers select a).ToList();
                foreach (var item in sql)
                {
                    list.Add(new Trouser
                    {
                        IDTrousers = item.IDTrousers,
                        Trousers = item.Trousers
                    });
                }
                return list;
            }
            catch (Exception ex)
            {
                return null;
                //throw ex.Message;
            }
            finally
            {
                db.Connection.Close();
            }
           
        }
        //Get DS Cac phuong
        public IEnumerable<Ward> get_ward_by_IDTrousers(int id)
        {
            var list = new List<Ward>();
            using (db = new DataTraCuuVPDataContext())
            {
                db.Connection.Open();
                var query = (from a in db.Wards
                          where a.IDTrousers == id
                          select a).OrderBy(b => b.Ward1).ToList();
                foreach (var item in query)
                {
                    list.Add(new Ward
                    {
                        IDWard = item.IDWard,
                        Ward1 = item.Ward1
                    });
                }
                db.Connection.Close();
                return list;
            }
        }

        //Get DS Cac Duong
        public IEnumerable<Street> get_Street_by_IDWard(int id)
        {
            
            IList<Street> list = new List<Street>();
            using (db = new DataTraCuuVPDataContext())
            {
                db.Connection.Open();
                try
                {
                    if (id == 0)
                    {
                        var sql = (from a in db.Streets select a).OrderBy(b => b.Street1).ToList();
                        foreach (var item in sql)
                        {
                            list.Add(new Street
                            {
                                IDStreet = item.IDStreet,
                                Street1 = item.Street1
                            });
                        }
                    }
                    else
                    {
                        var sql = (from a in db.Streets where a.IDWard == id select a).OrderBy(b => b.Street1).ToList();
                        foreach (var item in sql)
                        {
                            list.Add(new Street
                            {
                                IDStreet = item.IDStreet,
                                Street1 = item.Street1
                            });
                        }
                    }

                    return list;
                }
                catch (Exception)
                {

                    return null;

                }
                finally
                {
                    db.Connection.Close();
                }
            }
           
        }
        //Get Dientich
        public IEnumerable<Acreage> get_Acreage()
        {
            IList<Acreage> list = new List<Acreage>();
            using (db = new DataTraCuuVPDataContext())
            {
                var sql = (from a in db.Acreages select a).OrderBy(b => b.IDAcreage).ToList();
                foreach (var item in sql)
                {
                    list.Add(new Acreage
                    {
                        IDAcreage = item.IDAcreage,
                        Acreage1 = item.Acreage1
                    });
                }
                return list;
            }
            
        }

        
        //Get DS Hinh Thuc
        public IEnumerable<Type_Land> get_DanhMuc()
        {
            IList<Type_Land> list = new List<Type_Land>();
            using (db = new DataTraCuuVPDataContext())
            {
                var sql = (from a in db.Type_Lands select a).ToList();
                foreach (var item in sql)
                {
                    list.Add(new Type_Land
                    {
                        IDType = item.IDType,
                        TypeName = item.TypeName
                    });
                }
                return list;
            }
            
        }
        //[HttpPut]
        //public IHttpActionResult add_office_follow(JObject data)
        //{
        //    //this.contactRepository.SaveContact(contact);

        //    dynamic json = data;
        //    if (json.id == null) return NotFound();
        //    try
        //    {
        //        Follow td = new Follow();
        //        td.IDCustomer = json._makh;
        //        td.IDLand = json._mavp;
        //        db.Follows.InsertOnSubmit(td);
        //        db.SubmitChanges();
        //        return Ok(json);
        //    }
        //    catch (Exception)
        //    {
        //        return NotFound();
        //    }
        // //var response = Request.CreateResponse<Contactcs>(System.Net.HttpStatusCode.Created, item);

        //}
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
