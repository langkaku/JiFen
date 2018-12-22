using integrating.web.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace integrating.web.BLL
{
    public class Deptoption
    {
        public static DataTable GetDept() {
            //查找非领导的顶级部门列表
            string sqlstr = "select * from Integrating.dbo.DD_DeptSet where Parent_ID='1' and Dep_ID!='72079554'";
            DataTable table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            return table;
        }
        //查找某父类id下的子部门列表
        public static DataTable getsecendDept(string FirstDept) {
            string sqlstr = " select * from Integrating.dbo.DD_DeptSet where Parent_ID='"+FirstDept;
            DataTable table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            return table;
        }
    }
}