using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class TKVanPhong
    {
        DataTraCuuVPDataContext db = new DataTraCuuVPDataContext();
        public Guid _MaVP { get; set; }
        public string _TenVp { get; set; }
        public System.Nullable<decimal> _Gia { get; set; }
        public string _Dientich { get; set; }
        public int _MaDT { get; set; }
        public string _Mota { get; set; }
        public string _Anh { get; set; }
        public string _SoNha { get; set; }
        public string _Duong { get; set; }
        public int _MaDuong { get; set; }
        public string _Phuong { get; set; }
        public int _MaPhuong { get; set; }
        public int _MaQuan { get; set; }
        public string _TenQuan { get; set; }
        public int _MaPL { get; set; }
        
        public TKVanPhong()
        {

        }


        public List<TKVanPhong> getALL()
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            var vp = (from a in db.Overview_Lands
                      select a).ToList();
            foreach (var item in vp)
            {
                list.Add(new TKVanPhong
                {
                    _MaVP = item.IDLand,
                    _Anh = item.Image,
                    _MaDT = item.IDAcreage,
                    _Dientich = item.Acreage,
                    _Gia = item.Price,
                    _Mota = item.Decription_mini,
                    _TenVp = item.Name,
                    _SoNha = item.NumberHouse,
                    _MaQuan = (int)item.IDTrousers,
                    _TenQuan = item.Trousers,
                    _MaPL = (int)item.IDType,
                    _Duong = item.Street,
                    _Phuong = item.Ward,
                    _MaPhuong = item.IDWard,
                    _MaDuong = item.IDStreet,
                });
            }
            return list;
    }
        }
}