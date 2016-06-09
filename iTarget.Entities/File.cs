using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Entities
{
    public class File : BaseEntity
    {
        public string Name { get; set; }
        public long Size { get; set; }
    }
}
