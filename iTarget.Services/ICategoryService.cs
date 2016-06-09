using iTarget.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Services
{
    public interface ICategoryService : IService
    {

        Task<Category> Create(Category category);
        Task<Category> Delete(Category category);
        Task<Category> Update(Category category);
        Task<List<Category>> GetForUser(string userId);
        Task<Category> GetById(string id);

    }
}
