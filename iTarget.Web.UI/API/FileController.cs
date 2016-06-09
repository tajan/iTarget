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
    using System.Web;
    using System.Web.Http.Controllers;
      
    
    public class FileController : ApiController
    {

      
        [HttpPost]
        public async Task<File> Upload()
        {

            // Check if the request contains multipart/form-data.
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            var uploadPath = HttpContext.Current.Server.MapPath("~/Temp/Uploads");

            var multipartFormDataStreamProvider = new UploadMultipartFormProvider(uploadPath);

            // Read the MIME multipart asynchronously 
            await Request.Content.ReadAsMultipartAsync(multipartFormDataStreamProvider);

            string _localFileName = multipartFormDataStreamProvider
                .FileData.Select(multiPartData => multiPartData.LocalFileName).FirstOrDefault();

            // Create response
            var model = new File()
            {
                Name = multipartFormDataStreamProvider.FileName,
                Size = new System.IO.FileInfo(_localFileName).Length
            };

            model.PrepareToCreate();

            return await Task.FromResult<File>(model);

        }
        

        //[HttpGet]
        //public async Task<File> GetById(string id)
        //{
        //    return await Service().GetById(id);

        //}


    }

}

