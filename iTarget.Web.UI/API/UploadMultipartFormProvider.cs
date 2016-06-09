using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace iTarget.Web.UI.API
{
    public class UploadMultipartFormProvider : MultipartFormDataStreamProvider
    {
        public string FileName { get; set; }

        public UploadMultipartFormProvider(string rootPath) : base(rootPath) { }


        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            if (headers != null && headers.ContentDisposition != null)
            {
                FileName = headers.ContentDisposition.FileName.TrimEnd('"').TrimStart('"');
            }
            else {
                FileName = "NA";
            }

            return base.GetLocalFileName(headers);

        }
    }

}
