using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class TKVanPhong
    {
        private DataTraCuuVPDataContext db;
        public Guid _MaVP { get; set; }
        public Guid _MaKH { get; set; }
        public int _MaBaiDang { get; set; }
        public string _TenVp { get; set; }
        public string _TenKH { get; set; }
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
        public int? _MaLoai { get; set; }
        public int? _MaLoaiCT { get; set; }
        public System.Nullable<decimal> _Price_detail;
        public System.Nullable<System.DateTime> _ModifyDate;

        public System.Nullable<System.DateTime> _CreateDate;
        public System.Nullable<System.DateTime> _ExpiredDate;
        public System.Nullable<int> _IDPrice;
        public string _Gia;
        public System.Nullable<bool> _Sell;
        public System.Nullable<bool> _HetHan;
        public TKVanPhong()
        {

        }


        public List<TKVanPhong> getALL()
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                           where a.Flag_Approval == true && a.ExpiredDate > DateTime.Now
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
                        _MaLoai = (int)item.IDType,
                        _MaLoaiCT = item.IDTypeDetail,
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
                        _HetHan = (item.ExpiredDate > DateTime.Now )? false:true
                    });
                }
                
                return list;
            }

        }
    }
}