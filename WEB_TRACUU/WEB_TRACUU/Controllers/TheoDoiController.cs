using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebGrease;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class TheoDoiController : ApiController
    {
        private DataTraCuuVPDataContext db;
        public IEnumerable<TKVanPhong> get_VP_By_MaKH(Guid makh)
        {
            IList<TKVanPhong> list = new List<TKVanPhong>();
            //Guid ma_kh = Guid.Parse(makh);
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                    join b in db.Follows on a.IDLand equals b.IDLand
                    where a.Flag_Approval == true && b.IDCustomer == makh 
                          select a).ToList();
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
                        _MaPL = (int)item.IDType,
                        _Duong = item.Street,
                        _Phuong = item.Ward,
                        _MaPhuong = item.IDWard,
                        _MaDuong = item.IDStreet,
                        _CreateDate = item.CreateDate,
                        _ModifyDate = item.ModifyDate,
                        _Sell = item.Sell,
                        _ExpiredDate = item.ExpiredDate,
                        _Gia = item.Price,
                        _Price_detail = item.Price_detail
                    });
                }
                return list;
            }
           
        }
    }
}
