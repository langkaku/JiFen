using integrating.web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace integrating.web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        public ActionResult About()

        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        /// <summary>
        ///返回部分视图列表
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActionResult GetMenu(int id = 1)
        {
            List<MenuInfo> lists = new List<MenuInfo>();
            if (id == 1)
            {
                lists.Add(new MenuInfo() { Id = 1, Pid = 0, Name = "网站配置" });
                lists.Add(new MenuInfo() { Id = 2, Pid = 1, Name = "日志配置" });
                lists.Add(new MenuInfo() { Id = 3, Pid = 1, Name = "附件配置" });
            }
            else if (id == 2)
            {
                lists.Add(new MenuInfo() { Id = 4, Pid = 0, Name = "积分管理" });
                lists.Add(new MenuInfo() { Id = 5, Pid = 4, Name = "积分分类" });
                lists.Add(new MenuInfo() { Id = 6, Pid = 4, Name = "积分列表" });
            }
            return PartialView(lists);
        }
        public ActionResult YBP()
        {
            return View();
        }
        public ActionResult MenuTree()
        {
            return View();
        }
       
    }
}