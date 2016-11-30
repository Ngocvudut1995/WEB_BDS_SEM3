using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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
                var ma_vp = new Guid("9b8e4a0e-1fa1-4baa-9613-2e9dda5adff4");
                var images = (from b in db.Image_Details where b.IDLand == ma_vp select b).ToList();
                IList<Image_Slide_VP> list = new List<Image_Slide_VP>();
                foreach (var item in images)
                {
                    list.Add(new Image_Slide_VP(item.Image_detail1, item.Title));
                }
                return list;
            }
           
        }
        public BDS_Detail get_vp_by_id(Guid mavp)
        {
            BDS_Detail vp;
            using (db = new DataTraCuuVPDataContext())
            {   db.Connection.Open();
                var sql = (from a in db.Overview_Lands
                           where a.IDLand == mavp
                           select a).SingleOrDefault();
                vp = new BDS_Detail
                {
                    _IDLand = sql.IDLand,
                    _Image = sql.Image,
                    _Acreage = sql.Acreage,
                    _Price = sql.Price,

                    _Name = sql.Name,
                    _NumberHouse = sql.NumberHouse,
                    _Trousers = sql.Trousers,
                    _CreateDate = sql.CreateDate,
                    _ModifyDate = sql.ModifyDate,
                    _Street = sql.Street,
                    _TypeName = sql.TypeName,
                    _Ward = sql.Ward,


                };
                var sql_local = (from a in db.Lands where a.IDLand == mavp select new { a.Decrition }).SingleOrDefault();
                vp._Decription = sql_local.Decrition;
                var images = (from b in db.Image_Details where b.IDLand == mavp select b).ToList();
                IList<Image_Slide_VP> list = new List<Image_Slide_VP>();
                foreach (var item in images)
                {
                    list.Add(new Image_Slide_VP(item.Image_detail1, item.Title));
                }
                vp._Images_detail = list;
                db.Connection.Close();
                return vp;
                
            }
           
        }
    }
}
