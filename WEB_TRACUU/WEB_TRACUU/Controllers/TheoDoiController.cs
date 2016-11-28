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
        DataClasses1DataContext db = new DataClasses1DataContext();
        TKVanPhong tkVanPhong = new TKVanPhong();
        public IEnumerable<TKVanPhong> get_VP_By_MaKH(string makh)
        {   IList<TKVanPhong> list = new List<TKVanPhong>();
            Guid ma_kh = Guid.Parse(makh);
            var sql = db.Vp_Da_Theo_doi(ma_kh).ToList();
            foreach (var item  in sql)
            {   
                list.Add(new TKVanPhong
                {
                    _MaVP = item.MaVP,
                    _TenVp = item.TenVP,
                    _Dientich = item.DienTich,
                    _Gia = item.Gia,
                    _Mota = item.MoTa,
                    _Anh = item.Anh,
                    _SoNha = item.SoNha,
                });   
            }
            return list;
        }
    }
}
