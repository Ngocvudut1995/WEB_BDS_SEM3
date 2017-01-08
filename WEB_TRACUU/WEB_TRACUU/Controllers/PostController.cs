using System;
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
        public Guid? Creat_BDS(JObject data)
        {
            dynamic json = data;
            int i = 0;
            var id = Guid.NewGuid();
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    db.Connection.Open();

                    Land lands = new Land();
                    lands.IDLand = id;
                    lands.Name = json._tieuDe;
                    lands.IDAcreage = Convert.ToInt32(json._dienTich);
                    lands.IDPrice = Convert.ToInt32(json._IDgia);
                    lands.Price_detail = Convert.ToDecimal(json._GiaChiTiet);
                    lands.IDTypeDetail = Convert.ToInt32(json._kieuBDS);
                    lands.Sell = false;
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

                    // Insert address
                    Address address = new Address();
                    address.IDAddress = 0;
                    address.IDStreet = json._duong;
                    address.NumberHouse = json._soNha;
                    db.Addresses.InsertOnSubmit(address);
                    db.SubmitChanges();
                    var idAddressCurrent = (from a in db.Addresses
                                            select new { a.IDAddress })
                        .OrderByDescending(k => k.IDAddress)
                        .Take(1).SingleOrDefault();
                    if (idAddressCurrent != null) lands.IDAddress = idAddressCurrent.IDAddress;
                    lands.View = 0;
                    db.Lands.InsertOnSubmit(lands);
                    db.SubmitChanges();

                    db.Connection.Close();
                    return id;
                }

            }
            catch (Exception)
            {
                return null;
            }
        }
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
                        string fileName = "avarta_" + kh.IDPost + "_"+rd.Next(1,100).ToString()+".jpg";
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

                string sPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/Images/Slider/" +id.ToString()+"/");
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


