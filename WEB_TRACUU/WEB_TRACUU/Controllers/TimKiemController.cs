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
        private DataBDSDataContext db = new DataBDSDataContext();
       

        public IEnumerable<Overview_Land> get_overview_land()
        {
            IList<Overview_Land> list = new List<Overview_Land>();
            var sql = (from a in db.Overview_Lands
                select a).ToList();
            foreach (var item in sql)
            {
                list.Add(new Overview_Land
                {
                    IDLand = item.IDLand,
                    Image = item.Image,
                    Acreage = item.Acreage,
                    CreateDate = item.CreateDate,
                    ModifyDate = item.ModifyDate,
                    Name = item.Name,
                    Price = item.Price,
                    Decription_mini = item. Decription_mini,
                    Street = item.Street,
                    Trousers = item.Trousers,
                    TypeName = item.TypeName,
                    Ward = item.Ward


                });
            }
            return list;
        }



        //Get DS Các Quận
        public IEnumerable<Trouser> get_trouser()
        {
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

        //Get DS Loai nha dat
        public IEnumerable<Type_Land> get_type_land()
        {
            IList<Type_Land> list = new List<Type_Land>();
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

        //get dien tich
        public IEnumerable<Acreage> get_acreage_land()
        {
            IList<Acreage> list = new List<Acreage>();
            var sql = (from a in db.Acreages select a).ToList();
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
}

