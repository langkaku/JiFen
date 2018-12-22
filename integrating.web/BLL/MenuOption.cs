using integrating.web.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;


namespace integrating.web.BLL
{
    public class MenuOption
    {
        /// <summary>
        /// 获取积分表一级类别
        /// </summary>
        /// <returns></returns>
        public static List<JFitem> GetFirstMenu()
        {
            List<JFitem> list = new List<JFitem>();
            //List<string[]> list = new List<string[]>();
            string sqlstr = "select * from Integrating.dbo.JFitem where par_Id='0'";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            for (int i=0;i<table.Rows.Count;i++)
            {
                JFitem jfitem = new JFitem();
                //string[] str = { table.Rows[i][0].ToString(), table.Rows[i][1].ToString(), table.Rows[i][2].ToString() };
                //list.Add(str);
                jfitem.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                jfitem.JF_serial = table.Rows[i][1].ToString();
                jfitem.JF_name = table.Rows[i][2].ToString();
                jfitem.score = table.Rows[i][3].ToString();
                jfitem.desp = table.Rows[i][4].ToString();
                jfitem.par_Id = table.Rows[i][5].ToString();
                jfitem.unscore = table.Rows[i][6].ToString();
                jfitem.ismul = table.Rows[i][7].ToString();
                jfitem.exitmultp = table.Rows[i][8].ToString();
                list.Add(jfitem);
            }
            return list; 
        }
        /// <summary>
        /// 获取积分表二级类别
        /// </summary>
        /// <param name="itemid"></param>
        /// <returns></returns>
        public static List<JFitem> GetSecondMenu(string itemid)
        {
            List<JFitem> list = new List<JFitem>();
            string sqlstr = "select * from Integrating.dbo.JFitem where par_Id=@itemid";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@itemid",itemid)
            })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JFitem jfitem = new JFitem();
                    jfitem.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                    jfitem.JF_serial = table.Rows[i][1].ToString();
                    jfitem.JF_name = table.Rows[i][2].ToString();
                    jfitem.score = table.Rows[i][3].ToString();
                    jfitem.desp = table.Rows[i][4].ToString();
                    jfitem.par_Id = table.Rows[i][5].ToString();
                    jfitem.unscore = table.Rows[i][6].ToString();
                    jfitem.ismul = table.Rows[i][7].ToString();
                    jfitem.exitmultp = table.Rows[i][8].ToString();
                    list.Add(jfitem);
                }
            }
            return list;
        }
        /// <summary>
        /// 获取积分表三级类别
        /// </summary>
        /// <param name="itemid"></param>
        /// <returns></returns>
        public static List<JFitem> GetThirdMenu(string itemid)
        {
            List<JFitem> list = new List<JFitem>();
            string sqlstr = "select * from Integrating.dbo.JFitem where par_Id=@itemid";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@itemid",itemid)
            })[0];
            if(table.Rows.Count>0)
            { 
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JFitem jfitem = new JFitem();
                    jfitem.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                    jfitem.JF_serial = table.Rows[i][1].ToString();
                    jfitem.JF_name = table.Rows[i][2].ToString();
                    jfitem.score = table.Rows[i][3].ToString();
                    jfitem.desp = table.Rows[i][4].ToString();
                    jfitem.par_Id = table.Rows[i][5].ToString();
                    jfitem.unscore = table.Rows[i][6].ToString();
                    jfitem.ismul = table.Rows[i][7].ToString();
                    jfitem.exitmultp = table.Rows[i][8].ToString();
                    list.Add(jfitem);
                }
            }
            return list;
        }
        /// <summary>
        /// 获取积分表四级类别
        /// </summary>
        /// <param name="itemid"></param>
        /// <returns></returns>
        public static List<JFitem> GetFourthMenu(string itemid)
        {
            List<JFitem> list = new List<JFitem>();
            string sqlstr = "select * from Integrating.dbo.JFitem where par_Id=@itemid";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@itemid",itemid)
            })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JFitem jfitem = new JFitem();
                    jfitem.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                    jfitem.JF_serial = table.Rows[i][1].ToString();
                    jfitem.JF_name = table.Rows[i][2].ToString();
                    jfitem.score = table.Rows[i][3].ToString();
                    jfitem.desp = table.Rows[i][4].ToString();
                    jfitem.par_Id = table.Rows[i][5].ToString();
                    jfitem.unscore = table.Rows[i][6].ToString();
                    jfitem.ismul = table.Rows[i][7].ToString();
                    jfitem.exitmultp = table.Rows[i][8].ToString();
                    list.Add(jfitem);
                }
            }
            return list;
        }
        /// <summary>
        /// 查找所有得分不为0的列
        /// </summary>
        /// <param name="itemid"></param>
        /// <returns></returns>
        public static List<JFitem> GetNotNullZezoMenu()
        {
            List<JFitem> list = new List<JFitem>();
            string sqlstr = "select * from Integrating.dbo.JFitem where score!='0'";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {})[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JFitem jfitem = new JFitem();
                    jfitem.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                    jfitem.JF_serial = table.Rows[i][1].ToString();
                    jfitem.JF_name = table.Rows[i][2].ToString();
                    jfitem.score = table.Rows[i][3].ToString();
                    jfitem.desp = table.Rows[i][4].ToString();
                    jfitem.par_Id = table.Rows[i][5].ToString();
                    jfitem.unscore = table.Rows[i][6].ToString();
                    jfitem.ismul = table.Rows[i][7].ToString();
                    jfitem.exitmultp = table.Rows[i][8].ToString();
                    list.Add(jfitem);
                }
            }
            return list;
        }
        public static List<JFitem> getedu(string id)
        {
            List<JFitem> list = new List<JFitem>();
            string sqlstr = "  select * from [Integrating].[dbo].[JFitem] where JF_serial like '"+id+"%' and score!='0'";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JFitem jfitem = new JFitem();
                    jfitem.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                    jfitem.JF_serial = table.Rows[i][1].ToString();
                    jfitem.JF_name = table.Rows[i][2].ToString();
                    jfitem.score = table.Rows[i][3].ToString();
                    jfitem.desp = table.Rows[i][4].ToString();
                    jfitem.par_Id = table.Rows[i][5].ToString();
                    jfitem.unscore = table.Rows[i][6].ToString();
                    jfitem.ismul = table.Rows[i][7].ToString();
                    jfitem.exitmultp = table.Rows[i][8].ToString();
                    list.Add(jfitem);
                }
            }
            return list;
        }
        /// <summary>
        /// 获取某个id的所有属性
        /// </summary>
        /// <param name="itemid"></param>
        /// <returns></returns>
        public static List<JFitem> Getitementity(string itemid)
        {
            List<JFitem> list = new List<JFitem>();
            string sqlstr = "select * from Integrating.dbo.JFitem where JF_serial=@itemid";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@itemid",itemid)
            })[0];
            if (table.Rows.Count > 0)
            {
                for (int i = 0; i < table.Rows.Count; i++)
                {
                    JFitem jfitem = new JFitem();
                    jfitem.Id = Convert.ToInt32(table.Rows[i][0].ToString());
                    jfitem.JF_serial = table.Rows[i][1].ToString();
                    jfitem.JF_name = table.Rows[i][2].ToString();
                    jfitem.score = table.Rows[i][3].ToString();
                    jfitem.desp = table.Rows[i][4].ToString();
                    jfitem.par_Id = table.Rows[i][5].ToString();
                    jfitem.unscore = table.Rows[i][6].ToString();
                    jfitem.ismul = table.Rows[i][7].ToString();
                    jfitem.exitmultp = table.Rows[i][8].ToString();
                    list.Add(jfitem);
                }
            }
            return list;
        }
        /// <summary>
        /// 新增一条积分数据
        /// </summary>
        /// <param name="jftitle"></param>
        /// <param name="score"></param>
        /// <param name="jfitemid"></param>
        public static void InsertJF(string jftitle, string score,string jfitemid,string userid)
        {
            string date = DateTime.Now.ToShortDateString();
            string sqlstr = "  select * from [Integrating].[dbo].[businessSet] where jfitemid='@jfitemid' and  userId='@userid'";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[]{
                    new System.Data.SqlClient.SqlParameter("@jfitemid",jfitemid),
                    new System.Data.SqlClient.SqlParameter("@userid",userid),
                })[0];
            if (isBasicScor(jfitemid))
            {
               
                if (table.Rows.Count > 0)
                {
                    UpdateJF(jftitle, score, jfitemid, userid);
                }
            }
            else
            {
                string itemtype = table.Rows[0][0].ToString();
                string str = "insert into [Integrating].[dbo].[businessSet] values (@appid,@date,@type,@score,@score_item,@state,@updatetime,@userid,@beizhu,@isUsed,@unscore,@jfitemid,@itemtype)";
                Helper.SqlHelper.ExecteNonQuery(Helper.SqlHelper.connectionString, CommandType.Text, str, new System.Data.SqlClient.SqlParameter[] {
                        new System.Data.SqlClient.SqlParameter("@appid",userid),
                        new System.Data.SqlClient.SqlParameter("@date",date),
                        new System.Data.SqlClient.SqlParameter("@type","1"),
                        new System.Data.SqlClient.SqlParameter("@score",score),
                        new System.Data.SqlClient.SqlParameter("@score_item",jftitle),
                        new System.Data.SqlClient.SqlParameter("@state",Common.commonAll.Type.发起申请),
                        new System.Data.SqlClient.SqlParameter("@updatetime",date),
                        new System.Data.SqlClient.SqlParameter("@userid",userid),
                        new System.Data.SqlClient.SqlParameter("@beizhu",""),
                        new System.Data.SqlClient.SqlParameter("@isUsed",true),
                        new System.Data.SqlClient.SqlParameter("@unscore","0"),
                        new System.Data.SqlClient.SqlParameter("@jfitemid",jftitle),
                        new System.Data.SqlClient.SqlParameter("@itemtype",itemtype)});
            }
        }
        /// <summary>
        /// 更新一条积分数据
        /// </summary>
        /// <param name="jftitle"></param>
        /// <param name="score"></param>
        /// <param name="jfitemid"></param>
        /// <param name="userid"></param>
        public static void UpdateJF(string jftitle, string score, string jfitemid, string userid)
        {
            string str = "select id from [Integrating].[dbo].[businessSet] where userid=@userid and jfitemid=@jfitemid and score=@score";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, CommandType.Text, str,new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@userid",userid),
                new System.Data.SqlClient.SqlParameter("@jfitemid",jfitemid),
                 new System.Data.SqlClient.SqlParameter("@score",score)
            })[0];
            int id=Convert.ToInt32(table.Rows[0][0].ToString());
            business bus = new business();
            //string sqlstr = "update  [Integrating].[dbo].[businessSet]  set score=@score where  ";
            //DataTable table=
        }
        /// <summary>
        /// 判断是否为基础积分
        /// </summary>
        /// <param name="jfitem_seril"></param>
        /// <returns></returns>
        public static bool isBasicScor(string jfitem_seril)
        {
            string sqlstr = "select type from [Integrating].[dbo].[JFitem] where JF_serial=@jfitem_seril";
            DataTable table = Helper.SqlHelper.GetTable(Helper.SqlHelper.connectionString, CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@jfitem_seril",jfitem_seril)
            })[0];
            if (table.Rows[0][0].ToString() == "5")
            {
                return false;
            }
            else {
                return true;
            }
        }
    }
}