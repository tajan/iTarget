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

    public class ActivityController : ApiController
    {

        private static IActivityService service = null;

        public ActivityController()
        {
            IBaseRepository rep = Helper.GetRepository();
            service = new ActivityService(rep);
        }

        [HttpPost]
        public async Task<Activity> Create(Activity model)
        {
            return await service.Create(model);
        }

        [HttpPost]
        public async Task<Activity> Update(Activity model)
        {
            return await service.Update(model);
        }

        [HttpPost]
        public async Task<Activity> Delete(Activity model)
        {
            return await service.Delete(model);
        }

        [HttpGet]
        public async Task<Activity> GetById(string id)
        {
            return await service.GetById(id);
        }

        [HttpGet]
        public async Task<List<Activity>> GetByTarget(string id)
        {
            return await service.GetByTarget(id);
        }


    }
}