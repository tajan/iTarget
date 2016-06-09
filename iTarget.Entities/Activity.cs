using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Entities
{
    public class Activity: BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string TargetId { get; set; }
        public Int32 Duration { get; set; }
        public List<File> Files { get; set; }

    }
}
