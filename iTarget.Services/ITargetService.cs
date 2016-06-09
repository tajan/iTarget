using iTarget.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Services
{
    public interface ITargetService : IService
    {

        Task<Target> Create(Target target);
        Task<Target> Delete(Target target);
        Task<Target> Update(Target target);
        Task<Target> GetById(string id);
        Task<List<Target>> GetByCategory(string categoryId);
      
    }
}
