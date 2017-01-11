using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using WebGrease;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class TheoDoiController : ApiController
    {
        private DataTraCuuVPDataContext db;
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
        public IEnumerable<TKVanPhong> get_VP_By_MaKH(Guid makh)
        {
            IList<TKVanPhong> list = new List<TKVanPhong>();
            //Guid ma_kh = Guid.Parse(makh);
            using (db = new DataTraCuuVPDataContext())
            {
                var vp = (from a in db.Overview_Lands
                    join b in db.Follows on a.IDLand equals b.IDLand
                    join c in db.Customers on b.IDCustomer equals  c.IDCustomer
                    where a.Flag_Approval == true && b.IDCustomer == makh 
                          select new
                          {
                              a,
                              c.Email
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
                        _HetHan = (item.a.ExpiredDate > DateTime.Now) ? false : true
                    });
                }
                return list;
            }
           
        }
    }
}
