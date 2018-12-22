using integrating.web.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace integrating.web.Common
{
    public class JRRank {
        public string name { get; set; }
        public string depname { get; set; }
        public string postion { get; set; }
        public string scoresum { get; set; }
        public string num { get; set; }
    }
    public class commonAll
    {

        public enum Type
        {
            发起申请,
            审批中,
            审核中,
            终审中,
            退回

        }
        /// <summary>
        /// 获取部门列表
        /// </summary>
        /// <returns></returns>
        public static List<DD_Dept> getDep()
        {
            List<DD_Dept> list = new List<DD_Dept>();
            string sqlstr = "select * from [Integrating].[dbo].[DD_DeptSet] where Name!='外派' and Name!='三禾村镇银行' and Name!='员工库' and Name!='领导班子' and Name!='借调人员' and Parent_ID='1'";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    DD_Dept dept = new DD_Dept();
                    dept.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                    dept.Parent_ID = table.Rows[i][1].ToString();
                    dept.Name = table.Rows[i][2].ToString();
                    dept.Dep_ID = table.Rows[i][3].ToString();
                    list.Add(dept);
                }
            }
            return list;
        }
       
        public static List<JRRank> getAllUserRank()
        {
            List<JRRank> list = new List<JRRank>();
            string sqlstr = "   select B.deptID,Integrating.dbo.DD_DeptSet.Name,B.scoresum,userid,B.name,B.position " + "from Integrating.dbo.DD_DeptSet join " +
   "(select top 100 percent Integrating.dbo.DD_UserSet.deptID,Integrating.dbo.DD_UserSet.position,A.itemcount,A.scoresum, name,Integrating.dbo.DD_UserSet.userId from Integrating.dbo.DD_UserSet left join " +
      "(select top 100 percent userid, SUM(convert(int, score)) as scoresum, COUNT(*) as itemcount " +
   "from[Integrating].[dbo].[businessSet] group by userid order by scoresum desc) as A on " +
   "Integrating.dbo.DD_UserSet.userId = A.userId where itemcount is not null order by scoresum desc) as B on " +
   "B.deptID = Integrating.dbo.DD_DeptSet.Dep_ID order by scoresum desc";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JRRank jrrank = new JRRank();
                    jrrank.name=table.Rows[i][4].ToString();
                    jrrank.depname=table.Rows[i][1].ToString();
                    jrrank.postion=table.Rows[i][5].ToString();
                    jrrank.scoresum=table.Rows[i][2].ToString();
                    jrrank.num = (i+1).ToString();
                    list.Add(jrrank);
                }
            }
            return list;
        }
    }
}