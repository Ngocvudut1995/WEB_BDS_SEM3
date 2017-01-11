using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class TrangChuController : ApiController
    {
        private DataTraCuuVPDataContext db;
      
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_sell_canho(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                    where a.Sell == true && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 1
                    select a).OrderByDescending(p=>p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
                        _MaQuan = (int) item.IDTrousers,
                        _TenQuan = item.Trousers,
                        _MaLoai = (int) item.IDType,
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
                        _Area_detail = item.Area_detail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_sell_nha(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == true && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 2
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_sell_dat(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == true && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 3
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_sell_vanphong(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell== true && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 4
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_sell_khac(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == true && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 5
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_rent_canho(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == false && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 1
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_rent_nha(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == false && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 2
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_rent_dat(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == false && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 3
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_rent_vanphong(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == false && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 4
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
        [HttpGet]
        public IEnumerable<TKVanPhong> get_top_new_land_rent_khac(int sl)
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                          where a.Sell == false && a.Flag_Approval == true && a.ExpiredDate > DateTime.Now && a.IDType == 5
                          select a).OrderByDescending(p => p.ModifyDate).Take(sl).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _LoaiDat = item.TypeNameDetail,
                        _TenKH = item.CustomerName,
                        _PhoneNumber = item.PhoneNumber,
                        _MaVP = item.IDLand,
                        _Anh = item.Image,
                        _MaDT = item.IDAcreage,
                        _Dientich = item.Acreage,
                        _IDPrice = item.IDPrice,
                        _Mota = item.Decrition,
                        _TenVp = item.Name,
                        _SoNha = item.Numhouse,
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
                        _Area_detail = item.Area_detail,
                        _HetHan = (item.ExpiredDate > DateTime.Now) ? false : true
                    });
                }

                return list;
            }
        }
    }
}
