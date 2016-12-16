﻿using System;
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
    public class QuanTriController : ApiController
    {
        private DataTraCuuVPDataContext db;
        [HttpPost]
        public IHttpActionResult edit_Trousers(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Trouser quan = new Trouser();
                        quan.Trousers = json.Name;
                        db.Trousers.InsertOnSubmit(quan);
                        db.SubmitChanges();
                        return Ok(json);
                    }
                    else
                    {
                        int maQuan = json.ID;
                        var query = (from a in db.Trousers
                            where a.IDTrousers == maQuan
                            select a).SingleOrDefault();
                        query.Trousers = json.Name;
                        db.SubmitChanges();
                        return Ok(json);
                    }
                   
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete_Trousers(int id_quan)
        {
           
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var phuongs = (from a in db.Wards where a.IDTrousers == id_quan select a).ToList();
                    foreach (var item in phuongs)
                    {
                        Delete_Wards(item.IDWard);
                    }
                    var quan = (from a in db.Trousers
                                where a.IDTrousers == id_quan
                                select a).SingleOrDefault();
                    db.Trousers.DeleteOnSubmit(quan);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        
        [HttpPost]
        public IHttpActionResult edit_Wards(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    
                    if (json.Is_Insert == 1)
                    {
                        Ward phuong = new Ward();
                        phuong.IDTrousers = json.IDTrouser;
                        phuong.Ward1 = json.Name;
                        db.Wards.InsertOnSubmit(phuong);
                        db.SubmitChanges();
                        return Ok(json);
                    }
                    else
                    {
                        int maphuong = json.ID;
                        var query = (from a in db.Wards
                                     where a.IDWard == maphuong
                                     select a).SingleOrDefault();
                        query.Ward1 = json.Name;
                        db.SubmitChanges();
                        return Ok(json);
                    }

                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete_Wards(int id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var duongs = (from a in db.Streets where a.IDWard == id select a).ToList();
                    foreach (var item in duongs)
                    {
                        Delete_Streets(item.IDStreet);
                    }
                    var phuong = (from a in db.Wards
                                where a.IDWard == id
                                select a).SingleOrDefault();
                    db.Wards.DeleteOnSubmit(phuong);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        


        [HttpPost]
        public IHttpActionResult edit_Streets(JObject data)
        {
          
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Street duong = new Street();
                        duong.IDWard = json.IDWard;
                        duong.Street1 = json.Name;
                        db.Streets.InsertOnSubmit(duong);
                        db.SubmitChanges();
                        return Ok(json);
                    }
                    else
                    {
                        int maduong = json.ID;
                        var query = (from a in db.Streets
                                     where a.IDStreet == maduong
                                     select a).SingleOrDefault();
                        query.Street1 = json.Name;
                        db.SubmitChanges();
                        return Ok(json);
                    }

                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete_Streets(int id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var duong = (from a in db.Streets
                                  where a.IDStreet == id
                                  select a).SingleOrDefault();
                    db.Streets.DeleteOnSubmit(duong);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IHttpActionResult edit_Price(JObject data)
        {

            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Price price = new Price();
                        price.Price1 = json.Name;
                        price.Sell = Convert.ToBoolean(json.Sell);
                        db.Prices.InsertOnSubmit(price);
                        db.SubmitChanges();
                        return Ok(json);
                    }
                    else
                    {
                        int IDPrice = json.ID;
                        var query = (from a in db.Prices
                                     where a.IDPrice == IDPrice
                                     select a).SingleOrDefault();
                        query.Price1 = json.Name;
                        db.SubmitChanges();
                        return Ok(json);
                    }

                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete_Price(int id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var price = (from a in db.Prices
                                 where a.IDPrice == id
                                 select a).SingleOrDefault();
                    db.Prices.DeleteOnSubmit(price);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }


        [HttpPost]
        public IHttpActionResult edit_Type(JObject data)
        {

            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Type_Land type = new Type_Land();
                        type.TypeName = json.Name;
                        type.Sell = Convert.ToBoolean(json.Sell);
                        db.Type_Lands.InsertOnSubmit(type);
                        db.SubmitChanges();
                        return Ok(json);
                    }
                    else
                    {
                        int idtype = json.ID;
                        var query = (from a in db.Type_Lands
                                     where a.IDType == idtype
                                     select a).SingleOrDefault();
                        query.TypeName = json.Name;
                        db.SubmitChanges();
                        return Ok(json);
                    }

                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete_Type(int id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var type = (from a in db.Type_Lands
                                 where a.IDType == id
                                 select a).SingleOrDefault();
                    db.Type_Lands.DeleteOnSubmit(type);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }


        public IHttpActionResult edit_Area(JObject data)
        {

            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Acreage acre = new Acreage();
                        acre.Acreage1 = json.Name;
                        db.Acreages.InsertOnSubmit(acre);
                        db.SubmitChanges();
                        return Ok(json);
                    }
                    else
                    {
                        int idacre = json.ID;
                        var query = (from a in db.Acreages
                                     where a.IDAcreage == idacre
                                     select a).SingleOrDefault();
                        query.Acreage1 = json.Name;
                        db.SubmitChanges();
                        return Ok(json);
                    }

                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult Delete_Area(int id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var acre = (from a in db.Acreages
                                where a.IDAcreage == id
                                select a).SingleOrDefault();
                    db.Acreages.DeleteOnSubmit(acre);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        public IHttpActionResult Banned_Customer(Guid id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var kh = (from a in db.Customers
                                where a.IDCustomer == id
                                select a).SingleOrDefault();
                    kh.Flag_Active = false;
                    MailMessage msg = new MailMessage();

                    msg.From = new MailAddress("ngocvupct1995@gmail.com");
                    string to_mail = kh.Email;
                    msg.To.Add(to_mail);
                    msg.Subject = "Banned Tài Khoản!";
                    msg.Body = string.Format("Tài Khoản "+kh.CustomerName+" Của Bạn Đã Bị Cấm. Mời bạn Liên Hệ Với Chúng Tôi Để Xác Nhận Lại!");
                    msg.IsBodyHtml = false;
                    SmtpClient smtp = new SmtpClient();
                    smtp.Host = "smtp.gmail.com";
                    smtp.EnableSsl = true;
                    NetworkCredential NetworkCred = new NetworkCredential("ngocvupct1995@gmail.com", "toilanumber1");

                    smtp.UseDefaultCredentials = true;
                    smtp.Credentials = NetworkCred;
                    smtp.Port = 587;
                    smtp.Send(msg);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpDelete]
        public IHttpActionResult UnSetAdmin(Guid id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var kh = (from a in db.Customers
                              where a.IDCustomer == id
                              select a).SingleOrDefault();
                    kh.Admin = false;
                  
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpPost]
        public IHttpActionResult SetAdmin(Guid id)
        {

            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var kh = (from a in db.Customers
                              where a.IDCustomer == id
                              select a).SingleOrDefault();
                    kh.Admin = true;

                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpPut]
        public IHttpActionResult Update_TK(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    Guid IDKH = json._makh;
                    var query = (from a in db.Customers
                        where a.IDCustomer == IDKH
                        select a).SingleOrDefault();
                    query.CustomerName = json._tenkh;
                    query.Organization = json._coquan;
                    query.Email = json._email;
                    query.PhoneNumber = json._sodt;
                    query.CMND = json._cmnd;
                    query.Address = json._diachi;
                    query.Gender = Convert.ToBoolean(json._gioitinh);
                    DateTime bith = Convert.ToDateTime(json._ngaysinh);
                    query.Birthday = bith;
                    db.SubmitChanges();
                    return Ok(json);
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpPut]
        public IHttpActionResult DuyetBai(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    int id_post = json._idPost;
                    //Land baidang = new Land();
                    var baidang = (from a in db.Lands where a.IDPost == id_post select a).SingleOrDefault();
                    baidang.Flag_Approval = true;
                    db.SubmitChanges();
                    return Ok(json);
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [HttpPut]
        public IHttpActionResult HuyBai(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    int id_post = json._idPost;
                    //Land baidang = new Land();
                    var baidang = (from a in db.Lands where a.IDPost == id_post select a).SingleOrDefault();
                    //baidang.Flag_Approval = true;
                    db.Lands.DeleteOnSubmit(baidang);
                    db.SubmitChanges();
                    return Ok(json);
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        public TKVanPhong get_bds_by_id(Guid mavp)
        {
            TKVanPhong vp;
            using (db = new DataTraCuuVPDataContext())
            {
                db.Connection.Open();
                var sql = (from a in db.Overview_Lands
                           join b in db.Lands
                           on a.IDLand equals b.IDLand
                           where a.IDLand == mavp
                           select new
                           {
                               a ,b.IDPost
                           }).SingleOrDefault();
                vp = new TKVanPhong
                {
                    _MaVP = sql.a.IDLand,
                    _Anh = sql.a.Image,
                    _MaDT = sql.a.IDAcreage,
                    _IDPrice = sql.a.IDPrice,
                    _TenVp = sql.a.Name,
                    _SoNha = sql.a.NumberHouse,
                    _MaQuan = sql.a.IDTrousers,
                    _CreateDate = sql.a.CreateDate,
                    _ModifyDate = sql.a.ModifyDate,
                    _MaDuong = sql.a.IDStreet,
                    _MaPL = sql.a.IDType,
                    _MaPhuong = sql.a.IDWard,
                    _Mota = sql.a.Decrition,
                    _ExpiredDate= sql.a.ExpiredDate,
                    _Sell = sql.a.Sell,
                    _Price_detail = sql.a.Price_detail,
                    _MaBaiDang = sql.IDPost
                    
                    
                };
                var kh = (from a in db.Customers
                    join b in db.Lands
                        on a.IDCustomer equals b.IDCustomer
                    where b.IDLand == sql.a.IDLand
                    select a).SingleOrDefault();

                vp._MaKH = kh.IDCustomer;
                vp._TenKH = kh.CustomerName;
                db.Connection.Close();
                return vp;

            }

        }
        [HttpPut]
        public IHttpActionResult Update_BDS(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    
                    Guid mavp = new Guid();
                    mavp = json._idLand;
                    var lands = (from a in db.Lands where a.IDLand == mavp select a).SingleOrDefault();
                    lands.Name = json._tieuDe;
                    lands.IDAcreage = Convert.ToInt32(json._dienTich);
                    lands.IDPrice = Convert.ToInt32(json._IDgia);
                    lands.Price_detail = Convert.ToDecimal(json._GiaChiTiet);
                    lands.IDType = Convert.ToInt32(json._kieuBDS);
                    bool sell =  Convert.ToBoolean(json._hinhThuc);
                    lands.Sell = sell;
                    lands.Decrition = json._moTa;
                    DateTime today = DateTime.Now;
                    lands.ModifyDate = DateTime.Parse(today.ToString("yyyy-MM-dd"));
                    DateTime expri_date = Convert.ToDateTime(json._hethan);
                    lands.ExpiredDate = expri_date;

                    lands.IDCustomer = json._idCustomer;
                    lands.Flag_Approval = false;
                    //lands.Image = json._Image();
                    // Lay ID cao nhat hien tai

                    // update address
                    var address = (from a in db.Addresses where a.IDAddress == lands.IDAddress select a).SingleOrDefault();
                 
                    address.IDStreet = json._duong;
                    address.NumberHouse = json._soNha;
                    
                    db.SubmitChanges();

                   
                    return Ok(json);
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        public IEnumerable<QuanTriBDS> get_thongtin_BDS()
        {
            var listvp = new List<QuanTriBDS>();
            using (db = new DataTraCuuVPDataContext())
            {
             
                var sql = (from a in db.Overview_Lands
                          
                           select a).ToList();
                foreach (var item in sql)
                {
                    listvp.Add(new QuanTriBDS
                    {
                        _MaVP = item.IDLand,
                        _TenVp = item.Name,
                        _TenLoai = item.TypeName,
                        _DiaCHi = item.NumberHouse + " " + item.Street + ", " + item.Trousers + ", TP Đà Nẵng.",
                        _Gia = item.Price_detail,
                        _DienTich = item.Acreage,
                        _CreateDate = item.CreateDate,
                        _ModifyDate = item.ModifyDate,
                        _ExpireDate = item.ExpiredDate,
                        HetHan = (item.ExpiredDate < DateTime.Now)?true:false,
                        
                    });
                }
                return listvp;

            }

        }
        [HttpPut]
        public IHttpActionResult ChangePass(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    //Customer customer = new Customer();
                    Guid maKH = json._makh;

                    var query = (from a in db.Customers
                                 where a.IDCustomer == maKH
                                 select a).SingleOrDefault();
                    if (query != null)
                    {
                        if (!query.Pass.Equals(json._oldPass.ToString()))
                        {
                            return NotFound();
                        }
                        query.Pass = json._newPass;
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

    }
}