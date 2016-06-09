//using iTarget.Entities;
//using iTarget.Repository;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace iTarget.Services
//{
//    public class FileService : IFileService
//    {

//        private IBaseRepository repository;

//        public FileService(IBaseRepository _repository)
//        {
//            repository = _repository;
//        }

//        public async Task<File> Create(File file)
//        {
//            file.PrepareToCreate();
//            return await repository.CreateItemAsync<File>(file);
//        }

//        public async Task<File> Delete(File file)
//        {
//            file.PrepareToDelete();
//            var result = await repository.UpdateItemAsync<File>(file);
//            return result;
//        }

//        public async Task<List<File>> GetByIds(string[] ids)
//        {
//            var result = await repository.GetItemsAsync<File>(p => ids.Contains(p.Id));
//            return result;
//        }

//        public async Task<File> GetById(string id)
//        {
//            var result = await repository.GetItemsAsync<File>(p => p.Id == id);
//            return result.FirstOrDefault();
//        }

//    }
//}
