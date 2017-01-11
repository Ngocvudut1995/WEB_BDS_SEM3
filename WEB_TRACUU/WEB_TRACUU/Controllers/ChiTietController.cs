using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Sockets;
using System.Runtime.Remoting.Messaging;
using System.ServiceModel.Channels;
using System.Web;
using System.Web.Hosting;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class ChiTietController : ApiController
    {
        private DataTraCuuVPDataContext db;
        [HttpGet]
        public IEnumerable<Image_Slide_VP> get_image_VP(Guid mavp)
        {
            using (db = new DataTraCuuVPDataContext())
            {
                //var ma_vp = new Guid("9b8e4a0e-1fa1-4baa-9613-2e9dda5adff4");
                var images = (from b in db.Image_Details where b.IDLand == mavp select b).ToList();
                IList<Image_Slide_VP> list = new List<Image_Slide_VP>();
                foreach (var item in images)
                {
                    list.Add(new Image_Slide_VP(item.Image_detail1, item.Title));
                }
                return list;
            }

        }

        public string get_title_by_id(Guid mavp)
        {
            using (db = new DataTraCuuVPDataContext())
            {
                var query = (from a in db.Lands
                    where a.IDLand == mavp
                    select a).SingleOrDefault();
                return query.Name;
            }
        }
        public BDS_Detail get_vp_by_id(Guid mavp)
        {
            BDS_Detail vp;
            using (db = new DataTraCuuVPDataContext())
            {
                
                var sql = (from a in db.Overview_Lands
                           join b in db.Lands on a.IDLand equals b.IDLand
                           join c in db.Customers on b.IDCustomer equals c.IDCustomer
                           where a.IDLand == mavp
                           select new
                           {
                               a,
                               c.IDCustomer,
                               c.CustomerName,
                               c.Email,
                               c.PhoneNumber
                           }).SingleOrDefault();
                vp = new BDS_Detail
                {
                    _IDLand = sql.a.IDLand,
                    _Image = sql.a.Image,
                    _Acreage = sql.a.Acreage,
                    _Price = sql.a.Price,
                    _Name = sql.a.Name,
                    _NumberHouse = sql.a.Numhouse,
                    _Trousers = sql.a.Trousers,
                    _CreateDate = sql.a.CreateDate,
                    _ModifyDate = sql.a.ModifyDate,
                    _Street = sql.a.Street,
                    _TypeName = sql.a.TypeNameDetail,
                    _Ward = sql.a.Ward,
                    _Decription = sql.a.Decrition,
                    _ExpireDate = sql.a.ExpiredDate,
                    _IDType = sql.a.IDType,
                    _Sell = sql.a.Sell,
                    _IDCustomer = sql.IDCustomer,
                    _NameCustomer = sql.CustomerName,
                    _EmailCustomer = sql.Email,
                    _PhoneCustomer = sql.PhoneNumber




                };

                var images = (from b in db.Image_Details where b.IDLand == mavp select b).ToList();
                IList<Image_Slide_VP> list = new List<Image_Slide_VP>();
                foreach (var item in images)
                {
                    list.Add(new Image_Slide_VP(item.Image_detail1, item.Title));
                }
                vp._Images_detail = list;
               
                return vp;

            }

        }
      
        public class BDS
        {
            public Guid _IDLand;
            public string _Name;
            public string _Image;
            public bool? _Sell;
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_VP_Tuong_Tu(Guid id)
        {
         
     
            Dictionary<Guid,int> list_vp = new Dictionary<Guid, int>();
           
            using (db = new DataTraCuuVPDataContext())
            {
                var land = (from a in db.Overview_Lands where a.IDLand == id select a).SingleOrDefault();
                // xet cung loai
                var query = (from a in db.Overview_Lands
                    join b in db.TypeDetails on a.IDTypeDetail equals b.IDTypeDetail
                             where a.IDType == b.IDType && a.IDTypeDetail == land.IDTypeDetail && a.Flag_Approval == true
                             select new
                             {
                                 a.IDLand,
                                
                             }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    } 
                }
                //xet cung loai chi tiet
                query = (from a in db.Overview_Lands
                             where a.IDTypeDetail == land.IDTypeDetail && a.Flag_Approval == true
                         select new
                             {
                                 a.IDLand,

                             }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    }
                }
                // xet cung duong
                query = (from a in db.Overview_Lands
                         where a.IDStreet == land.IDStreet && a.Flag_Approval == true
                         select new
                         {
                             a.IDLand,

                         }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    }
                }
                // cung phuong
                query = (from a in db.Overview_Lands
                         where a.IDWard == land.IDWard && a.Flag_Approval == true
                         select new
                         {
                             a.IDLand,

                         }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    }
                }
                // cung quan
                query = (from a in db.Overview_Lands
                         where a.IDTrousers == land.IDTrousers && a.Flag_Approval == true
                         select new
                         {
                             a.IDLand,

                         }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    }
                }
                // cung dien tich
                query = (from a in db.Overview_Lands
                        
                         where a.IDAcreage == land.IDAcreage && a.Flag_Approval == true
                         select new
                         {
                             a.IDLand,
                         }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    }
                }
                // xet gia
                query = (from a in db.Overview_Lands

                         where a.IDPrice == land.IDPrice && a.Flag_Approval == true
                         select new
                         {
                             a.IDLand,
                         }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    }
                }

                // xet huong
                query = (from a in db.Overview_Lands

                         where a.IDDirection == land.IDDirection && a.Flag_Approval == true
                         select new
                         {
                             a.IDLand,
                         }).ToList();
                foreach (var item in query)
                {
                    if (list_vp.ContainsKey(item.IDLand))
                    {
                        int value = list_vp[item.IDLand] + 1;
                        list_vp.Remove(item.IDLand);
                        list_vp.Add(item.IDLand, value);
                    }
                    else
                    {
                        list_vp.Add(item.IDLand, 1);
                    }
                }
                IList<TKVanPhong> list = new List<TKVanPhong>();
                foreach (var item in list_vp.OrderByDescending(r => r.Value).Take(4))
                {
                    var vp = (from a in db.Overview_Lands
                              where a.IDLand == item.Key
                              select a).SingleOrDefault();
                    
                        list.Add(new TKVanPhong
                        {
                            _LoaiDat = vp.TypeNameDetail,
                            _TenKH = vp.CustomerName,
                            _PhoneNumber = vp.PhoneNumber,
                            _MaVP = vp.IDLand,
                            _Anh = vp.Image,
                            _MaDT = vp.IDAcreage,
                            _Dientich = vp.Acreage,
                            _IDPrice = vp.IDPrice,
                            _Mota = vp.Decrition,
                            _TenVp = vp.Name,
                            _SoNha = vp.Numhouse,
                            _MaQuan = (int)vp.IDTrousers,
                            _TenQuan = vp.Trousers,
                            _MaLoai = (int)vp.IDType,
                            _MaLoaiCT = vp.IDTypeDetail,
                            _Duong = vp.Street,
                            _Phuong = vp.Ward,
                            _MaPhuong = vp.IDWard,
                            _MaDuong = vp.IDStreet,
                            _CreateDate = vp.CreateDate,
                            _ModifyDate = vp.ModifyDate,
                            _Sell = vp.Sell,
                            _ExpiredDate = vp.ExpiredDate,
                            _Gia = vp.Price,
                            _Price_detail = vp.Price_detail,
                            _Area_detail = vp.Area_detail,
                            _HetHan = (vp.ExpiredDate > DateTime.Now) ? false : true
                        });
                    }
                return list;
            }
               
            }

        [HttpPost]
        public string Send_Contact_To_Own(JObject data)
        {
            dynamic json = data;
            try
            {
                MailMessage msg = new MailMessage();
                msg.From = new MailAddress("ngocvupct1995@gmail.com");
                string to_mail = json._MailTo.ToString();
                msg.To.Add(to_mail);
                //msg.CC.Add("ngocvudut1995@gmail.com");
                StreamReader reader = new StreamReader(HostingEnvironment.MapPath("/Views/Shared/sendmail_contact.html"));
                string readFile = reader.ReadToEnd();
                string StrContent = "";
                StrContent = readFile;
                StrContent = StrContent.Replace("[UserName]", json._NameOwn.ToString());
                StrContent = StrContent.Replace("[TenKH]", json._Name.ToString());
                StrContent = StrContent.Replace("[EmailKH]", json._Mail_Contact.ToString());
                StrContent = StrContent.Replace("[PhoneKH]", json._Phone.ToString());
                StrContent = StrContent.Replace("[BodyKH]", json._Body.ToString());

                msg.Subject = "TraCuuBDS Thông Báo Có Khách Hàng Muốn Liên Hệ Với Bạn.";
               
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
                return "Success";
            }
            catch (Exception)
            {

                return "Error";
            }
            
        }

        public static string GetLocalIPAddress()
        {
            var host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (var ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    return ip.ToString();
                }
            }
            throw new Exception("Local IP Address Not Found!");
        }
        public string GetIp()
        {
            return GetClientIp();
        }

        private string GetClientIp(HttpRequestMessage request = null)
        {
            request = request ?? Request;

            if (request.Properties.ContainsKey("MS_HttpContext"))
            {
                return ((HttpContextWrapper)request.Properties["MS_HttpContext"]).Request.UserHostAddress;
            }
            else if (request.Properties.ContainsKey(RemoteEndpointMessageProperty.Name))
            {
                RemoteEndpointMessageProperty prop = (RemoteEndpointMessageProperty)request.Properties[RemoteEndpointMessageProperty.Name];
                return prop.Address;
            }
            else if (HttpContext.Current != null)
            {
                return HttpContext.Current.Request.UserHostAddress;
            }
            else
            {
                return null;
            }
        }
        [HttpPut]
        public IHttpActionResult addView(JObject data)
        {
            dynamic json = data;
            string ip = GetIp();
            //string clientAddress = HttpContext.Current.Request.UserHostAddress;'
           // Request.GetClientIpAddress();
            //var address = Request.GetClientIpAddress();
            //var scopeId = address.ScopeId;
            //string add = System.Web.HttpContext.Current.Request.UserHostName;
            try
            {
                //string ip = GetLocalIPAddress();
                using (db = new DataTraCuuVPDataContext())
                {
                    //Customer customer = new Customer();
                    Guid idLand = json._idLand;
                    var queryBool = (from a in db.InternetProtocols
                                     where a.ip == ip && a.idLand == idLand
                                     select a).SingleOrDefault();
                    if (queryBool != null)
                    {

                        return Ok(json);
                    }

                    InternetProtocol interPro = new InternetProtocol();
                    interPro.ip = ip;
                    interPro.idLand = idLand;
                    db.InternetProtocols.InsertOnSubmit(interPro);
                    db.SubmitChanges();
                    //
                    var query = (from a in db.Lands
                                 where a.IDLand == idLand
                                 select a).SingleOrDefault();
                    if (query != null)
                    {
                        query.View += 1;
                        db.SubmitChanges();
                    }
                    return Ok(json);
                }
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpGet]
        public IEnumerable<Furiture> get_furiture()
        {
            using (db = new DataTraCuuVPDataContext())
            {

                var furiture = (from a in db.Furitures
                              select a).ToList();
                IList<Furiture> list = new List<Furiture>();
                foreach (var item in furiture)
                {
                    list.Add(new Furiture
                    {
                        Furiture_Name = item.Furiture_Name,
                        IDFuriture = item.IDFuriture, 
                        Image = item.Image
                    });
                }
                return list;
            }

        }
        [HttpGet]
        public IEnumerable<Furiture> get_furiture_by_id(Guid mavp)
        {
            using (db = new DataTraCuuVPDataContext())
            {
              
                var furiture = (from a in db.Furiture_details
                    join b in db.Furitures on a.IDFuriture equals b.IDFuriture
                
                where a.IDLand == mavp select b).ToList();
                IList<Furiture> list = new List<Furiture>();
                foreach (var item in furiture)
                {
                    list.Add(new Furiture
                    {
                        Furiture_Name = item.Furiture_Name,
                        IDFuriture = item.IDFuriture,
                       
                    });
                }
                return list;
            }

        }
        [HttpGet]
        public IEnumerable<Convenient> get_convenient()
        {
            using (db = new DataTraCuuVPDataContext())
            {

                var convenient = (from a in db.Convenients
                              select a).ToList();
                IList<Convenient> list = new List<Convenient>();
                foreach (var item in convenient)
                {
                    list.Add(new Convenient
                    {
                        Convenient_Name = item.Convenient_Name,
                        IDConvenient = item.IDConvenient,
                        Image = item.Image
                    });
                }
                return list;
            }

        }
        [HttpGet]
        public IEnumerable<Convenient> get_convenient_by_id(Guid mavp)
        {
            using (db = new DataTraCuuVPDataContext())
            {

                var convenient = (from a in db.Convenient_Details
                              join b in db.Convenients on a.IDConvenient equals b.IDConvenient

                              where a.IDLand == mavp
                              select b).ToList();
                IList<Convenient> list = new List<Convenient>();
                foreach (var item in convenient)
                {
                    list.Add(new Convenient
                    {
                         Convenient_Name= item.Convenient_Name,
                        IDConvenient = item.IDConvenient
                    });
                }
                return list;
            }

        }
    }
}
