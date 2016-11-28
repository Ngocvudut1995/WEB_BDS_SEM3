using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class Contactcs
    {
        private const string CacheKey = "ContactStore";
        public int Id { get; set; }

        public string Name { get; set; }

        //public Contactcs()
        //{
        //    var ctx = HttpContext.Current;

        //    if (ctx != null)
        //    {
        //        if (ctx.Cache[CacheKey] == null)
        //        {
        //            var contacts = new Contactcs[]
        //            {
        //        new Contactcs
        //        {
        //            Id = 1, Name = "Glenn Block"
        //        },
        //        new Contactcs
        //        {
        //            Id = 2, Name = "Dan Roth"
        //        }
        //            };

        //            ctx.Cache[CacheKey] = contacts;
        //        }
        //    }
        //}
        public Contactcs[] GetAllContacts()
        {
            var ctx = HttpContext.Current;

            if (ctx != null)
            {
                return (Contactcs[])ctx.Cache[CacheKey];
            }

            return new Contactcs[]
                {
            new Contactcs
            {
                Id = 0,
                Name = "Placeholder"
            }
                };
        }
        public bool SaveContact(Contactcs contact)
        {
            var ctx = HttpContext.Current;

            if (ctx != null)
            {
                try
                {
                    var currentData = ((Contactcs[])ctx.Cache[CacheKey]).ToList();
                    currentData.Add(contact);
                    ctx.Cache[CacheKey] = currentData.ToArray();

                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                    return false;
                }
            }

            return false;
        }
    }
}