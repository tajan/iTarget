using iTarget.Entities;
using iTarget.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Services
{
    public class ActivityService : IActivityService
    {
        private IBaseRepository repository;

        public ActivityService(IBaseRepository _repository)
        {
            repository = _repository;
        }

        public async Task<Activity> Create(Activity activity)
        {

            activity.PrepareToCreate();
            var result = await repository.CreateItemAsync<Activity>(activity);

            await RefreshParentTarget(activity.TargetId);

            return result;
        }

        public async Task<Activity> Delete(Activity activity)
        {

            activity.PrepareToDelete();
            var result = await repository.UpdateItemAsync<Activity>(activity);

            await RefreshParentTarget(activity.TargetId);

            return result;
        }

        public async Task<Activity> Update(Activity activity)
        {

            var oldActivity = await GetById(activity.Id);
            var oldTargetId = oldActivity.TargetId;

            activity.PrepareToUpdate();
            var result = await repository.UpdateItemAsync<Activity>(activity);

            if (oldTargetId != activity.TargetId)
            {
                await RefreshParentTarget(oldTargetId);
                await RefreshParentTarget(activity.TargetId);
            }

            return result;

        }

        public async Task<Activity> GetById(string id)
        {
            var result = await repository.GetItemsAsync<Activity>(p => p.Id == id);
            return result.FirstOrDefault();
        }

        public async Task<List<Activity>> GetByTarget(string targetId)
        {
            var result = await repository.GetItemsAsync<Activity>(p => p.TargetId == targetId && p.IsActive == true);
            return result.ToList();
        }
        
        private async Task RefreshParentTarget(string targetId)
        {

            var targets = await repository.GetItemsAsync<Target>(p => p.Id == targetId);
            var target = targets.SingleOrDefault();

            var activityCount = await repository.GetItemsAsync<Activity>(p => p.IsActive == true && p.TargetId == targetId);

            target.ActivityCount = activityCount.Count();

            await repository.UpdateItemAsync<Target>(target);

        }
        

    }
}
