using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class TKVanPhong
    {
        DataClasses1DataContext db = new DataClasses1DataContext();
        public string _MaVP { get; set; }
        public string _TenVp { get; set; }
        public Nullable<decimal> _Gia { get; set; }
        public Nullable<decimal> _Dientich { get; set; }
        public string _Mota { get; set; }
        public string _Anh { get; set; }
        public string _SoNha { get; set; }
        public int _MaQuan { get; set; }
        public int _MaHT { get; set; }
        public int _MaPL { get; set; }
        public string _MaNguoiLH { get; set; }
        public Nullable<decimal> _LuotView { get; set; }
        public TKVanPhong()
        {

        }


        public List<TKVanPhong> getALL()
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            var vp = (from a in db.VanPhongs
                      select a).ToList();
            foreach (var item in vp)
            {
                list.Add(new TKVanPhong
                {
                    _MaVP = item.MaVP,
                    _Anh = item.Avarta,
                    _Dientich = item.DienTich,
                    _Gia = item.Gia,
                    _Mota = item.MoTa,
                    _TenVp = item.TenVP,
                    _SoNha = item.SoNha,
                    _MaQuan = (int)item.MaQuan,
                    _MaHT = (int)item.MaHinhThuc,
                    _MaPL = (int)item.MaPLThue,
                    _MaNguoiLH = item.MaNguoiLH,
                    _LuotView = item.LuotView
                });
            }
            return list;
        }
    }
}