using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Entities
{
    public interface IBaseEntity
    {
        string Id { get; set; }
        DateTime CreateDate { get; set; }
        Int64 CreateTicks { get; set; }
        string CreateBy { get; set; }
        DateTime UpdateDate { get; set; }
        Int64 UpdateTicks { get; set; }
        string UpdateBy { get; set; }
        Boolean IsActive { get; set; }
        string TypeName { get; }
    }
}
