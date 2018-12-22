using integrating.web.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace integrating.web.Controllers
{
    public class ManageController : Controller
    {
        // GET: Manage
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult ItemManage()
        {
            return View();
        }
        public ActionResult ItemManage_add()
        {
            return View();
        }
        public void sysUser()
        {
            Helper.DingHelper.Syn_User();
        }
        public void sysDep()
        {
            Helper.DingHelper.Syn_Dep();
        }
        public void SetBasicscore()
        {
            JiFenoption.AddBasicScore();
        }


    }
}