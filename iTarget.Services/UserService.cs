using iTarget.Entities;
using iTarget.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Services
{
    public class UserService
    {
        private IBaseRepository repository;

        public UserService(IBaseRepository _repository)
        {
            repository = _repository;
        }

        public async Task<User> Create(User user)
        {
            user.PrepareToCreate();
            var result = await repository.CreateItemAsync<User>(user);
            return result;
                
        }
    }
}
