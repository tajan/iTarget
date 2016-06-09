using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Entities
{
    public class BaseEntity : IBaseEntity
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        public DateTime CreateDate { get; set; }
        public Int64 CreateTicks { get; set; }

        public string CreateBy { get; set; }

        public DateTime UpdateDate { get; set; }
        public Int64 UpdateTicks { get; set; }

        public string UpdateBy { get; set; }

        public Boolean IsActive { get; set; }
        public string TypeName {
            get {
                return GetType().Name;
            }
        }
    }

}
