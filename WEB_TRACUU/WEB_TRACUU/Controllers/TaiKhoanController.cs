using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Helpers;
using System.Web.Hosting;
using System.Web.Http;
using System.Web.UI.WebControls;
using Newtonsoft.Json.Linq;
using WebGrease;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class TaiKhoanController : ApiController
    {
        DataTraCuuVPDataContext db;
        [HttpGet]
        public int KT_TaiKhoan_TonTai(string user)
        {
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var kh = (from a in db.Customers where a.Username == user select a).SingleOrDefault();
                    if (kh != null) return 1;
                    return 0;
                }
            }
            catch (Exception)
            {
                
                throw;
            }
           
          
        }
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
        [HttpPut]
        public IHttpActionResult KichHoatTK(JObject data)
        {
            dynamic json = data;
            Guid ma_kh = Guid.NewGuid();
            using (db = new DataTraCuuVPDataContext())
            {
                if (!string.IsNullOrEmpty(json.makh.ToString()))
                {
                    ma_kh = Guid.Parse(json.makh.ToString());
                }

                try
                {
                    var kh = (from a in db.Customers where a.IDCustomer == ma_kh select a).SingleOrDefault();
                    kh.Flag_Active = true;
                    db.SubmitChanges();
                    return Ok(json.makh);
                }
                catch (Exception)
                {
                    return NotFound();
                }
            }

        }
        [HttpPost]
        public string TaoTK(JObject dataCustomer)
        {
            dynamic jsonCustomer = dataCustomer;
            using (db = new DataTraCuuVPDataContext())
            {
                try
                {
                    Customer kh = new Customer();
                    kh.IDCustomer = Guid.NewGuid();
                    kh.Username = jsonCustomer._user;
                    kh.Pass = jsonCustomer._pass;
                    kh.Address = jsonCustomer._diachi;
                    kh.PhoneNumber = jsonCustomer._sodt;
                    kh.Organization = jsonCustomer._coquan;
                    kh.Email = jsonCustomer._email;
                    //set lai trong data
                    kh.Flag_Active = false;
                    kh.CustomerName = jsonCustomer._tenkh;
                    kh.CMND = jsonCustomer._cmnd;
                    kh.Birthday = Convert.ToDateTime(jsonCustomer._ngaysinh);
                    kh.Gender = Convert.ToBoolean(jsonCustomer._gioitinh);


                   

                   
                    string urlActive = string.Format("{0}/Home/Active", HttpContext.Current.Request.Url.Authority);
                    MailMessage msg = new MailMessage();
                    msg.From = new MailAddress("ngocvupct1995@gmail.com");
                    string to_mail = jsonCustomer._email.ToString();
                    msg.To.Add(to_mail);
                    StreamReader reader = new StreamReader(HostingEnvironment.MapPath("/Views/Shared/SendEmail.html"));
                    string readFile = reader.ReadToEnd();
                    string StrContent = "";
                    StrContent = readFile;
                    string url = string.Format("http://{0}/{1}", urlActive, kh.IDCustomer);
                    StrContent = StrContent.Replace("[UserName]", kh.CustomerName);
                    StrContent = StrContent.Replace("[link_active]", url);
                    
                    msg.Subject = "Cảm ơn bạn đã quan tâm tới chúng tôi.";
                    msg.Body = string.Format("Bạn Đã Tạo Tài Khoản của chúng tôi. Mời bạn Vào Link http://{0}/{1} để kích hoạt.", urlActive, kh.IDCustomer);
                    msg.Body = StrContent.ToString();
                    msg.IsBodyHtml = true;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    NetworkCredential NetworkCred = new NetworkCredential("ngocvupct1995@gmail.com", "toilanumber1");

                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 587;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

                    smtp.Send(msg);
                    db.Customers.InsertOnSubmit(kh);
                    db.SubmitChanges();

                    return "Success";
                }
                catch (Exception ex)
                {
                    return ex.Message.ToString();
                }
            }

        }
        [HttpGet]
        public IEnumerable<BDS_Detail> get_Land_by_IDCustumer(Guid makh)
        {
            List<BDS_Detail> list = new List<BDS_Detail>();
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    db.Connection.Open();
                    var sql = from a in db.Lands
                              join c in db.Overview_Lands on a.IDLand equals c.IDLand
                              join d in db.Customers on a.IDCustomer equals d.IDCustomer
                              where a.IDCustomer == makh
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
                            _NumberHouse = item.c.NumberHouse,


                        });
                    }
                    db.Connection.Close();
                    return list;

                }
            }
            catch (Exception)
            {

                return null;
            }


        }
        [HttpGet]
        public IEnumerable<BDS_BY_KH> get_Land_by_Signing(Guid makh)
        {
            List<BDS_BY_KH> list = new List<BDS_BY_KH>();
            using (db = new DataTraCuuVPDataContext())
            {
                var query_test = (from a in db.Customers where a.IDCustomer == makh select new { a.Admin }).SingleOrDefault();
                if (query_test.Admin == true)
                {
                    var sql = (from a in db.Lands
                        join b in db.Customers on a.IDCustomer equals b.IDCustomer
                        join c in db.Overview_Lands on a.IDLand equals c.IDLand
                        where a.ExpiredDate > DateTime.Now && a.Flag_Approval == true
                              
                        select new
                        {
                            a,
                            b.CustomerName,
                            b.IDCustomer,
                            c.NumberHouse,
                            c.Street,
                            c.Trousers,
                            c.Ward,
                            c.Acreage,
                            c.TypeName,
                            

                        }).OrderByDescending(k=>k.a.ModifyDate);
                    foreach (var item in sql)
                    {
                        BDS_Detail b = new BDS_Detail();
                        b._IDLand = item.a.IDLand;
                        b._Name = item.a.Name;
                        b._CreateDate = item.a.CreateDate;
                        b._ModifyDate = item.a.ModifyDate;
                        b._Decription = item.a.Decrition;
                        b._NumberHouse = item.NumberHouse;
                        b._Street = item.Street;
                        b._Trousers = item.Trousers;
                        b._Ward = item.Ward;
                        b._Acreage = item.Acreage;
                        b._ExpireDate = item.a.ExpiredDate;
                        b._Image = item.a.Image;
                        b._TypeName = item.TypeName;
                        b._IDType = item.a.IDType;
                        b._Price_detail = item.a.Price_detail;
                        list.Add(new BDS_BY_KH
                        {
                            bds = b,
                            Name_Customer = item.CustomerName,
                            ID_Customer = item.IDCustomer,
                            IDPrice = item.a.IDPrice,
                            IDAcreage = item.a.IDAcreage,
                            _IDPost = item.a.IDPost
                        });
                    }
                }
                else
                {
                    var sql = (from a in db.Lands
                              join b in db.Customers on a.IDCustomer equals b.IDCustomer
                              join c in db.Overview_Lands on a.IDLand equals c.IDLand
                              where a.ExpiredDate > DateTime.Now && a.Flag_Approval == true
                              && a.IDCustomer == makh
                              select new
                              {
                                  a,
                                  b.CustomerName,
                                  b.IDCustomer,
                                  c.NumberHouse,
                                  c.Street,
                                  c.Trousers,
                                  c.Ward,
                                  c.Acreage,
                                  c.TypeName,

                              }).OrderByDescending(k => k.a.ModifyDate); ;
                    foreach (var item in sql)
                    {
                        BDS_Detail b = new BDS_Detail();
                        b._IDLand = item.a.IDLand;
                        b._Name = item.a.Name;
                        b._CreateDate = item.a.CreateDate;
                        b._ModifyDate = item.a.ModifyDate;
                        b._Decription = item.a.Decrition;
                        b._NumberHouse = item.NumberHouse;
                        b._Street = item.Street;
                        b._Trousers = item.Trousers;
                        b._Ward = item.Ward;
                        b._Acreage = item.Acreage;
                        b._ExpireDate = item.a.ExpiredDate;
                        b._Image = item.a.Image;
                        b._TypeName = item.TypeName;
                        b._IDType = item.a.IDType;
                        b._Price_detail = item.a.Price_detail;
                        list.Add(new BDS_BY_KH
                        {
                            bds = b,
                            Name_Customer = item.CustomerName,
                            ID_Customer = item.IDCustomer,
                            IDPrice = item.a.IDPrice,
                            IDAcreage = item.a.IDAcreage,
                            _IDPost = item.a.IDPost
                        });
                    }
                }
             
                return list;
            }
        }

        [HttpGet]
        public IEnumerable<BDS_BY_KH> get_Land_by_ExpiredDate(Guid makh)
        {
            List<BDS_BY_KH> list = new List<BDS_BY_KH>();
            using (db = new DataTraCuuVPDataContext())
            {
                var query_test = (from a in db.Customers where a.IDCustomer == makh select new { a.Admin }).SingleOrDefault();
             
                if (query_test.Admin == true)
                {
                    var sql = from a in db.Lands
                              join b in db.Customers on a.IDCustomer equals b.IDCustomer
                              join c in db.Overview_Lands on a.IDLand equals c.IDLand
                              where a.ExpiredDate < DateTime.Now
                              select new
                              {
                                  a,
                                  b.CustomerName,
                                  b.IDCustomer,
                                  c.NumberHouse,
                                  c.Street,
                                  c.Trousers,
                                  c.Ward,
                                  c.Acreage,
                                  c.TypeName,

                              };
                    foreach (var item in sql)
                    {
                        BDS_Detail b = new BDS_Detail();
                        b._IDLand = item.a.IDLand;
                        b._Name = item.a.Name;
                        b._CreateDate = item.a.CreateDate;
                        b._ModifyDate = item.a.ModifyDate;
                        b._Decription = item.a.Decrition;
                        b._NumberHouse = item.NumberHouse;
                        b._Street = item.Street;
                        b._Trousers = item.Trousers;
                        b._Ward = item.Ward;
                        b._Acreage = item.Acreage;
                        b._ExpireDate = item.a.ExpiredDate;
                        b._Image = item.a.Image;
                        b._TypeName = item.TypeName;
                        b._IDType = item.a.IDType;
                        b._Price_detail = item.a.Price_detail;
                        list.Add(new BDS_BY_KH
                        {
                            bds = b,
                            Name_Customer = item.CustomerName,
                            ID_Customer = item.IDCustomer,
                            IDPrice = item.a.IDPrice,
                            IDAcreage = item.a.IDAcreage,
                            _IDPost = item.a.IDPost
                        });
                    }
                }
                else
                {
                    var sql = (from a in db.Lands
                              join b in db.Customers on a.IDCustomer equals b.IDCustomer
                              join c in db.Overview_Lands on a.IDLand equals c.IDLand
                              where a.ExpiredDate < DateTime.Now && a.IDCustomer == makh
                              select new
                              {
                                  a,
                                  b.CustomerName,
                                  b.IDCustomer,
                                  c.NumberHouse,
                                  c.Street,
                                  c.Trousers,
                                  c.Ward,
                                  c.Acreage,
                                  c.TypeName,

                              }).ToList();
                    foreach (var item in sql)
                    {
                        BDS_Detail b = new BDS_Detail();
                        b._IDLand = item.a.IDLand;
                        b._Name = item.a.Name;
                        b._CreateDate = item.a.CreateDate;
                        b._ModifyDate = item.a.ModifyDate;
                        b._Decription = item.a.Decrition;
                        b._NumberHouse = item.NumberHouse;
                        b._Street = item.Street;
                        b._Trousers = item.Trousers;
                        b._Ward = item.Ward;
                        b._Acreage = item.Acreage;
                        b._ExpireDate = item.a.ExpiredDate;
                        b._Image = item.a.Image;
                        b._TypeName = item.TypeName;
                        b._IDType = item.a.IDType;
                        b._Price_detail = item.a.Price_detail;
                        list.Add(new BDS_BY_KH
                        {
                            bds = b,
                            Name_Customer = item.CustomerName,
                            ID_Customer = item.IDCustomer,
                            IDPrice = item.a.IDPrice,
                            IDAcreage = item.a.IDAcreage,
                            _IDPost = item.a.IDPost
                        });
                    }
                }
              
                return list;
            }
        }

        [HttpGet]
        public IEnumerable<BDS_BY_KH> get_Land_by_Unconfimred(Guid makh)
        {
            List<BDS_BY_KH> list = new List<BDS_BY_KH>();

            using (db = new DataTraCuuVPDataContext())
            {
                var query_test = (from a in db.Customers where a.IDCustomer == makh select new { a.Admin }).SingleOrDefault();
                if (query_test.Admin == true)
                {
                    var sql = from a in db.Lands
                        join b in db.Customers on a.IDCustomer equals b.IDCustomer
                        join c in db.Overview_Lands on a.IDLand equals c.IDLand
                        where a.Flag_Approval == false
                        select new
                        {
                            a,
                            b.CustomerName,
                            b.IDCustomer,
                            c.NumberHouse,
                            c.Street,
                            c.Trousers,
                            c.Ward,
                            c.Acreage,
                            c.TypeName,

                        };
                    foreach (var item in sql)
                    {
                        BDS_Detail b = new BDS_Detail();
                        b._IDLand = item.a.IDLand;
                        b._Name = item.a.Name;
                        b._CreateDate = item.a.CreateDate;
                        b._ModifyDate = item.a.ModifyDate;
                        b._Decription = item.a.Decrition;
                        b._NumberHouse = item.NumberHouse;
                        b._Street = item.Street;
                        b._Trousers = item.Trousers;
                        b._Ward = item.Ward;
                        b._Acreage = item.Acreage;
                        b._ExpireDate = item.a.ExpiredDate;
                        b._Image = item.a.Image;
                        b._TypeName = item.TypeName;
                        b._IDType = item.a.IDType;
                        b._Price_detail = item.a.Price_detail;
                        list.Add(new BDS_BY_KH
                        {
                            bds = b,
                            Name_Customer = item.CustomerName,
                            ID_Customer = item.IDCustomer,
                            IDPrice = item.a.IDPrice,
                            IDAcreage = item.a.IDAcreage,
                            _IDPost = item.a.IDPost
                        });
                    }
                }
                else
                {
                    var sql = from a in db.Lands
                              join b in db.Customers on a.IDCustomer equals b.IDCustomer
                              join c in db.Overview_Lands on a.IDLand equals c.IDLand
                              where a.Flag_Approval == false && a.IDCustomer == makh
                              select new
                              {
                                  a,
                                  b.CustomerName,
                                  b.IDCustomer,
                                  c.NumberHouse,
                                  c.Street,
                                  c.Trousers,
                                  c.Ward,
                                  c.Acreage,
                                  c.TypeName,

                              };
                    foreach (var item in sql)
                    {
                        BDS_Detail b = new BDS_Detail();
                        b._IDLand = item.a.IDLand;
                        b._Name = item.a.Name;
                        b._CreateDate = item.a.CreateDate;
                        b._ModifyDate = item.a.ModifyDate;
                        b._Decription = item.a.Decrition;
                        b._NumberHouse = item.NumberHouse;
                        b._Street = item.Street;
                        b._Trousers = item.Trousers;
                        b._Ward = item.Ward;
                        b._Acreage = item.Acreage;
                        b._ExpireDate = item.a.ExpiredDate;
                        b._Image = item.a.Image;
                        b._TypeName = item.TypeName;
                        b._IDType = item.a.IDType;
                        b._Price_detail = item.a.Price_detail;
                        list.Add(new BDS_BY_KH
                        {
                            bds = b,
                            Name_Customer = item.CustomerName,
                            ID_Customer = item.IDCustomer,
                            IDPrice = item.a.IDPrice,
                            IDAcreage = item.a.IDAcreage,
                            _IDPost = item.a.IDPost
                        });
                    }
                }
                
               
                return list;
            }
        }

        [HttpPost]
        public IHttpActionResult Creat_BDS(JObject data)
        {
            dynamic json = data;

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    db.Connection.Open();
                    Land lands = new Land();
                    lands.IDLand = Guid.NewGuid();
                    lands.IDAddress = json._Name;
                    lands.IDAcreage = json._DienTich;
                    lands.IDPrice = json._Price;
                    lands.IDType = json._IDType;
                    lands.Sell = json.Sell;
                    lands.Decrition = json._Decription;
                    lands.CreateDate = new DateTime();
                    lands.ModifyDate = new DateTime();
                    lands.ExpiredDate = json._ExpiredDate;
                    lands.IDCustomer = json._IDCustomer;
                    lands.Flag_Approval = false;
                    lands.Image = json._Image();
                    // Lay ID cao nhat hien tai
                    var IDAddress_current = (from a in db.Addresses
                                             select new { a.IDAddress })
                                             .OrderByDescending(k => k.IDAddress)
                                             .Take(1).SingleOrDefault();
                    // Insert address
                    Address address = new Address();
                    address.IDStreet = json._Street;
                    address.NumberHouse = json._NumberHouse;
                    db.Addresses.InsertOnSubmit(address);
                    db.SubmitChanges();

                    lands.IDAddress = IDAddress_current.IDAddress + 1;
                    db.Lands.InsertOnSubmit(lands);
                    db.SubmitChanges();

                    db.Connection.Close();
                    return Ok(json);
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpGet]
        public IEnumerable<Customer> get_all_customer()
        {
            List<Customer> list = new List<Customer>();
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
                        Email = item.Email,
                        Address = item.Address,
                        Admin = item.Admin,
                        CMND = item.CMND,
                        PhoneNumber = item.PhoneNumber,
                        Organization = item.Organization

                    });
                }
                db.Connection.Close();
                return list;
            }
        }

    }
}
