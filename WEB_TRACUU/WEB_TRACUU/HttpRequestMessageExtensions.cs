using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.ServiceModel.Channels;
using System.Web;
using Microsoft.Owin;

namespace WEB_TRACUU
{
    public static class HttpRequestMessageExtensions
    {
        private const string HttpContext = "MS_HttpContext";

        private const string RemoteEndpointMessage =
            "System.ServiceModel.Channels.RemoteEndpointMessageProperty";

        private const string OwinContext = "MS_OwinContext";

        //public static string GetClientIpAddress(this HttpRequestMessage request)
        //{
        //    // Web-hosting. Needs reference to System.Web.dll
        //    if (request.Properties.ContainsKey(HttpContext))
        //    {
        //        dynamic ctx = request.Properties[HttpContext];
        //        if (ctx != null)
        //        {
        //            return ctx.Request.UserHostAddress;
        //        }
        //    }

        //    // Self-hosting. Needs reference to System.ServiceModel.dll. 
        //    if (request.Properties.ContainsKey(RemoteEndpointMessage))
        //    {
        //        dynamic remoteEndpoint = request.Properties[RemoteEndpointMessage];
        //        if (remoteEndpoint != null)
        //        {
        //            return remoteEndpoint.Address;
        //        }
        //    }

        //    // Self-hosting using Owin. Needs reference to Microsoft.Owin.dll. 
        //    if (request.Properties.ContainsKey(OwinContext))
        //    {
        //        dynamic owinContext = request.Properties[OwinContext];
        //        if (owinContext != null)
        //        {
        //            return owinContext.Request.RemoteIpAddress;
        //        }
        //    }

        //    return null;
        //}
    //    public static string GetIP4Address()
    //    {
    //        string IP4Address = String.Empty;

    //        foreach (IPAddress IPA in Dns.GetHostAddresses(Request.ServerVariables["REMOTE_ADDR"].ToString())))
    //{
    //            if (IPA.AddressFamily.ToString() == "InterNetwork")
    //            {
    //                IP4Address = IPA.ToString();
    //                break;
    //            }
    //        }

    //        if (IP4Address != String.Empty)
    //        {
    //            return IP4Address;
    //        }

    //        foreach (IPAddress IPA in Dns.GetHostAddresses(Dns.GetHostName()))
    //        {
    //            if (IPA.AddressFamily.ToString() == "InterNetwork")
    //            {
    //                IP4Address = IPA.ToString();
    //                break;
    //            }
    //        }

    //        return IP4Address;
    //    }
        public static IPAddress GetClientIpAddress(this HttpRequestMessage request)
        {
            if (request.Properties.ContainsKey("MS_HttpContext"))
            {
                return IPAddress.Parse(((HttpContextBase)request.Properties["MS_HttpContext"]).Request.UserHostAddress);
            }

            if (request.Properties.ContainsKey(RemoteEndpointMessageProperty.Name))
            {
                return IPAddress.Parse(((RemoteEndpointMessageProperty)request.Properties[RemoteEndpointMessageProperty.Name]).Address);
            }

            if (request.Properties.ContainsKey("MS_OwinContext"))
            {
                return IPAddress.Parse(((OwinContext)request.Properties["MS_OwinContext"]).Request.RemoteIpAddress);
            }

            throw new Exception("Client IP Address Not Found in HttpRequest");
        }
    }
}