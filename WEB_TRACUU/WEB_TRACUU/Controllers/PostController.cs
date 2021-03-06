﻿using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.AspNet.Identity;
using Microsoft.SqlServer.Server;
using Newtonsoft.Json.Linq;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{

    public class PostController : ApiController
    {
        private BDS_Detail bds = new BDS_Detail();
        private DataTraCuuVPDataContext db;
        [HttpPost]
        public IHttpActionResult Creat_BDS(JObject data)
        {
            dynamic json = data;
            int i = 0;
            var id = Guid.NewGuid();

            using (db = new DataTraCuuVPDataContext())
            {
                db.Connection.Open();

                Land lands = new Land();
                int loaiGia = Convert.ToInt32(json._loaiGia);
                Double gia = Convert.ToDouble(json._gia);
                int banThue = Convert.ToInt32(json._banThue);

                if (banThue == 1)
                {
                    lands.Sell = true;
                    if (json._checkTT == 1)
                    {
                        lands.IDPrice = 18;
                        gia = 0;
                    }
                    else
                    {
                        if (loaiGia == 1)
                        {
                            if (gia < 500)
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
                        }
                        else
                        {
                            gia = gia * 1000;
                            if (gia >= 1000 && gia < 2000)
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
                    }


                }
                else
                {
                    lands.Sell = false;
                    if (json._checkTT == 1)
                    {
                        lands.IDPrice = 19;
                        gia = 0;
                    }
                    else
                    {
                        if (gia < 1)
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
                lands.IDLand = id;
                lands.Name = json._tieuDe;
                lands.Price_detail = Convert.ToDecimal(gia);
                lands.IDTypeDetail = Convert.ToInt32(json._kieuBDS);
                if (json._huongnha.ToString() != "")
                {
                    //if (json.IDDirection == 0) lands.IDDirection = null;
                    lands.IDDirection = json._huongnha;
                }
                lands.Image = "Content/Images/vanphong.jpg";
                lands.Decrition = json._moTa;
                DateTime date = DateTime.Now;
                lands.CreateDate = DateTime.Parse(date.ToString("yyyy-MM-dd"));
                lands.ModifyDate = DateTime.Parse(date.ToString("yyyy-MM-dd"));

                i = Convert.ToInt32(json._thoiHang);
                if (i == 1)
                {
                    lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(1);
                }
                else if (i == 2)
                {
                    lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(2);
                }
                else if (i == 3)
                {
                    lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(3);
                }
                else if (i == 6)
                {
                    lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(6);
                }
                else if (i == 12)
                {
                    lands.ExpiredDate = ((DateTime)lands.CreateDate).AddYears(1);
                }


                lands.IDCustomer = json._idCustomer;
                lands.Flag_Approval = false;
                //lands.Image = json._Image();
                // Lay ID cao nhat hien tai
                if (json._soNha.ToString() != "")
                {
                    lands.Numhouse = json._soNha;
                }

                if (json._duong.ToString() != "")
                {
                   // if (json._duong == 0) lands.IDStreet = null;
                    lands.IDStreet = json._duong;
                }

                // Insert address 

                lands.IDWard = json._phuong;
                lands.View = 0;
                db.Lands.InsertOnSubmit(lands);
                db.SubmitChanges();
                foreach (var item in json._noiThat)
                {

                    Furiture_detail furinture = new Furiture_detail();
                    furinture.IDFuriture = item;
                    furinture.IDLand = id;
                    db.Furiture_details.InsertOnSubmit(furinture);
                    db.SubmitChanges();
                }
                foreach (var item in json._tienNghi)
                {
                    Convenient_Detail conven = new Convenient_Detail();
                    conven.IDConvenient = item;
                    conven.IDLand = id;
                    db.Convenient_Details.InsertOnSubmit(conven);
                    db.SubmitChanges();
                }
                db.Connection.Close();
                return Ok(id);
            }



        }
        //[HttpPost]
        //public Guid? Creat_BDS(JObject data)
        //{
        //    dynamic json = data;
        //    int i = 0;
        //    var id = Guid.NewGuid();
        //    try
        //    {
        //        using (db = new DataTraCuuVPDataContext())
        //        {
        //            db.Connection.Open();

        //            Land lands = new Land();
        //            lands.IDLand = id;
        //            lands.Name = json._tieuDe;
        //            lands.IDAcreage = Convert.ToInt32(json._dienTich);
        //            lands.IDPrice = Convert.ToInt32(json._IDgia);
        //            lands.Price_detail = Convert.ToDecimal(json._GiaChiTiet);
        //            lands.IDTypeDetail = Convert.ToInt32(json._kieuBDS);
        //            lands.Sell = false;
        //            lands.Decrition = json._moTa;
        //            DateTime date = DateTime.Now;
        //            lands.CreateDate = DateTime.Parse(date.ToString("yyyy-MM-dd"));
        //            lands.ModifyDate = DateTime.Parse(date.ToString("yyyy-MM-dd"));

        //            i = Convert.ToInt32(json._thoiHang);
        //            if (i == 1)
        //            {
        //                lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(1);
        //            }
        //            else if (i == 2)
        //            {
        //                lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(2);
        //            }
        //            else if (i == 3)
        //            {
        //                lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(3);
        //            }
        //            else if (i == 6)
        //            {
        //                lands.ExpiredDate = ((DateTime)lands.CreateDate).AddMonths(6);
        //            }
        //            else if (i == 12)
        //            {
        //                lands.ExpiredDate = ((DateTime)lands.CreateDate).AddYears(1);
        //            }


        //            lands.IDCustomer = json._idCustomer;
        //            lands.Flag_Approval = false;
        //            //lands.Image = json._Image();
        //            // Lay ID cao nhat hien tai

        //            // Insert address
        //            Address address = new Address();
        //            address.IDAddress = 0;
        //            address.IDStreet = json._duong;
        //            address.NumberHouse = json._soNha;
        //            db.Addresses.InsertOnSubmit(address);
        //            db.SubmitChanges();
        //            var idAddressCurrent = (from a in db.Addresses
        //                                    select new { a.IDAddress })
        //                .OrderByDescending(k => k.IDAddress)
        //                .Take(1).SingleOrDefault();
        //            if (idAddressCurrent != null) lands.IDAddress = idAddressCurrent.IDAddress;
        //            lands.View = 0;
        //            db.Lands.InsertOnSubmit(lands);
        //            db.SubmitChanges();

        //            db.Connection.Close();
        //            return id;
        //        }

        //    }
        //    catch (Exception)
        //    {
        //        return null;
        //    }
        //}
        [HttpPost]
        public string UploadAvatar(Guid id)
        {
            int iUploadedCnt = 0;

            // DEFINE THE PATH WHERE WE WANT TO SAVE THE FILES.
            //string sPath = "";
            //string sPath = "C:\\inetpub\\wwwroot\\Content\\Images\\Image_VP\\";
            //string sPath = "D:\\";
            string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/");

            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            using (db = new DataTraCuuVPDataContext())
            {
                var kh = (from a in db.Lands
                          where a.IDLand == id
                          select a).SingleOrDefault();

                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
                {
                    //System.Web.HttpPostedFile hpf = hfc[iCnt];
                    HttpPostedFile hpf = hfc[iCnt];
                    if (hpf.ContentLength > 0)
                    {
                        Random rd = new Random();
                        string fileName = "avarta_" + kh.IDPost + "_" + rd.Next(1, 100).ToString() + ".jpg";
                        string saveAsPath = Path.Combine(sPath, fileName);


                        foreach (string f in Directory.GetFiles(sPath, "avarta_" + kh.IDPost + "_*.jpg"))
                        {
                            File.Delete(f);
                        }
                        hpf.SaveAs(saveAsPath);
                        kh.Image = "Content/Images/" + fileName;
                        iUploadedCnt = iUploadedCnt + 1;
                        //var img = Image.FromFile(saveAsPath);
                        using (Image image = Image.FromFile(saveAsPath))
                        {
                            // Prevent using images internal thumbnail
                            image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                            image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                            Image NewImage = image.GetThumbnailImage(540, 360, null, IntPtr.Zero);
                            NewImage.Save(saveAsPath, ImageFormat.Jpeg);

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
        [HttpPost]
        public string UploadImageDetail(Guid id)
        {
            int iUploadedCnt = 0;
            System.Web.HttpFileCollection hfc = System.Web.HttpContext.Current.Request.Files;
            using (db = new DataTraCuuVPDataContext())
            {
                Image_Detail imageDetail = new Image_Detail();
                imageDetail.IDLand = id;

                string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Slider/" + id.ToString() + "/");
                if (!System.IO.Directory.Exists(sPath))
                    System.IO.Directory.CreateDirectory(sPath);
                for (int iCnt = 0; iCnt <= hfc.Count - 1; iCnt++)
                {
                    //System.Web.HttpPostedFile hpf = hfc[iCnt];
                    HttpPostedFile hpf = hfc[iCnt];
                    if (hpf.ContentLength > 0)
                    {
                        // CHECK IF THE SELECTED FILE(S) ALREADY EXISTS IN FOLDER. (AVOID DUPLICATE)
                        if (!File.Exists(sPath + Path.GetFileName(hpf.FileName)))
                        {
                            // SAVE THE FILES IN THE FOLDER.
                            // hpf.SaveAs(sPath + Path.GetFileName(hpf.FileName));
                            string fileName = Path.GetFileName(hpf.FileName);
                            string saveAsPath = Path.Combine(sPath, fileName);
                            hpf.SaveAs(saveAsPath);
                            imageDetail.Image_detail1 = "Content/Images/Slider/" + id.ToString() + "/" + hpf.FileName;
                            iUploadedCnt = iUploadedCnt + 1;
                            using (Image image = Image.FromFile(saveAsPath))
                            {
                                // Prevent using images internal thumbnail
                                image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                                image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                                Image NewImage = image.GetThumbnailImage(770, 386, null, IntPtr.Zero);
                                NewImage.Save(saveAsPath, ImageFormat.Jpeg);

                            }

                        }
                        else
                        {
                            hpf.SaveAs(sPath + Path.GetFileName("(t)" + hpf.FileName));
                            imageDetail.Image_detail1 = "Content/Images/Slider/" + id.ToString() + "/" + "(t)" + hpf.FileName;
                            iUploadedCnt = iUploadedCnt + 1;
                            using (Image image = Image.FromFile(sPath + Path.GetFileName("(t)" + hpf.FileName)))
                            {
                                // Prevent using images internal thumbnail
                                image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                                image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                                Image NewImage = image.GetThumbnailImage(770, 386, null, IntPtr.Zero);
                                NewImage.Save(sPath + Path.GetFileName("(t)" + hpf.FileName), ImageFormat.Jpeg);

                            }

                        }
                    }


                }
                db.Image_Details.InsertOnSubmit(imageDetail);
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
    }

}


