using iTarget.Repository;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Web.UI.API
{
    public static class Helper
    {

        static IBaseRepository repository;
        static object syncRoot;

        static Helper()
        {
            syncRoot = new object();
        }

        public static IBaseRepository GetRepository()
        {
            if (repository == null)
            {
                lock (syncRoot)
                {
                    if (repository == null)
                    {
                        DocumentDbOptions dbOptions = new DocumentDbOptions();
                        dbOptions.EndpointUrl = ConfigurationManager.AppSettings["EndPointUrl"];
                        dbOptions.AuthorizationKey = ConfigurationManager.AppSettings["AuthorizationKey"];
                        dbOptions.DatabaseId = ConfigurationManager.AppSettings["DatabaseId"];
                        dbOptions.CollectionId = ConfigurationManager.AppSettings["CollectionId"];
                        repository = new BaseRepository(dbOptions);
                    }
                }
            }

            return repository;

        }

    }
}
