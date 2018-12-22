using integrating.web.Data;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using static integrating.web.Helper.JsonHelper;

namespace integrating.web.Helper
{

    /// <summary>
    /// DingHelper 的摘要说明
    /// </summary>
    public class DingHelper
    {
        /// <summary>
        /// 获取钉钉企业token
        /// </summary>
        /// <returns></returns>
        public static string GetDDToken()
        {

            var postData = "Mode=getAccessToken()";
            var data = Encoding.ASCII.GetBytes(postData);
            var request = (HttpWebRequest)WebRequest.Create("http://iis.czrcb.net.cn/dingding/crc_bank/dingServer.asp");
            request.Method = "POST";
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = data.Length;

            using (var stream = request.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            var response = (HttpWebResponse)request.GetResponse();

            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            return responseString;
        }
        /// <summary>
        /// 获取部门用户详情
        /// </summary>
        /// <param name="dep_id"></param>
        /// <returns></returns>
        public static string GetDep_UserInfo(string dep_id)
        {
            string tokeen = GetDDToken();
            var request = (HttpWebRequest)WebRequest.Create("https://oapi.dingtalk.com/user/listbypage?access_token=" + tokeen + "&department_id=" + dep_id + "&offset=" + "0&size=" + "100");
            request.Method = "GET";
            request.ContentType = "application/x-www-form-urlencoded";
            var response = (HttpWebResponse)request.GetResponse();
            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            return responseString;
        }
        /// <summary>
        /// 获取子部门ID列表
        /// </summary>
        /// <returns></returns>
        public static string GetDDdep_id(string dep_id)
        {
            string tokeen = GetDDToken();
            var request = (HttpWebRequest)WebRequest.Create("https://oapi.dingtalk.com/department/list?access_token=" + tokeen + "&id="+dep_id);
            request.Method = "GET";
            request.ContentType = "application/x-www-form-urlencoded";
            var response = (HttpWebResponse)request.GetResponse();
            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
            return responseString;
        }
        /// <summary>
        /// 同步数据库中的部门
        /// </summary>
        public static string Syn_Dep()

        {
            int count = 0;
           string DDdep_id_list =GetDDdep_id("1");
            //List<Department> listdep = new List<Department>();
            // DD_Dept DDdept= JsonHelper.ParseFormByJson<DD_Dept>(DDdep_id_list); 
            string json = DDdep_id_list;
            JavaScriptSerializer js = new JavaScriptSerializer();   //实例化一个能够序列化数据的类
            MyDepJson list = js.Deserialize<MyDepJson>(json);    //将json数据转化为对象类型并赋值给list
            string errmsg = list.errmsg;
            string errcode = list.errcode;
            List<Department> dep = list.department;
            List<DD_Dept> dd_dep = new List<DD_Dept>();
            SqlHelper.ExecteNonQuery(SqlHelper.connectionString, CommandType.Text, "delete [Integrating].[dbo].[DD_DeptSet]", new SqlParameter[] { });
            StringBuilder sqlstr = new StringBuilder("insert into [Integrating].[dbo].[DD_DeptSet] values ");
            for (int i = 0; i < dep.Count; i++)
            {
                dd_dep.Add(new DD_Dept(){ Name= dep[i].name, Parent_ID = dep[i].parentid ,Dep_ID=dep[i].id});
                sqlstr.Append("('"+dep[i].parentid+"','"+dep[i].name+"','"+ dep[i].id+"')");
                if (i < dep.Count - 1)
                {
                    sqlstr.Append(",");
                }
            }
            count=SqlHelper.ExecteNonQuery(SqlHelper.connectionString,CommandType.Text,sqlstr.ToString(),new SqlParameter[] { });
            if (count > 0)
            {
                return "更新成功，更新条目数为" + count;
            }
            else
            {
                return "更新失败,请联系管理员";
            }
        }
        /// <summary>
        /// 同步用户
        /// </summary>
        public static string Syn_User()
        {
            string[] depID = { };
            int count = 0;
            DataTable dt=SqlHelper.GetTable(SqlHelper.connectionString,CommandType.Text, "select distinct Dep_ID from [Integrating].[dbo].[DD_DeptSet]", new SqlParameter[] { })[0];
            //DataTable dt1 = SqlHelper.GetTable(SqlHelper.connectionString, CommandType.Text, "select distinct Dep_ID from [Integrating].[dbo].[DD_DeptSet]", new SqlParameter[] { })[0];
            SqlHelper.ExecteNonQuery(SqlHelper.connectionString, CommandType.Text, "delete [Integrating].[dbo].[DD_UserSet]", new SqlParameter[] { });
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                StringBuilder sqlstr = new StringBuilder("insert into [Integrating].[dbo].[DD_UserSet] values ");
                string jsonstr=GetDep_UserInfo(dt.Rows[i][0].ToString());
                JavaScriptSerializer js = new JavaScriptSerializer();   //实例化一个能够序列化数据的类
                UserIDJson list = js.Deserialize<UserIDJson>(jsonstr);    //将json数据转化为对象类型并赋值给list
                string hasMore = list.hasMore;
                string errmsg = list.errmsg;
                string errcode = list.errcode;
                List<user> userlist = list.userlist;
           
                if (userlist.Count > 1)
                {
                    for (int j = 0; j < userlist.Count - 1; j++)
                    {
                        sqlstr.Append("('" + userlist[j].userid + "','" + userlist[j].unionid + "','" + userlist[j].order + "','" + userlist[j].isAdmin + "','" + userlist[j].isBoss + "','" + userlist[j].isHide + "','" + userlist[j].isLeader + "','" + userlist[j].name + "','" + userlist[j].active + "','" + dt.Rows[i][0].ToString() + "','" + userlist[j].position + "','" + userlist[j].avatar + "','" + userlist[j].jobnumber + "'),");
                    }

                    sqlstr.Append("('" + userlist[userlist.Count - 1].userid + "','" + userlist[userlist.Count - 1].unionid + "','" + userlist[userlist.Count - 1].order + "','" + userlist[userlist.Count - 1].isAdmin + "','" + userlist[userlist.Count - 1].isBoss + "','" + userlist[userlist.Count - 1].isHide + "','" + userlist[userlist.Count - 1].isLeader + "','" + userlist[userlist.Count - 1].name + "','" + userlist[userlist.Count - 1].active + "','" + dt.Rows[i][0].ToString() + "','" + userlist[userlist.Count - 1].position + "','" + userlist[userlist.Count - 1].avatar + "','" + userlist[userlist.Count - 1].jobnumber + "')");
                    count=SqlHelper.ExecteNonQuery(SqlHelper.connectionString, CommandType.Text, sqlstr.ToString(), new SqlParameter[] { });
                }
                else if(userlist.Count==1)
                {
                    sqlstr.Append("('" + userlist[userlist.Count - 1].userid + "','" + userlist[userlist.Count - 1].unionid + "','" + userlist[userlist.Count - 1].order + "','" + userlist[userlist.Count - 1].isAdmin + "','" + userlist[userlist.Count - 1].isBoss + "','" + userlist[userlist.Count - 1].isHide + "','" + userlist[userlist.Count - 1].isLeader + "','" + userlist[userlist.Count - 1].name + "','" + userlist[userlist.Count - 1].active + "','" + dt.Rows[i][0].ToString() + "','" + userlist[userlist.Count - 1].position + "','" + userlist[userlist.Count - 1].avatar + "','" + userlist[userlist.Count - 1].jobnumber + "')");
                   count= SqlHelper.ExecteNonQuery(SqlHelper.connectionString, CommandType.Text, sqlstr.ToString(), new SqlParameter[] { });
                }

            }
            sysUserextend();
            if (count > 0)
            {
                return "更新成功，更新条目数为" + count;
            }
            else
            {
                return "更新失败,请联系管理员";
            }

        }
        /// <summary>
        /// 根据钉钉数据库，更新用户扩展表UsersSet
        /// </summary>
        public static string sysUserextend()
        {
            
            string sqlstr = "insert into [Integrating].[dbo].[UsersSet] (Userid,Username,RoleId) select userid,name,1 from Integrating.dbo.DD_UserSet where isAdmin = 'false' and isLeader = 'false'";
            string sqlstr1 = "  insert into [Integrating].[dbo].[UsersSet] (Userid,username,RoleId) select userid, name,2 from Integrating.dbo.DD_UserSet where isLeader = 'true'";
            string sqlstr2 = "  insert into [Integrating].[dbo].[UsersSet] (Userid,username,RoleId) select userid, name,3 from Integrating.dbo.DD_UserSet where isAdmin = 'true' and isLeader = 'true'";
            int i=SqlHelper.ExecteNonQuery(SqlHelper.connectionString, CommandType.Text, sqlstr, new SqlParameter[] { });
            int j= SqlHelper.ExecteNonQuery(SqlHelper.connectionString, CommandType.Text, sqlstr1, new SqlParameter[] { });
            int m=SqlHelper.ExecteNonQuery(SqlHelper.connectionString, CommandType.Text, sqlstr2, new SqlParameter[] { });
            if (i > 0&&j>0&&m>0)
            {
                return "更新成功，更新条目数为" + i;
            }
            else {
                return "更新失败,请联系管理员";
            }
        }
    }
}