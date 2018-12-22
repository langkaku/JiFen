using integrating.web.BLL;
using integrating.web.Data;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace integrating.web.Controllers
{
    public class ApplicationController : Controller
    {
        // GET: Application
        public ActionResult Index()
        {
            ViewBag.Message = "false";
            var Model = MenuOption.GetNotNullZezoMenu();
            return View(Model);
        }
        public string getDingConfig(string url)
        {
            var agentID = "207403900";
            var postData = "Mode=getJSSDKSign('" + agentID + "','" + url + "')";
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
            return responseString;
        }
        public ActionResult GetMenu()
        {
            var Model = MenuOption.GetFirstMenu();
            return PartialView("_Menu", Model);
        }
        public ActionResult GetSecondMenu(string id)
        {
            var Model = MenuOption.GetSecondMenu(id);
            return PartialView("Secondmenu", Model);
        }
        public ActionResult GetThirdMenu(string id)
        {
            var Model = MenuOption.GetThirdMenu(id);
            return PartialView("ThirdMenu", Model);

        }
        public ActionResult Getitem(string id)
        {
            var Model = MenuOption.GetFourthMenu(id);
            return PartialView("itemtable", Model);
        }
        public ActionResult gettab(string id)
        {
            var Model = MenuOption.getedu(id);
            return PartialView("itemtable", Model);
        }
        public string getentitybyid(string id)
        {
            List<JFitem> list = MenuOption.Getitementity(id);
            string strJson = JsonConvert.SerializeObject(list[0]);
            return strJson;
        }
        public string addJF(string jftitle, string score, string jfitemid)
        {
            string userid = Session["DDUserId"].ToString();
            MenuOption.InsertJF(jftitle, score, jfitemid, userid);
            return "已成功提交至审批人";
        }
        [HttpPost]
        public ActionResult SubmitForm(FormCollection collection)
        {
            string FTitle = collection["FTitle"];
            string FFen = collection["FFen"];
            string FScore = collection["FScore"];
            string FBaseFen = collection["FBaseFen"];
            string FContent = collection["FContent"];
            string FCheckEmployeeDesc = collection["FCheckEmployeeDesc"];
            string Faudit = collection["Faudit"];
            for (int i = 0; i < Request.Files.Count; i++)
            {
                HttpPostedFileBase file = Request.Files[i];
                string nwame = file.FileName.ToString();
                string target = Server.MapPath("/uploadfile/");//取得目标文件夹的路径
                string filename = file.FileName;//取得文件名字
                if(filename!=null&&filename!="")
                { 
                    string path = target + filename;//获取存储的目标地址
                    file.SaveAs(path);
                }
            }
            TempData["name"] = "ck";
            return Redirect("Index");
        }
    } 
    }