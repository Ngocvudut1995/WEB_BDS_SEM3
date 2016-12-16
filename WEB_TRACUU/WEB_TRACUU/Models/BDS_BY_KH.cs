using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WEB_TRACUU.Models
{
    public class BDS_BY_KH
    {
        public BDS_Detail bds;

        public string Name_Customer;
        public Guid ID_Customer;
        public System.Nullable<int> IDPrice;
        public System.Nullable<int> _IDType;
        public System.Nullable<int> IDAcreage;
        
        public System.Nullable<bool> Flag_Approval;
        public int _IDPost;
    }
}