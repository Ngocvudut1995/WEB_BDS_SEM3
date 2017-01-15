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
       
        TKVanPhong tkVanPhong = new TKVanPhong();
        public IEnumerable<TKVanPhong> get_VP()
        {
            IList<TKVanPhong> list = new List<TKVanPhong>();
            list = tkVanPhong.getALL();
            return list;
        }
        //Get DS Cac phuong
        public IEnumerable<Ward> get_ward_by_IDTrousers(int id)
        {
            var list = new List<Ward>();
            using (db = new DataTraCuuVPDataContext())
            {
              
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
               
                return list;
            }
        }

        //Get DS Cac Duong
        public IEnumerable<Street> get_Street_by_IDTrouser(int id)
        {
            
            IList<Street> list = new List<Street>();
            using (db = new DataTraCuuVPDataContext())
            {
               
                try
                {
                    if (id == 0)
                    {
                        return null;
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
                        var sql = (from a in db.Streets where a.IDTrousers == id select a).OrderBy(b => b.Street1).ToList();
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
        public IEnumerable<TypeDetail> get_DanhMuc_By_Sell(bool sell)
        {
            IList<TypeDetail> list = new List<TypeDetail>();
            using (db = new DataTraCuuVPDataContext())
            {
                var sql = (from a in db.TypeDetails where a.Sell == sell select a).ToList();
                foreach (var item in sql)
                {
                    list.Add(new TypeDetail
                    {
                        IDTypeDetail = item.IDTypeDetail,
                        TypeNameDetail = item.TypeNameDetail,
                        Sell = item.Sell
                    });
                }
                return list;
            }
            
        }

        //Get huong nhà
        public IEnumerable<Direction> get_Direction()
        {
            IList<Direction> list = new List<Direction>();
            using (db = new DataTraCuuVPDataContext())
            {
                var sql = (from a in db.Directions select a).OrderBy(b => b.IDDirection).ToList();
                foreach (var item in sql)
                {
                    list.Add(new Direction
                    {
                        IDDirection = item.IDDirection,
                        Direction1 = item.Direction1
                    });
                }
                return list;
            }

        }
        public IEnumerable<TypeDetail> get_DanhMuc_By_Sell_and_Type(bool sell,int type)
        {
            IList<TypeDetail> list = new List<TypeDetail>();
            using (db = new DataTraCuuVPDataContext())
            {
                var sql = (from a in db.TypeDetails where a.Sell == sell && a.IDType == type select a).ToList();
                foreach (var item in sql)
                {
                    list.Add(new TypeDetail
                    {
                        IDTypeDetail = item.IDTypeDetail,
                        TypeNameDetail = item.TypeNameDetail,
                        Sell = item.Sell
                    });
                }
                return list;
            }

        }
        public IEnumerable<Price> get_Price(bool sell)
        {
            IList<Price> list = new List<Price>();
            using (db = new DataTraCuuVPDataContext())
            {
                
              
                var sql = (from a in db.Prices where a.Sell == sell select a).ToList();
                foreach (var item in sql)
                {
                    list.Add(new Price
                    {
                        IDPrice = item.IDPrice,
                        Price1 = item.Price1,
                        Sell = item.Sell
                        
                    });
                }
                return list;
            }

        }
        [HttpGet]
        public bool test_follow(Guid makh, Guid mavp)
        {
            using (db = new DataTraCuuVPDataContext())
            {
                var td = (from a in db.Follows
                          where a.IDCustomer == makh && a.IDLand == mavp
                          select a).SingleOrDefault();
                if (td != null) return true;
               ;
                return false;

            }

        }
        [HttpPut]
        public IHttpActionResult add_office_follow(JObject data)
        {
            //this.contactRepository.SaveContact(contact);

            dynamic json = data;
            using (db = new DataTraCuuVPDataContext())
            {
               
                try
                {
                    Follow td = new Follow();
                    //Guid idkh = new Guid(json._makh.ToString());
                    //Guid idvp = new Guid(json._mavp.ToString());
                    td.IDCustomer = json._makh;
                    td.IDLand = json._mavp;
                    db.Follows.InsertOnSubmit(td);
                    db.SubmitChanges();
                    return Ok(json);
                }
                catch (Exception)
                {
                    return NotFound();
                }
            }
          
            //var response = Request.CreateResponse<Contactcs>(System.Net.HttpStatusCode.Created, item);

        }
        [HttpPut]
        public IHttpActionResult remove_office_follow(JObject data)
        {
            //this.contactRepository.SaveContact(contact);

            dynamic json = data;
            using (db = new DataTraCuuVPDataContext())
            {
                
                try
                {   Guid idkh = json._makh;
                    Guid idvp = json._mavp;
                    var td = (from a in db.Follows
                        where a.IDCustomer == idkh && a.IDLand == idvp
                        select a).SingleOrDefault();
                    
                    db.Follows.DeleteOnSubmit(td);
                    db.SubmitChanges();
                    return Ok(json);
                }
                catch (Exception)
                {
                    return NotFound();
                }
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
