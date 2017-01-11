using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Metadata.Edm;
using System.Linq;
using System.Text.RegularExpressions;
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
        public string _LoaiDat { get; set; }
        public int? _MaDuong { get; set; }
        public string _Phuong { get; set; }
        public int _MaPhuong { get; set; }
        public int _MaQuan { get; set; }
        public string _TenQuan { get; set; }
        public string _EmailCustomer { get; set; }
        public int? _MaLoai { get; set; }
        public int? _MaLoaiCT { get; set; }
        public int? _IDDirection { get; set; }
        public System.Nullable<int> _Area_detail;
        public string _PhoneNumber;
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
        private static string HtmlToPlainText(string html)
        {
            const string tagWhiteSpace = @"(>|$)(\W|\n|\r)+<";//matches one or more (white space or line breaks) between '>' and '<'
            const string stripFormatting = @"<[^>]*(>|$)";//match any character between '<' and '>', even when end tag is missing
            const string lineBreak = @"<(br|BR)\s{0,1}\/{0,1}>";//matches: <br>,<br/>,<br />,<BR>,<BR/>,<BR />
            var lineBreakRegex = new Regex(lineBreak, RegexOptions.Multiline);
            var stripFormattingRegex = new Regex(stripFormatting, RegexOptions.Multiline);
            var tagWhiteSpaceRegex = new Regex(tagWhiteSpace, RegexOptions.Multiline);

            var text = html;
            //Decode html specific characters
            text = System.Net.WebUtility.HtmlDecode(text);
            //Remove tag whitespace/line breaks
            text = tagWhiteSpaceRegex.Replace(text, "><");
            //Replace <br /> with line breaks
            text = lineBreakRegex.Replace(text, Environment.NewLine);
            //Strip formatting
            text = stripFormattingRegex.Replace(text, string.Empty);

            return text;
        }

        public List<TKVanPhong> getALL()
        {
            List<TKVanPhong> list = new List<TKVanPhong>();
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                    join b in db.Customers on a.IDCustomer equals b.IDCustomer
                
                
                           where a.Flag_Approval == true && a.ExpiredDate > DateTime.Now
                          select new
                          {
                              a,
                              b.Email
                          }).ToList();
                foreach (var item in vp)
                {
                    list.Add(new TKVanPhong
                    {
                        _MaVP = item.a.IDLand,
                        _Anh = item.a.Image,
                        _MaDT = item.a.IDAcreage,
                        _Dientich = item.a.Acreage,
                        _IDPrice = item.a.IDPrice,
                        _Mota = HtmlToPlainText(item.a.Decrition),
                        _TenVp = item.a.Name,
                        _SoNha = item.a.Numhouse,
                        _MaQuan = (int)item.a.IDTrousers,
                        _TenQuan = item.a.Trousers,
                        _MaLoai = (int)item.a.IDType,
                        _MaLoaiCT = item.a.IDTypeDetail,
                        _Duong = item.a.Street,
                        _Phuong = item.a.Ward,
                        _MaPhuong = item.a.IDWard,
                        _MaDuong = item.a.IDStreet,
                        _CreateDate = item.a.CreateDate,
                        _ModifyDate = item.a.ModifyDate,
                        _Sell = item.a.Sell,
                        _ExpiredDate = item.a.ExpiredDate,
                        _Gia = item.a.Price,
                        _Price_detail = item.a.Price_detail,
                        _IDDirection = item.a.IDDirection,
                        _Area_detail = item.a.Area_detail,
                        _TenKH = item.a.CustomerName,
                        _PhoneNumber = item.a.PhoneNumber,
                        _LoaiDat = item.a.TypeNameDetail,
                        _EmailCustomer = item.Email,
                        _HetHan = (item.a.ExpiredDate > DateTime.Now )? false:true
                    });
                }
                
                return list;
            }

        }
    }
}