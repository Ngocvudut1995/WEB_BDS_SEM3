using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using WEB_TRACUU.Models;


namespace WEB_TRACUU.Areas.Administrator.Models
{
    public class AuthorizeController:ActionFilterAttribute
    {
        private DataTraCuuVPDataContext db;
        
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string username = null;
            try
            {
                 username = HttpContext.Current.Request.Cookies["user"].Value;
            }
            catch (Exception)
            {
                
               
            }
          

            if (username == null)
            {
                filterContext.Result  = new RedirectToRouteResult(new RouteValueDictionary
                       {
                           { "action", "TrangChu" },
                           { "controller", "Home" },
                           { "Area", String.Empty }
                       }); ;
            }
            string[] listpermission = {"Ho", ""};
            string actionname = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName + "-" +
                                filterContext.ActionDescriptor.ActionName;
            Console.WriteLine(actionname);
          
        }
    }
}