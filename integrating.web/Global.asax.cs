using integrating.web.Common;
using integrating.web.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace integrating.web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            using (var itContext=new IntegratingContext())
            {
                bool res = itContext.Database.CreateIfNotExists();
            }
            QuartzHelper.ExecuteByCron<MyJob>("0 59 23 * * ?");

        }
     
    }
}
