using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace integrating.web.Controllers
{
    public class FirstpageController : Controller
    {
        // GET: Firstpage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult JRRank()
        {
            var Model= Common.commonAll.getDep();
            return View(Model);
        }
        public ActionResult getjrrank()
        {
            var Model = Common.commonAll.getAllUserRank();
            return PartialView("JRranktable", Model);
        }
        public ActionResult AllScoreRank()
        {
            return View();
        }
        public ActionResult BYRank()
        {
            return View();
        }
        public ActionResult ScoreJBRank()
        {
            return View();
        }
        public ActionResult Basicscore()
        {
            return View();
        }
        
    }
}