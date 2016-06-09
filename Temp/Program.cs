using iTarget.Repository;
using iTarget.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using iTarget.Services;


namespace Temp
{
    class Program
    {

        static void Main(string[] args)
        {

            DocumentDbOptions dbOptions = new DocumentDbOptions();
            dbOptions.EndpointUrl = ConfigurationManager.AppSettings["EndPointUrl"];
            dbOptions.AuthorizationKey = ConfigurationManager.AppSettings["AuthorizationKey"];
            dbOptions.DatabaseId = ConfigurationManager.AppSettings["DatabaseId"];
            dbOptions.CollectionId = ConfigurationManager.AppSettings["CollectionId"];

            BaseRepository rep = new BaseRepository(dbOptions);
            CategoryService catService = new CategoryService(rep);
            UserService userService = new UserService(rep);
            

            //create user
            User newUser = new User();
            newUser.Firstname = "John";
            newUser.Lastname = "Smith";
            newUser.Email = "john@smith.com";
            newUser.Username = "john";

            User createdUser;
            createdUser = userService.Create(newUser).Result;


            //var k = rep.GetItemAsync<User>("7714f0c0-3dc0-47b5-a859-f3df5e94cbec").Result;
            var r = rep.GetItemsAsync<User>(p => p.Id == "7714f0c0-3dc0-47b5-a859-f3df5e94cbec").Result;
            var sql = "select * from documents where id = '7714f0c0-3dc0-47b5-a859-f3df5e94cbec'";
            var r1 = rep.GetItemsAsync<User>(sql).Result;
            //create some categories for user
            //for (Int32 i = 0; i < 10; i++)
            //{

            //    Category newCat = new Category();
            //    Category createdCategory;

            //    newCat.Title = "Category " + i.ToString();
            //    newCat.CreateBy = createdUser.Id;
            //    createdCategory = catService.Create(newCat).Result;

            //}

            var allUsers = rep.GetItemsAsync<User>().Result;
            var allCategories = rep.GetItemsAsync<Category>().Result;
            var allUserCategories = rep.GetItemsAsync<UserCategories>().Result;
          
            Console.WriteLine("\n Creating documents");


        }
    }
}
