using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iTarget.Entities;

namespace iTarget.Services
{
    public static class Extensions
    {
        public static void PrepareToCreate(this IBaseEntity baseEntity)
        {

            baseEntity.CreateDate = DateTime.UtcNow;
            baseEntity.CreateTicks = baseEntity.CreateDate.Ticks / 1000000;
            baseEntity.UpdateDate = baseEntity.CreateDate;
            baseEntity.UpdateTicks = baseEntity.UpdateDate.Ticks / 1000000;
            baseEntity.IsActive = true;
            baseEntity.Id = Guid.NewGuid().ToString();
            baseEntity.UpdateBy = baseEntity.CreateBy;


        }

        public static void PrepareToDelete(this IBaseEntity baseEntity)
        {

            baseEntity.IsActive = false;
            baseEntity.UpdateDate = DateTime.UtcNow;


        }

        public static void PrepareToUpdate(this IBaseEntity baseEntity)
        {

            baseEntity.IsActive = true;
            baseEntity.UpdateDate = DateTime.UtcNow;
            baseEntity.UpdateTicks = baseEntity.UpdateDate.Ticks / 1000000;

        }


    }

}
