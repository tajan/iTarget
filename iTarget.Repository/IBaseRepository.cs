using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using iTarget.Entities;

namespace iTarget.Repository
{
    public interface IBaseRepository
    {

        IQueryable<T> AsQueryable<T>() where T : IBaseEntity;

        IQueryable<T> AsQueryable<T>(string sql) where T : IBaseEntity;

        IQueryable<T> AsQueryable<T>(Expression<Func<T, bool>> predicate) where T : IBaseEntity;

        Task<List<T>> GetItemsAsync<T>() where T : IBaseEntity;

        Task<List<T>> GetItemsAsync<T>(string sql) where T : IBaseEntity;

        Task<List<T>> GetItemsAsync<T>(Expression<Func<T, bool>> predicate) where T : IBaseEntity;


        //Task<T> GetItemAsync<T>(string id) where T : IBaseEntity;

        Task<T> CreateItemAsync<T>(T item) where T : IBaseEntity;

        Task<T> UpdateItemAsync<T>(T item) where T : IBaseEntity;

        Task<T> UpsertItemAsync<T>(T item) where T : IBaseEntity;

        Task<bool> DeleteItemAsync<T>(string id) where T : IBaseEntity;

    }
}
