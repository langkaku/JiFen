using System;

namespace integrating.web.Controllers
{
    internal class Picture
    {
        public string FilePath { get; internal set; }
        public int UserId { get; internal set; }
        public string Name { get; internal set; }
        public DateTime CreateTime { get; internal set; }
        public bool IsForbidden { get; internal set; }
        public bool IsShareOut { get; internal set; }
        public string Description { get; internal set; }
    }
}