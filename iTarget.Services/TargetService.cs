using iTarget.Entities;
using iTarget.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Services
{
    public class TargetService : ITargetService
    {
        private IBaseRepository repository;

        public TargetService(IBaseRepository _repository)
        {
            repository = _repository;
        }

        public async Task<Target> Create(Target target)
        {

            target.PrepareToCreate();
            target.Status = TargetStatuses.InProgress;
            target.StartTicks = target.StartDate.Ticks / 1000000;
            target.EndTicks = target.EndDate.Ticks / 1000000;

            var result = await repository.CreateItemAsync<Target>(target);

            await RefreshParentCategory(target.CategoryId);

            return result;

        }

        public async Task<Target> Delete(Target target)
        {

            target.PrepareToDelete();

            var result = await repository.UpdateItemAsync<Target>(target);

            await RefreshParentCategory(target.CategoryId);

            return result;

        }

        public async Task<Target> Update(Target target)
        {

            var oldTarget = await GetById(target.Id);
            var oldTargetCategoryId = oldTarget.CategoryId;
            
            target.PrepareToUpdate();
            target.StartTicks = target.StartDate.Ticks/1000000;
            target.EndTicks = target.EndDate.Ticks / 1000000;

            var result = await repository.UpdateItemAsync<Target>(target);

            if (oldTargetCategoryId != target.CategoryId)
            {
                await RefreshParentCategory(oldTargetCategoryId);
                await RefreshParentCategory(target.CategoryId);
            }

            return result;

        }

        public async Task<Target> GetById(string id)
        {
            var result = await repository.GetItemsAsync<Target>(p => p.Id == id);
            return result.FirstOrDefault();
        }

        public async Task<List<Target>> GetByCategory(string categoryId)
        {
            var result = await repository.GetItemsAsync<Target>(p => p.CategoryId == categoryId && p.IsActive == true);
            return result.ToList();
        }

        private async Task RefreshParentCategory(string categoryId)
        {

            var categories = await repository.GetItemsAsync<Category>(p => p.Id == categoryId);
            var category = categories.SingleOrDefault();

            var targetCount = await repository.GetItemsAsync<Target>(p => p.IsActive == true && p.CategoryId == categoryId);

            category.TargetCount = targetCount.Count();

            await repository.UpdateItemAsync<Category>(category);

        }


    }
}
