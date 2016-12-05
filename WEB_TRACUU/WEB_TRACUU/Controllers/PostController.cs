using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class PostController : ApiController
    {
        BDS_Detail bds = new BDS_Detail();
        private DataTraCuuVPDataContext db;
        [HttpPost]
        public IHttpActionResult Creat_BDS(JObject data)
        {
            dynamic json = data;
           // CultureInfo enUs = new CultureInfo("en-US");
            try
            {
                using (db = new DataTraCuuVPDataContext())
                {
                    db.Connection.Open();

                    Land lands = new Land();
                    lands.IDLand = Guid.NewGuid();
                    lands.Name = json._tieuDe;
                    lands.IDAcreage = Convert.ToInt32(json._dienTich);
                    lands.IDPrice = Convert.ToInt32(json._gia);
                    //lands.IDType = Convert.ToInt32(json._kieuBDS);
                    //lands.Sell = json.Sell;
                    lands.Decrition = json._moTa;
                    DateTime date = DateTime.Now;
                    lands.CreateDate = DateTime.Parse(date.ToString("yyyy-MM-dd"));
                    lands.ModifyDate = DateTime.Parse(date.ToString("yyyy-MM-dd"));
                    //lands.ExpiredDate = json._ExpiredDate;
                    //lands.IDCustomer = json._IDCustomer;
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

    }
}
