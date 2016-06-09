using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Entities
{
    public class Target : BaseEntity
    {
      
        public string Title { get; set; }
        public string Description { get; set; }
        public string CategoryId { get; set; }
        public TargetStatuses Status { get; set; } // 1 - In Progress, 2 - Achieved
        public List<File> Files { get; set; }
        public string Style { get; set; }
        public Int32 ActivityCount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Int64 StartTicks { get; set; }
        public Int64 EndTicks { get; set; }

    }

    public enum TargetStatuses
    {
        InProgress = 1,
        Achieved = 2
    }
}
