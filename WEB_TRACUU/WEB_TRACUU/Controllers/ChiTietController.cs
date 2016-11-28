using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WEB_TRACUU.Models;

namespace WEB_TRACUU.Controllers
{
    public class ChiTietController : ApiController
    {
        [HttpGet]
        public IEnumerable<Image_Slide_VP> get_image_VP(string mavp)
        {
            IList<Image_Slide_VP> list = new List<Image_Slide_VP>();
            list.Add(new Image_Slide_VP
            {
                Anh = "/Content/Images/Slider/slide1.jpg",
                Title = "Picture 1"
                
            });
            list.Add(new Image_Slide_VP
            {
                Anh = "/Content/Images/Slider/slide2.jpg",
                Title = "Picture 2"

            });
            list.Add(new Image_Slide_VP
            {
                Anh = "/Content/Images/Slider/slide3.jpg",
                Title = "Picture 3"

            });
            list.Add(new Image_Slide_VP
            {
                Anh = "/Content/Images/Slider/slide4.jpg",
                Title = "Picture 4"

            });
            list.Add(new Image_Slide_VP
            {
                Anh = "/Content/Images/Slider/slide5.jpg",
                Title = "Picture 5"

            });
            return list;
        }
    }
}
