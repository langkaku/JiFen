using integrating.web.Data;
using integrating.web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace integrating.web.Controllers
{
    public class ArticleController : Controller
    {
        // GET: Article
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Add(string title, string content)
        {
            using (var db = new IntegratingEntities())
            {
               db.ArticleSet.Add(new Article() { Title = title, Content = content, AddTime = DateTime.Now });
               db.SaveChanges();
            }
            return Redirect("/article/index"); ;
        }
        [HttpPost]

        public ActionResult Load()

        {
            var context = new IntegratingEntities();
            var list = context.ArticleSet.ToList();
            return Json(new
            {
                draw = ConvertDateTimeToInt(DateTime.Now),
                recordsTotal = list.Count,
                recordsFiltered = list.Count,
                data = list.Take(15).Select(m => new { m.ID, m.Title, m.AddTime })
            }, JsonRequestBehavior.AllowGet);
        }
        private long ConvertDateTimeToInt(System.DateTime time)
        {
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
            long t = (time.Ticks - startTime.Ticks) / 10000;   //除10000调整为13位     
            return t;
        }
    }


}