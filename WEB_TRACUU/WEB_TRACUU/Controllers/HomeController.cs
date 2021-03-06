﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WEB_TRACUU.Areas.Administrator.Models;

namespace WEB_TRACUU.Controllers
{
 
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            return View();
        }
        public ActionResult TrangChu()
        {
            var result = new FilePathResult("../Views/Home/trangchinh.html", "text/html");
            return result;
        }
        public ActionResult TimKiem()
        {
            var result = new FilePathResult("../Views/Home/timkiem.html", "text/html");
            return result;
        }
        public ActionResult GioiThieu()
        {
            var result = new FilePathResult("../Views/Home/gioithieu.html", "text/html");
            return result;
        }
        //[AuthorizeController]
        public ActionResult TheoDoi()
        {
            var result = new FilePathResult("../Views/Home/theodoi.html", "text/html");
            return result;
        }
        public ActionResult Slide()
        {
            var result = new FilePathResult("../Views/Shared/slider.html", "text/html");
            return result;
        }
        public ActionResult Slide_Index()
        {
            var result = new FilePathResult("../Views/Shared/slider_index.html", "text/html");
            return result;
        }
        public ActionResult ChiTiet()
        {
            var result = new FilePathResult("../Views/Home/chitiet.html", "text/html");
            return result;
        }
       
        public ActionResult TaiKhoan()
        {
           
                var result = new FilePathResult("../Views/Home/taikhoan.html", "text/html");
                return result;
               
           
        }
     
        public ActionResult QuanTriTaiKhoan()
        {
            var result = new FilePathResult("../Views/Home/taikhoan.html", "text/html");
            return result;
        }
        public ActionResult DangKy()
        {
            var result = new FilePathResult("../Views/Home/dangki.html", "text/html");
            return result;
        }
        public ActionResult Active(string id)
        {
            ViewBag.id = id;
            return View();
        }
        public ActionResult RecoverPassWord()
        {
            
            return View();
        }

        public ActionResult PostBai()
        {
            var result = new FilePathResult("../Views/Home/post.html", "text/html");
            return result;
        }
    }
}
