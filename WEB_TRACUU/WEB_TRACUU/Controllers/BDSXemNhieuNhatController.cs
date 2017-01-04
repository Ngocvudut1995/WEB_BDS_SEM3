using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class BDSXemNhieuNhatController : ApiController
    {
        private DataTraCuuVPDataContext db;

        [HttpGet]
        public List<TKVanPhong> get_VP_TK_NhieuNhat()
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          orderby a.View descending
                          where a.Flag_Approval == true && a.ExpiredDate > DateTime.Now
                          select a).Take(10).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.NumberHouse,
                        _MaQuan = (int)item.IDTrousers,
                        _TenQuan = item.Trousers,
                        _MaLoai = (int)item.IDType,
                        _Duong = item.Street,
                        _Phuong = item.Ward,
                        _MaPhuong = item.IDWard,
                        _MaDuong = item.IDStreet,
                        _CreateDate = item.CreateDate,
                        _ModifyDate = item.ModifyDate,
                        _Sell = item.Sell,
                        _ExpiredDate = item.ExpiredDate,
                        _Gia = item.Price,
                        _Price_detail = item.Price_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
    }
}
