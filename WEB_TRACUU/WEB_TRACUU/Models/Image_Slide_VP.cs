using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class Image_Slide_VP
    {
        
        public string Anh { get; set; }
        public string Title { get; set; }

        public Image_Slide_VP(string anh, string title)
        {
            Anh = anh;
            Title = title;
        }

        public Image_Slide_VP()
        {
            
        }
    }
}