using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace integrating.web.Controllers
{
    public class MyHomeController : Controller
    {
        // GET: MyHome
        public ActionResult Index(string blog )
        {
            ViewBag.Message= "nihao,woshibody";
            return View();
        }
    }
}