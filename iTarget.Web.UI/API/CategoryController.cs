namespace iTarget.Web.UI.API
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using System.Collections;
    using Services;
    using Repository;
    using System.Threading.Tasks;
    using Entities;

    public class CategoryController : ApiController
    {

        private static ICategoryService service = null;

        public CategoryController()
        {
            IBaseRepository rep = Helper.GetRepository();
            service = new CategoryService(rep);
        }

        [HttpPost]
        public async Task<Category> Create(Category model)
        {
            return await service.Create(model);
        }

        [HttpPost]
        public async Task<Category> Update(Category model)
        {
            return await service.Update(model);
        }

        [HttpPost]
        public async Task<Category> Delete(Category model)
        {
            return await service.Delete(model);

        }

        [HttpGet]
        public async Task<Category> GetById(string id)
        {
            return await service.GetById(id);

        }

        [HttpGet]
        public async Task<List<Category>> GetAll()
        {
            return await service.GetForUser("");

        }

    }
}
