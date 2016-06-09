using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Entities
{
    public class Category : BaseEntity
    {
        public string Title { get; set; }
        public string Icon { get; set; }
        public Int32 TargetCount { get; set; }

    }
}
