using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WEB_TRACUU.Models;


namespace WEB_TRACUU.Controllers
{
    //[Authorize]
    public class ValuesController : ApiController
    {
        DataClasses1DataContext db = new DataClasses1DataContext();
        public string name = "Hello";
        // GET api/values
        public Contactcs Get()
        {
            return item;
        }

        // GET api/values/5
        public string Get(int id)
        {
            return name;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }
        // PUT api/values/5
        public string Put(int id, [FromBody]string value)
        {
            return value;
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }

        private static Contactcs item;
        

        [HttpPost]
        public HttpResponseMessage Post_contact(JObject data)
        {
            //this.contactRepository.SaveContact(contact);

            dynamic json = data;
            item = new Contactcs()
            {
               Id = json.Id,
               Name = json.Name
                
            };
            var response = Request.CreateResponse<Contactcs>(System.Net.HttpStatusCode.Created, item);

            return response;
        }
        [HttpPut]
        public IHttpActionResult Put_contact(JObject data)
        {
            //this.contactRepository.SaveContact(contact);

            dynamic json = data;
            if(json.Name == null) return NotFound();
            item.Name = json.Name;
            //var response = Request.CreateResponse<Contactcs>(System.Net.HttpStatusCode.Created, item);
            return Ok(item);
        }
    }
}
