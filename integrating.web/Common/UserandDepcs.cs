using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace integrating.web.Common
{
    public class UserandDepcs
    {
        public static List<string> getallDDuser()
        {
            List<string> list = new List<string>();
            //钉钉上非领导组的所有人员
            string sqlstr = "  select * from [Integrating].[dbo].[DD_UserSet] where deptID!='72079554'";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    list.Add(table.Rows[i][0].ToString());
                }
            }
            return list;
        }
        /// <summary>
        /// 根据某用户id查到部门领导userid即审批人
        /// </summary>
        /// <param name="uiserid"></param>
        /// <returns></returns>
        public static string getAuditLeader(string uiserid)
        {
            string str = "";
            string sqlstr = " select userid from [Integrating].[dbo].[DD_UserSet] where deptID=(select deptID from[Integrating].[dbo].[DD_UserSet]  where userid = '457353') and isLeader = 'true'";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    str = table.Rows[0][0].ToString();
                }
            }
            return str;
        }
    }
}