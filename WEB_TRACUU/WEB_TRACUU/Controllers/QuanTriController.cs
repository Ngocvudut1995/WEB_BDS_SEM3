﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Newtonsoft.Json.Linq;
using WEB_TRACUU.Areas.Administrator.Models;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class QuanTriController : ApiController
    {
        private DataTraCuuVPDataContext db;

        private bool test_quyenadmin()
        {
            string username = null;
            try
            {
                username = HttpContext.Current.Request.Cookies["user"].Value;
            }
            catch (Exception)
            {


            }
            if (username != null)
            {
                Guid id = new Guid(username);
                using (db = new DataTraCuuVPDataContext())
                {
                    var sql = (from a in db.Customers
                               where a.IDCustomer == id
                               select a).SingleOrDefault();
                    if (sql != null)
                    {
                        if (sql.Admin == true)
                        {
                            return true;
                        }

                    }

                }
            }
            return false;
        }

        private bool test_user(Guid idcustomer)
        {
            string username = null;
            try
            {
                username = HttpContext.Current.Request.Cookies["user"].Value;
            }
            catch (Exception)
            {


            }
            if (username != null)
            {
                Guid id = new Guid(username);
                if (id == idcustomer) return true;

            }
            return false;
        }
        [System.Web.Http.HttpPost]
        public IHttpActionResult edit_Trousers(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Trousers(int id_quan)
        {
            if (test_quyenadmin() == false) return NotFound();
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var phuongs = (from a in db.Wards where a.IDTrousers == id_quan select a).ToList();
                    foreach (var sql in phuongs)
                    {
                        Delete_Wards(sql.IDWard);
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


        [System.Web.Http.HttpPost]
        public IHttpActionResult edit_Wards(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Wards(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    
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



        [System.Web.Http.HttpPost]
        public IHttpActionResult edit_Streets(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Street duong = new Street();
                        duong.IDTrousers = json.IDtrouser;
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
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Streets(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
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

        [System.Web.Http.HttpPost]
        public IHttpActionResult edit_Price(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Price(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
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


        [System.Web.Http.HttpPost]
        public IHttpActionResult edit_Type(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        TypeDetail type = new TypeDetail();
                        type.TypeNameDetail = json.Name;
                        type.Sell = Convert.ToBoolean(json.Sell);
                        db.TypeDetails.InsertOnSubmit(type);
                        db.SubmitChanges();
                        return Ok(json);
                    }
                    else
                    {
                        int idtype = json.ID;
                        var query = (from a in db.TypeDetails
                                     where a.IDType == idtype
                                     select a).SingleOrDefault();
                        query.TypeNameDetail = json.Name;
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
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Type(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    var type = (from a in db.TypeDetails
                                where a.IDType == id
                                select a).SingleOrDefault();
                    db.TypeDetails.DeleteOnSubmit(type);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }

        [System.Web.Http.HttpPost]
        public IHttpActionResult edit_Area(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Area(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
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

        [System.Web.Http.HttpDelete]
        public IHttpActionResult Banned_Customer(Guid id)
        {
            if (test_quyenadmin() == false) return NotFound();

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
                    msg.Body = string.Format("Tài Khoản " + kh.CustomerName + " Của Bạn Đã Bị Cấm. Mời bạn Liên Hệ Với Chúng Tôi Để Xác Nhận Lại!");
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
        [System.Web.Http.HttpDelete]
        public IHttpActionResult UnSetAdmin(Guid id)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpPost]
        [ValidateAntiForgeryToken]
        public IHttpActionResult SetAdmin(Guid id)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpPut]
        public IHttpActionResult Update_TK(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpPut]
        public IHttpActionResult DuyetBai(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
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
        [System.Web.Http.HttpPut]
        public IHttpActionResult HuyBai(JObject data)
        {
            if (test_quyenadmin() == false) return NotFound();
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
                           where a.IDLand == mavp
                           select a).SingleOrDefault();
                vp = new TKVanPhong
                {
                    _LoaiDat = sql.TypeNameDetail,
                    _TenKH = sql.CustomerName,
                    _PhoneNumber = sql.PhoneNumber,
                    _MaVP = sql.IDLand,
                    _Anh = sql.Image,
                    _MaDT = sql.IDAcreage,
                    _Dientich = sql.Acreage,
                    _IDPrice = sql.IDPrice,
                    _Mota = sql.Decrition,
                    _TenVp = sql.Name,
                    _SoNha = sql.Numhouse,
                    _MaQuan = (int)sql.IDTrousers,
                    _TenQuan = sql.Trousers,
                    _MaLoai = (int)sql.IDType,
                    _MaLoaiCT = sql.IDTypeDetail,
                    _Duong = sql.Street,
                    _Phuong = sql.Ward,
                    _MaPhuong = sql.IDWard,
                    _MaDuong = sql.IDStreet,
                    _CreateDate = sql.CreateDate,
                    _ModifyDate = sql.ModifyDate,
                    _Sell = sql.Sell,
                    _ExpiredDate = sql.ExpiredDate,
                    _Gia = sql.Price,
                    _Price_detail = sql.Price_detail,
                    _Area_detail = sql.Area_detail,
                    _IDDirection = sql.IDDirection,
                    _HetHan = (sql.ExpiredDate > DateTime.Now) ? false : true


                };
                var kh = (from a in db.Customers
                          join b in db.Lands
                              on a.IDCustomer equals b.IDCustomer
                          where b.IDLand == sql.IDLand
                          select new
                          {
                              a,
                              b.IDPost
                          }).SingleOrDefault();
                vp._MaBaiDang = kh.IDPost;
                vp._MaKH = kh.a.IDCustomer;
                vp._TenKH = kh.a.CustomerName;
                db.Connection.Close();
                return vp;

            }

        }

        [System.Web.Http.HttpPut]
        public IHttpActionResult Update_BDS(JObject data)
        {
            dynamic json = data;

            using (db = new DataTraCuuVPDataContext())
            {

                try
                {
                    Guid mavp = new Guid();
                    mavp = json._idLand;
                    var lands = (from a in db.Lands where a.IDLand == mavp select a).SingleOrDefault();
                    Guid idcustomer = new Guid();
                    idcustomer = (Guid) lands.IDCustomer;
                    if (test_user(idcustomer) != true && test_quyenadmin() != true) return NotFound();
                    // delete noi that va add lai
                    var deleteNoithat = (from a in db.Furiture_details
                        join b in db.Furitures on a.IDFuriture equals b.IDFuriture

                        where a.IDLand == mavp
                        select b).ToList();
                    foreach (var item in deleteNoithat)
                    {
                        Furiture_detail furni = (from a in db.Furiture_details
                            where a.IDLand == mavp && a.IDFuriture == item.IDFuriture
                            select a).SingleOrDefault();
                        db.Furiture_details.DeleteOnSubmit(furni);

                    }
                    db.SubmitChanges();
                    // delete tien nghi va add lai
                    var deleteTiennghi = (from a in db.Convenient_Details
                        join b in db.Convenients on a.IDConvenient equals b.IDConvenient

                        where a.IDLand == mavp
                        select b).ToList();
                    foreach (var item in deleteTiennghi)
                    {
                        Convenient_Detail conv = (from a in db.Convenient_Details
                            where a.IDLand == mavp && a.IDConvenient == item.IDConvenient
                            select a).SingleOrDefault();
                        db.Convenient_Details.DeleteOnSubmit(conv);
                    }
                    db.SubmitChanges();
                    foreach (var item in json._listtiennghi)
                    {
                        Convenient_Detail conven = new Convenient_Detail();
                        conven.IDConvenient = (int) item.IDConvenient;
                        conven.IDLand = lands.IDLand;
                        db.Convenient_Details.InsertOnSubmit(conven);

                    }
                    db.SubmitChanges();
                    foreach (var item in json._listnoithat)
                    {

                        Furiture_detail furinture = new Furiture_detail();
                        furinture.IDFuriture = (int) item.IDFuriture;
                        furinture.IDLand = lands.IDLand;
                        db.Furiture_details.InsertOnSubmit(furinture);

                    }
                    db.SubmitChanges();
                    int loaiGia = 1;
                    Double gia = Convert.ToDouble(json._GiaChiTiet);
                    bool banThue = json._hinhThuc;

                    if (banThue == true)
                    {
                        lands.Sell = true;

                        if (gia == 0)
                        {
                            lands.IDPrice = 18;
                        }
                        else if (gia < 500)
                        {
                            lands.IDPrice = 1;
                        }
                        else if (gia >= 500 && gia < 800)
                        {
                            lands.IDPrice = 2;
                        }
                        else if (gia >= 800 && gia < 1000)
                        {
                            lands.IDPrice = 3;
                        }
                        else if (gia >= 1000 && gia < 2000)
                        {
                            lands.IDPrice = 4;
                        }
                        else if (gia >= 2000 && gia < 3000)
                        {
                            lands.IDPrice = 5;
                        }
                        else if (gia >= 3000 && gia < 5000)
                        {
                            lands.IDPrice = 6;
                        }
                        else if (gia >= 5000 && gia < 7000)
                        {
                            lands.IDPrice = 7;
                        }
                        else if (gia >= 7000 && gia < 10000)
                        {
                            lands.IDPrice = 8;
                        }
                        else if (gia >= 10000 && gia < 20000)
                        {
                            lands.IDPrice = 9;
                        }
                        else if (gia >= 20000)
                            lands.IDPrice = 10;

                    }

                    else
                    {
                        lands.Sell = false;

                        if (gia == 0)
                        {
                            lands.IDPrice = 19;
                        }
                        else if (gia < 1)
                        {
                            lands.IDPrice = 11;
                        }
                        else if (gia >= 1 && gia < 5)
                        {
                            lands.IDPrice = 12;
                        }
                        else if (gia >= 5 && gia < 10)
                        {
                            lands.IDPrice = 13;
                        }
                        else if (gia >= 10 && gia < 40)
                        {
                            lands.IDPrice = 14;
                        }
                        else if (gia >= 40 && gia < 70)
                        {
                            lands.IDPrice = 15;
                        }
                        else if (gia >= 70 && gia < 100)
                        {
                            lands.IDPrice = 16;
                        }
                        else if (gia >= 100)
                        {
                            lands.IDPrice = 17;
                        }
                    }


                    //Dien tich
                    if (json._dienTich < 30)
                    {
                        lands.IDAcreage = 1;
                    }
                    else if (json._dienTich >= 30 && json._dienTich < 50)
                    {
                        lands.IDAcreage = 2;
                    }
                    else if (json._dienTich >= 50 && json._dienTich < 100)
                    {
                        lands.IDAcreage = 3;
                    }
                    else if (json._dienTich >= 100 && json._dienTich < 200)
                    {
                        lands.IDAcreage = 4;
                    }
                    else if (json._dienTich >= 200 && json._dienTich < 300)
                    {
                        lands.IDAcreage = 5;
                    }
                    else if (json._dienTich >= 300 && json._dienTich < 400)
                    {
                        lands.IDAcreage = 6;
                    }
                    else if (json._dienTich >= 400 && json._dienTich < 500)
                    {
                        lands.IDAcreage = 7;
                    }
                    else if (json._dienTich >= 500 && json._dienTich < 1000)
                    {
                        lands.IDAcreage = 8;
                    }
                    else if (json._dienTich >= 1000)
                    {
                        lands.IDAcreage = 9;
                    }
                    lands.Area_detail = json._dienTich;

                    lands.Name = json._tieuDe;
                    lands.Price_detail = Convert.ToDecimal(gia);
                    lands.IDTypeDetail = Convert.ToInt32(json._kieuBDS);
                    if (json._huong.ToString() != "")
                    {
                        if (json._huongnha == 0) lands.IDDirection = null;
                        lands.IDDirection = json._huongnha;
                    }
                    else
                    {
                        lands.IDDirection = null;
                    }
                    // lands.Image = "Content/Images/vanphong.jpg";
                    lands.Decrition = json._moTa;
                    DateTime date = DateTime.Now;

                    lands.ModifyDate = DateTime.Parse(date.ToString("yyyy-MM-dd"));
                    DateTime expri_date = Convert.ToDateTime(json._hethan);
                    lands.ExpiredDate = expri_date;

                    lands.Flag_Approval = false;
                    //lands.Image = json._Image();
                    // Lay ID cao nhat hien tai
                    if (json._soNha.ToString() != "")
                    {
                        lands.Numhouse = json._soNha;
                    }
                    else
                    {
                        lands.Numhouse = null;
                    }
                    if (json._duong.ToString() != "")
                    {
                        if (json._duong == 0) lands.IDStreet = null;
                        lands.IDStreet = json._duong;
                    }
                    else
                    {
                        lands.IDStreet = null;
                    }

                    // Insert address 

                    lands.IDWard = json._phuong;

                    // delete cac noi that trong cua land do


                    // delete cac tien nghi trong cua land do

                    db.SubmitChanges();


                    return Ok(json);
                }
                catch (Exception)
                {
                    return NotFound();
                }


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
                        _TenLoai = item.TypeNameDetail,
                        _DiaCHi = item.Numhouse + " " + item.Street + ", " + item.Trousers + ", TP Đà Nẵng.",
                        _Gia = item.Price_detail,
                        _DienTich = item.Acreage,
                        _IDDienTich = item.IDAcreage,
                        _CreateDate = item.CreateDate,
                        _ModifyDate = item.ModifyDate,
                        tenKH = item.CustomerName,
                        _ExpireDate = item.ExpiredDate,
                        HetHan = (item.ExpiredDate < DateTime.Now) ? true : false,

                    });
                }
                return listvp;

            }

        }
        [System.Web.Http.HttpPut]
        public IHttpActionResult ChangePass(JObject data)
        {
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    //Customer customer = new Customer();
                    Guid maKH = json._makh;
                    if (test_user(maKH) != true && test_quyenadmin() != true) return NotFound();
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
        [System.Web.Http.HttpPost]
        public string UploadImage_Furniture(int id)
        {
            if (test_quyenadmin() == false) return "false";
            int iUploadedCnt = 0;

            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            //string sPath = "";
            //string sPath = "C:\\inetpub\\wwwroot\\Content\\Images\\Image_VP\\";
            //string sPath = "D:\\";
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Funiture/");

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            using (db = new DataTraCuuVPDataContext())
            {
                var nt = (from a in db.Furitures
                          where a.IDFuriture == id
                          select a).SingleOrDefault();

                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
                {
                    //System.Web.HttpPostedFile hpf = hfc[iCnt];
                    HttpPostedFile hpf = hfc[iCnt];
                    if (hpf.ContentLength > 0)
                    {
                        Random rd = new Random();
                        string fileName = nt.Furiture_Name + "_" + rd.Next(1, 100).ToString() + ".png";
                        string saveAsPath = Path.Combine(sPath, fileName);


                        foreach (string f in Directory.GetFiles(sPath, nt.Furiture_Name + "_*.png"))
                        {
                            File.Delete(f);
                        }
                        hpf.SaveAs(saveAsPath);
                        nt.Image = "Content/Images/Funiture/" + fileName;
                        iUploadedCnt = iUploadedCnt + 1;
                        //var img = Image.FromFile(saveAsPath);
                        using (Image image = Image.FromFile(saveAsPath))
                        {
                            // Prevent using images internal thumbnail
                            image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                            image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                            Image NewImage = image.GetThumbnailImage(40, 40, null, IntPtr.Zero);
                            NewImage.Save(saveAsPath, ImageFormat.Png);

                        }
                    }

                }

                db.SubmitChanges();
                if (iUploadedCnt > 0)
                {
                    return iUploadedCnt + " Files Uploaded Successfully";
                }
                else
                {
                    return "Upload Failed";
                }
            }



        }
        [System.Web.Http.HttpPost]
        public string UploadImage_Convenient(int id)
        {
            if (test_quyenadmin() == false) return "false";
            int iUploadedCnt = 0;

            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            //string sPath = "";
            //string sPath = "C:\\inetpub\\wwwroot\\Content\\Images\\Image_VP\\";
            //string sPath = "D:\\";
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Funiture/");

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            using (db = new DataTraCuuVPDataContext())
            {
                var nt = (from a in db.Convenients
                          where a.IDConvenient == id
                          select a).SingleOrDefault();

                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
                {
                    //System.Web.HttpPostedFile hpf = hfc[iCnt];
                    HttpPostedFile hpf = hfc[iCnt];
                    if (hpf.ContentLength > 0)
                    {
                        Random rd = new Random();
                        string fileName = nt.Convenient_Name + "_" + rd.Next(1, 100).ToString() + ".png";
                        string saveAsPath = Path.Combine(sPath, fileName);


                        foreach (string f in Directory.GetFiles(sPath, nt.Convenient_Name + "_*.png"))
                        {
                            File.Delete(f);
                        }
                        hpf.SaveAs(saveAsPath);
                        nt.Image = "Content/Images/Funiture/" + fileName;
                        iUploadedCnt = iUploadedCnt + 1;
                        //var img = Image.FromFile(saveAsPath);
                        using (Image image = Image.FromFile(saveAsPath))
                        {
                            // Prevent using images internal thumbnail
                            image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                            image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                            Image NewImage = image.GetThumbnailImage(40, 40, null, IntPtr.Zero);
                            NewImage.Save(saveAsPath, ImageFormat.Png);

                        }
                    }

                }

                db.SubmitChanges();
                if (iUploadedCnt > 0)
                {
                    return iUploadedCnt + " Files Uploaded Successfully";
                }
                else
                {
                    return "Upload Failed";
                }
            }



        }

        [System.Web.Http.HttpPost]
        public int edit_furniture(JObject data)
        {
            if (test_quyenadmin() == false) return 0;
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Furiture funri = new Furiture();
                        funri.Furiture_Name = json.Name;
                        db.Furitures.InsertOnSubmit(funri);
                        db.SubmitChanges();
                        var id =
                            (from a in db.Furitures select new { a.IDFuriture }).OrderByDescending(p => p.IDFuriture)
                                .Take(1).SingleOrDefault();

                        return id.IDFuriture;
                    }
                    else
                    {
                        int idfurni = json.ID;
                        var query = (from a in db.Furitures
                                     where a.IDFuriture == idfurni
                                     select a).SingleOrDefault();
                        query.Furiture_Name = json.Name;
                        db.SubmitChanges();
                        return idfurni;
                    }

                }

            }
            catch (Exception)
            {
                return 0;
            }
        }

        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Furniture(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
            try
            {
                string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Funiture/");
                using (db = new DataTraCuuVPDataContext())
                {
                    var furn = (from a in db.Furitures
                                where a.IDFuriture == id
                                select a).SingleOrDefault();

                    foreach (string f in Directory.GetFiles(sPath, furn.Furiture_Name + "_*.png"))
                    {
                        File.Delete(f);
                    }
                    db.Furitures.DeleteOnSubmit(furn);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [System.Web.Http.HttpPost]
        public int edit_convenient(JObject data)
        {
            if (test_quyenadmin() == false) return 0;
            dynamic json = data;
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    if (json.Is_Insert == 1)
                    {
                        Convenient conv = new Convenient();
                        conv.Convenient_Name = json.Name;
                        db.Convenients.InsertOnSubmit(conv);
                        db.SubmitChanges();
                        var id =
                            (from a in db.Convenients select new { a.IDConvenient }).OrderByDescending(p => p.IDConvenient)
                                .Take(1).SingleOrDefault();

                        return id.IDConvenient;
                    }
                    else
                    {
                        int idconv = json.ID;
                        var query = (from a in db.Convenients
                                     where a.IDConvenient == idconv
                                     select a).SingleOrDefault();
                        query.Convenient_Name = json.Name;
                        db.SubmitChanges();
                        return idconv;
                    }

                }

            }
            catch (Exception)
            {
                return 0;
            }
        }
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Convenient(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
            try
            {
                string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Funiture/");
                using (db = new DataTraCuuVPDataContext())
                {
                    var conv = (from a in db.Convenients
                                where a.IDConvenient == id
                                select a).SingleOrDefault();

                    foreach (string f in Directory.GetFiles(sPath, conv.Convenient_Name + "_*.png"))
                    {
                        File.Delete(f);
                    }
                    db.Convenients.DeleteOnSubmit(conv);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
        [System.Web.Http.HttpDelete]
        public IHttpActionResult Delete_Land(int id)
        {
            if (test_quyenadmin() == false) return NotFound();
            try
            {
                string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Slider/");
                using (db = new DataTraCuuVPDataContext())
                {
                    var conv = (from a in db.Convenients
                                where a.IDConvenient == id
                                select a).SingleOrDefault();

                    foreach (string f in Directory.GetDirectories(sPath, conv.Convenient_Name + "_*.png"))
                    {
                        File.Delete(f);
                    }
                    db.Convenients.DeleteOnSubmit(conv);
                    db.SubmitChanges();
                    return Ok();
                }

            }
            catch (Exception)
            {
                return NotFound();
            }
        }
    }
}
