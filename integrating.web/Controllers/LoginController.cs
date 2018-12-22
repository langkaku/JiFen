using integrating.web.Helper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace integrating.web.Views.Home
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            //Common.KaoQin.Getleaveapproveduration("457208","","");
            Boolean b=  Common.KaoQin.IsDakaNormal("457208", "2018-12-17 00:00:00", "2018-12-17 20:00:00");
            Boolean c = Common.KaoQin.IsQingJiaNormal("457208", "2018-12-17 00:00:00", "2018-12-17 20:00:00");
            return View();
        }

        /// <summary>
        /// 获取用户code
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [HttpPost]
        public  String GetCode(string code)
        {
            if(System.Web.HttpContext.Current.Session["DDUserId"] == null)
            { 
                string Code = code;
                var postData = "Mode=getServerUserID('" + Code + "')";
                var data = Encoding.ASCII.GetBytes(postData);
                var request = (HttpWebRequest)WebRequest.Create("http://iis.czrcb.net.cn/dingding/crc_bank/dingServer.asp");
                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = data.Length;
                using (var stream = request.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
                var response = (HttpWebResponse)request.GetResponse();
                var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
                Session["DDUserId"] = responseString;
            }
            
            return "ok";
        }


    }
  
}