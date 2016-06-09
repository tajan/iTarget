using iTarget.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Services
{
    public interface IActivityService : IService
    {

        Task<Activity> Create(Activity activity);
        Task<Activity> Delete(Activity activity);
        Task<Activity> Update(Activity activity);
        Task<Activity> GetById(string id);
        Task<List<Activity>> GetByTarget(string targetId);

    }
}
