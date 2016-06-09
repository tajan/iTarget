using iTarget.Entities;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.Documents.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Repository
{
    public class BaseRepository : IBaseRepository
    {

        protected DocumentClient Client { get; set; }

        protected Database Database { get; set; }

        protected DocumentCollection Collection { get; set; }

        public BaseRepository(DocumentDbOptions _documentDbOptions)
        {

            JsonConvert.DefaultSettings = () => new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore
            };

            ConnectionPolicy connectionPolicy = new ConnectionPolicy();

#if DEBUG
            connectionPolicy.ConnectionMode = ConnectionMode.Gateway;
            connectionPolicy.ConnectionProtocol = Protocol.Https;
#else
            connectionPolicy.ConnectionMode = ConnectionMode.Direct;
            connectionPolicy.ConnectionProtocol = Protocol.Tcp;
#endif

            Client = new DocumentClient(new Uri(_documentDbOptions.EndpointUrl), _documentDbOptions.AuthorizationKey, connectionPolicy);
            Database = CreateOrReadDatabaseAsync(_documentDbOptions.DatabaseId).Result;
            Collection = CreateOrReadCollectionAsync(_documentDbOptions.CollectionId).Result;

        }

        public IQueryable<T> AsQueryable<T>() where T : IBaseEntity
        {
            return Client.CreateDocumentQuery<T>(Collection.SelfLink);
        }

        public IQueryable<T> AsQueryable<T>(string sql) where T : IBaseEntity
        {
            return Client.CreateDocumentQuery<T>(Collection.SelfLink, sql);
        }

        public IQueryable<T> AsQueryable<T>(Expression<Func<T, bool>> predicate) where T : IBaseEntity
        {
            return Client.CreateDocumentQuery<T>(Collection.SelfLink).Where(p => p.TypeName == typeof(T).Name).Where(predicate);
        }

        public virtual IDocumentQuery<T> AsDocumentQuery<T>() where T : IBaseEntity
        {
            return Client.CreateDocumentQuery<T>(Collection.SelfLink).AsDocumentQuery();
        }

        public virtual IDocumentQuery<T> AsDocumentQuery<T>(string sql) where T : IBaseEntity
        {
            return Client.CreateDocumentQuery<T>(Collection.SelfLink, sql).AsDocumentQuery();
        }

        public virtual IDocumentQuery<T> AsDocumentQuery<T>(Expression<Func<T, bool>> predicate) where T : IBaseEntity
        {

            var query = Client
                .CreateDocumentQuery<T>(Collection.SelfLink)
                .Where(predicate)
                .AsDocumentQuery();

            return query;
        }



        public virtual async Task<List<T>> GetItemsAsync<T>() where T : IBaseEntity
        {

            var query = await Client
                .CreateDocumentQuery<T>(Collection.SelfLink)
                .Where(p => p.TypeName == typeof(T).Name)
                .AsDocumentQuery()
                .ExecuteNextAsync<T>();

            return query.ToList();
        }

        public virtual async Task<List<T>> GetItemsAsync<T>(string sql) where T : IBaseEntity
        {

            var query = await Client
                .CreateDocumentQuery<T>(Collection.SelfLink, sql)
                .Where(p => p.TypeName == typeof(T).Name)
                .AsDocumentQuery()
                .ExecuteNextAsync<T>();

            return query.ToList();
        }

        public virtual async Task<List<T>> GetItemsAsync<T>(Expression<Func<T, bool>> predicate) where T : IBaseEntity
        {

            var query = await Client
                .CreateDocumentQuery<T>(Collection.SelfLink)
                .Where(p => p.TypeName == typeof(T).Name)
                .Where(predicate)
                .AsDocumentQuery()
                .ExecuteNextAsync<T>();

            return query.ToList();
        }



        //public virtual async Task<T> GetItemAsync<T>(string id) where T : IBaseEntity
        //{

        //    var query = await Client
        //        .CreateDocumentQuery<T>(Collection.SelfLink)
        //        .Where(p => p.Id == id && p.TypeName == typeof(T).Name)
        //        .AsDocumentQuery()
        //        .ExecuteNextAsync<T>();

        //    return query.ToList().FirstOrDefault();
        //}

        public virtual async Task<T> CreateItemAsync<T>(T item) where T : IBaseEntity
        {

            var result = await Client.CreateDocumentAsync(Collection.SelfLink, item);
            return item;
        }

        public virtual async Task<T> UpdateItemAsync<T>(T item) where T : IBaseEntity
        {

            var doc = await GetDocumentAsync(item.Id);
            var result = await Client.ReplaceDocumentAsync(doc.SelfLink, item);
            return item;
        }

        public virtual async Task<T> UpsertItemAsync<T>(T item) where T : IBaseEntity
        {

            await Client.UpsertDocumentAsync(Collection.SelfLink, item);
            return item;
        }

        public virtual async Task<bool> DeleteItemAsync<T>(string id) where T : IBaseEntity
        {

            var doc = await GetDocumentAsync(id);
            var result = await Client.DeleteDocumentAsync(doc.SelfLink);
            return result.StatusCode == System.Net.HttpStatusCode.OK;
        }

        protected virtual async Task<Document> GetDocumentAsync(string id)
        {

            var query = this.Client
                .CreateDocumentQuery(Collection.SelfLink)
                .Where(d => d.Id == id)
                .AsDocumentQuery();

            var result = await query.ExecuteNextAsync<Document>();

            return result.Single();
        }

        protected virtual async Task<Database> CreateOrReadDatabaseAsync(string databaseName)
        {

            if (Client.CreateDatabaseQuery().Where(x => x.Id == databaseName).AsEnumerable().Any())
            {
                return Client.CreateDatabaseQuery().Where(x => x.Id == databaseName).AsEnumerable().FirstOrDefault();
            }

            return await Client.CreateDatabaseAsync(new Database { Id = databaseName });
        }

        protected virtual async Task<DocumentCollection> CreateOrReadCollectionAsync(string collectionName)
        {

            if (Client.CreateDocumentCollectionQuery(Database.SelfLink).Where(c => c.Id == collectionName).ToArray().Any())
            {
                return Client.CreateDocumentCollectionQuery(Database.SelfLink).Where(c => c.Id == collectionName).ToArray().FirstOrDefault();
            }

            return await Client.CreateDocumentCollectionAsync(Database.SelfLink, new DocumentCollection { Id = collectionName });
        }
    }
}
