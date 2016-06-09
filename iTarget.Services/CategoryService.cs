using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iTarget.Entities;
using iTarget.Repository;

namespace iTarget.Services
{
    public class CategoryService : ICategoryService
    {

        private IBaseRepository repository;

        public CategoryService(IBaseRepository _repository)
        {
            repository = _repository;
        }

        public async Task<Category> Create(Category category)
        {
            string userId = category.CreateBy;

            // get user's category ids
            UserCategories userCategories = null;// = repository.GetItemsAsync<UserCategories>(p => p.Id == userId).Result.FirstOrDefault();

            if (userCategories == null)
            {

                // there is no category for the user
                userCategories = new UserCategories();
                userCategories.PrepareToCreate();
                userCategories.Id = userId;
                // setting default properties
                category.PrepareToCreate();

                // creating category
                category = await repository.CreateItemAsync<Category>(category);

                await repository.CreateItemAsync<UserCategories>(userCategories);

                return category;


            }


            else {

                // get categories with ids
                //check if new category with the same title already exists or not
                IList<Category> oldCategories = await repository
                    .GetItemsAsync<Category>(p => userCategories.CategoryIds.Contains(p.Id) && p.Title == category.Title);

                // todo: remove this code and implement validation 
                // there is no need to add the category
                if (oldCategories.Count == 0)
                {
                    category = oldCategories.FirstOrDefault();
                }

                return category;

            }









            //// setting default properties
            //category.PrepareToCreate();


            //// creating category
            //category = await repository.CreateItemAsync<Category>(category);


            //// assigning category to the user's categories
            //userCategories.CategoryIds.Add(category.Id);
            //bool isUpdated = await repository.UpdateItemAsync<UserCategories>(userCategories.Id, userCategories);


            //// todo: implement exceptioin handling if category is not created

            //return category;


        }

        public async Task<Category> Delete(Category category)
        {

            category.PrepareToDelete();
            var result = await repository.UpdateItemAsync<Category>(category);
            return result;

        }

        public async Task<Category> Update(Category category)
        {
            category.PrepareToUpdate();
            var result = await repository.UpdateItemAsync<Category>(category);
            return result;

        }


        public async Task<List<Category>> GetForUser(string userId)
        {
            var result = await repository.GetItemsAsync<Category>(p => p.IsActive == true);
            //var result = await repository.GetItemsAsync<Category>(p => p.CreateBy == userId);
            return result;
        }

        public async Task<Category> GetById(string id)
        {
            var result = await repository.GetItemsAsync<Category>(p => p.Id == id);
            return result.FirstOrDefault();
        }

    }

}
