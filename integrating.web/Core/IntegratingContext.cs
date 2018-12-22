using integrating.web.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace integrating.web.Core
{
    public class IntegratingContext:DbContext
    {
        //继承上下文，EF code-first
        public IntegratingContext() : base("name=sqlconn")
        {

        }
        public DbSet <Admin> admin { get; set; }

    }
}