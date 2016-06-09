using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Entities
{
    public class UserCategories : BaseEntity
    {
        public UserCategories()
        {
            CategoryIds = new List<string>();
        }

        public List<string> CategoryIds { get; set; }
    }
}
