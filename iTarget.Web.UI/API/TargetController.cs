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
    using System.Configuration;
    using System.Threading.Tasks;
    using Entities;

    public class TargetController : ApiController
    {

        private static ITargetService service = null;

        public TargetController()
        {
            IBaseRepository rep = Helper.GetRepository();
            service = new TargetService(rep);
        }


        [HttpPost]
        public async Task<Target> Create(Target model)
        {
            return await service.Create(model);
        }

        [HttpPost]
        public async Task<Target> Update(Target model)
        {
            return await service.Update(model);
        }

        [HttpPost]
        public async Task<Target> Delete(Target model)
        {
            return await service.Delete(model);
        }

        [HttpGet]
        public async Task<Target> GetById(string id)
        {
            return await service.GetById(id);
        }

        [HttpGet]
        public async Task<List<Target>> GetByCategory(string id)
        {
            return await service.GetByCategory(id);
        }

    }
}
