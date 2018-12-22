using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace integrating.web.Models
{
    public class Admin
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Pwd { get; set; }
        public DateTime AddTime { get; set; }
        public DateTime EditTime { get; set; }
        public bool State { get; set; }
    }
}