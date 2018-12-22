using integrating.web.Helper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;


namespace integrating.web.BLL
{
    public class JiFenoption
    {
        public static void AddBasicScore()
        {
            string sqlstr = "  select userid from [Integrating].[dbo].[DD_UserSet]  join integrating.dbo.mms_ZEmployee on userid=zemployee_num where deptID!='72079554' and name!='武菡'";
            DataTable dt = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            for (int item = 0; item < dt.Rows.Count; item++)
            {
                AddBus_stu(dt.Rows[item][0].ToString());
                AddBus_gongling(dt.Rows[item][0].ToString());
                AddBus_xingji(dt.Rows[item][0].ToString());
                AddBus_yhcy(dt.Rows[item][0].ToString());
                AddBus_zcl(dt.Rows[item][0].ToString());
            }

        }
        /// <summary>
        /// 基础数据学历申请,数据库增加
        /// </summary>
        /// <param name="appuserid"></param>
        /// <param name="userid"></param>
        public static int AddBus_stu(string userid)
        {
            List<string> listedu = Computer.getEduScore(userid);
            List<string> listzcl = Computer.getZhichengLeiScore(userid);
            DateTime date = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            string sqlitem = "  select * from [Integrating].[dbo].[businessSet] where itemtype='0' and userId=" + userid;
            DataTable table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlitem, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count == 0)
            {
                string sqlstr = " insert into [Integrating].[dbo].[businessSet] values (@userid,@datetime,@type,@score,@soce_item,@state,@updatetime,@userid,@beizhu,@isused,@unscore,@jfitemid,@itemtype)";
                //学历申请
                SqlHelper.ExecteNonQuery(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@app_use",userid),
                new System.Data.SqlClient.SqlParameter("@datetime",date),
                new System.Data.SqlClient.SqlParameter("@type",""),
                new System.Data.SqlClient.SqlParameter("@score",listedu[1]==""?"0":listedu[1]),
                new System.Data.SqlClient.SqlParameter("@soce_item",listedu[2]==""?"学历水平提升，本科学历第一学历积分100分/人...":listedu[2]),
                new System.Data.SqlClient.SqlParameter("@state","发起申请"),
                new System.Data.SqlClient.SqlParameter("@updatetime",date),
                new System.Data.SqlClient.SqlParameter("@userid",userid),
                new System.Data.SqlClient.SqlParameter("@beizhu",listedu[2]==""?"请检查并更新HR数据库信息":""),
                new System.Data.SqlClient.SqlParameter("@isused","true"),
                new System.Data.SqlClient.SqlParameter("@unscore","0"),
                new System.Data.SqlClient.SqlParameter("@jfitemid",listedu[3]),
                new System.Data.SqlClient.SqlParameter("@itemtype","0")
                 });
                return 0;
            }
            else
            {
                return 1;
            }
        }
        /// <summary>
        /// 基础类工龄增加
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static int AddBus_gongling(string userid)
        {
            List<string> listgl = Computer.getGongLingScore(userid);
            DateTime date = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            string sqlitem = "select * from [Integrating].[dbo].[businessSet] where itemtype='3' and userId=" + userid;
            DataTable table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlitem, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count == 0)
            {
                string sqlstr = " insert into [Integrating].[dbo].[businessSet] values (@userid,@datetime,@type,@score,@soce_item,@state,@updatetime,@userid,@beizhu,@isused,@unscore,@jfitemid,@itemtype)";
                //工龄申请
                SqlHelper.ExecteNonQuery(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@app_use",userid),
                new System.Data.SqlClient.SqlParameter("@datetime",date),
                new System.Data.SqlClient.SqlParameter("@type",""),
                new System.Data.SqlClient.SqlParameter("@score",listgl[1]==""?"0":listgl[1]),
                new System.Data.SqlClient.SqlParameter("@soce_item",listgl[2]==""?"按员工参加信用社（本行）工作年限累计（评价年份-参加工作年份+1）,20分/年":listgl[2]),
                new System.Data.SqlClient.SqlParameter("@state","发起申请"),
                new System.Data.SqlClient.SqlParameter("@updatetime",date),
                new System.Data.SqlClient.SqlParameter("@userid",userid),
                new System.Data.SqlClient.SqlParameter("@beizhu",listgl[2]==""?"请检查并更新HR数据库信息":""),
                new System.Data.SqlClient.SqlParameter("@isused","true"),
                new System.Data.SqlClient.SqlParameter("@unscore","0"),
                new System.Data.SqlClient.SqlParameter("@jfitemid",listgl[3]),
                new System.Data.SqlClient.SqlParameter("@itemtype","3")
                 });
                return 0;
            }
            else
            {
                return 1;
            }
        }
        /// <summary>
        /// 基础类星级申请
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static int AddBus_xingji(string userid)
        {
            List<string> listxj = Computer.getXingJiScore(userid);
            DateTime date = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            string sqlitem = "  select * from [Integrating].[dbo].[businessSet] where itemtype='4' and userId=" + userid;
            DataTable table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlitem, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count == 0)
            {
                string sqlstr = " insert into [Integrating].[dbo].[businessSet] values (@userid,@datetime,@type,@score,@soce_item,@state,@updatetime,@userid,@beizhu,@isused,@unscore,@jfitemid,@itemtype)";
                //星级申请
                SqlHelper.ExecteNonQuery(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@app_use",userid),
                new System.Data.SqlClient.SqlParameter("@datetime",date),
                new System.Data.SqlClient.SqlParameter("@type",""),
                new System.Data.SqlClient.SqlParameter("@score",listxj[1]==""?"0":listxj[1]),
                new System.Data.SqlClient.SqlParameter("@soce_item",listxj[2]==""?"员工星级提升,达到二星级,100分/人（补足或扣减差分）...":listxj[2]),
                new System.Data.SqlClient.SqlParameter("@state","发起申请"),
                new System.Data.SqlClient.SqlParameter("@updatetime",date),
                new System.Data.SqlClient.SqlParameter("@userid",userid),
                new System.Data.SqlClient.SqlParameter("@beizhu",listxj[2]==""?"请检查并更新HR数据库信息":""),
                new System.Data.SqlClient.SqlParameter("@isused","true"),
                new System.Data.SqlClient.SqlParameter("@unscore","0"),
                new System.Data.SqlClient.SqlParameter("@jfitemid",listxj[3]),
                new System.Data.SqlClient.SqlParameter("@itemtype","4")
                 });
                return 0;
            }
            else
            {
                return 1;

            }
        }
        /// <summary>
        /// 基础类银行从业资格申请
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static int AddBus_yhcy(string userid)
        {
            List<string> listyhcy = Computer.getYinHangCongYeScore(userid);
            DateTime date = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            string sqlitem = "  select * from [Integrating].[dbo].[businessSet] where itemtype='1' and userId=" + userid;
            DataTable table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlitem, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count == 0)
            {
                string sqlstr = " insert into [Integrating].[dbo].[businessSet] values (@userid,@datetime,@type,@score,@soce_item,@state,@updatetime,@userid,@beizhu,@isused,@unscore,@jfitemid,@itemtype)";
                //银行从业申请
                SqlHelper.ExecteNonQuery(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@app_use",userid),
                new System.Data.SqlClient.SqlParameter("@datetime",date),
                new System.Data.SqlClient.SqlParameter("@type",""),
                new System.Data.SqlClient.SqlParameter("@score",listyhcy[1]==""?"0":listyhcy[1]),
                new System.Data.SqlClient.SqlParameter("@soce_item",listyhcy[2]==""?"获得银行业从业资格证书,100分/门...":listyhcy[2]),
                new System.Data.SqlClient.SqlParameter("@state","发起申请"),
                new System.Data.SqlClient.SqlParameter("@updatetime",date),
                new System.Data.SqlClient.SqlParameter("@userid",userid),
                new System.Data.SqlClient.SqlParameter("@beizhu",listyhcy[2]==""?"请检查并更新HR数据库信息":""),
                new System.Data.SqlClient.SqlParameter("@isused","true"),
                new System.Data.SqlClient.SqlParameter("@unscore","0"),
                new System.Data.SqlClient.SqlParameter("@jfitemid",listyhcy[3]),
                new System.Data.SqlClient.SqlParameter("@itemtype","1")
                 });
                return 0;
            }
            else
            {
                return 1;
            }
        }
        /// <summary>
        /// 基础类职称类申请
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static int AddBus_zcl(string userid)
        {
            List<string> listzcl = Computer.getZhichengLeiScore(userid);
            DateTime date = Convert.ToDateTime(DateTime.Now.ToShortDateString());
            string sqlitem = "  select * from [Integrating].[dbo].[businessSet] where itemtype='2' and userId=" + userid;
            DataTable table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlitem, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (table.Rows.Count == 0)
            {
                string sqlstr = " insert into [Integrating].[dbo].[businessSet] values (@userid,@datetime,@type,@score,@soce_item,@state,@updatetime,@userid,@beizhu,@isused,@unscore,@jfitemid,@itemtype)";
                //职称类申请
                SqlHelper.ExecteNonQuery(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@app_use",userid),
                new System.Data.SqlClient.SqlParameter("@datetime",date),
                new System.Data.SqlClient.SqlParameter("@type",""),
                new System.Data.SqlClient.SqlParameter("@score",listzcl[1]==""?"0":listzcl[1]),
                new System.Data.SqlClient.SqlParameter("@soce_item",listzcl[2]==""?"职称水平提升,获得初级职称类证书（金融相关专业职称）,取得初级会计和金融职称：200分/人/类...":listzcl[2]),
                new System.Data.SqlClient.SqlParameter("@state","发起申请"),
                new System.Data.SqlClient.SqlParameter("@updatetime",date),
                new System.Data.SqlClient.SqlParameter("@userid",userid),
                new System.Data.SqlClient.SqlParameter("@beizhu",listzcl[2]==""?"请检查并更新HR数据库信息":""),
                new System.Data.SqlClient.SqlParameter("@isused","true"),
                new System.Data.SqlClient.SqlParameter("@unscore","0"),
                new System.Data.SqlClient.SqlParameter("@jfitemid",listzcl[3]),
                new System.Data.SqlClient.SqlParameter("@itemtype","2")
                 });
                return 0;
            }
            else
            {
                return 1;
            }
        }
        /// <summary>
        /// 增加考勤积分
        /// </summary>
        /// <returns></returns>
        public static int AddAllUserKaoqin()
        {
            List<string[]> list= Helper.Computer.getKaoQinScore();
            DateTime date = Convert.ToDateTime(DateTime.Now.AddDays(-1).ToShortDateString());
            for (int i = 0; i < list.Count; i++)
            {
                string sqlstr = " insert into [Integrating].[dbo].[businessSet] values (@userid,@datetime,@type,@score,@soce_item,@state,@updatetime,@userid,@beizhu,@isused,@unscore,@jfitemid,@itemtype)";
                SqlHelper.ExecteNonQuery(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@app_use",list[i][0]),
                new System.Data.SqlClient.SqlParameter("@datetime",date),
                new System.Data.SqlClient.SqlParameter("@type",""),
                new System.Data.SqlClient.SqlParameter("@score",list[i][1]),
                new System.Data.SqlClient.SqlParameter("@soce_item","按出勤天数计算（4次打卡/天标准计算天数，特殊部门按1天应打卡次数计算天数）"),
                new System.Data.SqlClient.SqlParameter("@state","发起申请"),
                new System.Data.SqlClient.SqlParameter("@updatetime",date),
                new System.Data.SqlClient.SqlParameter("@userid",list[i][0]),
                new System.Data.SqlClient.SqlParameter("@beizhu","由系统定期执行"),
                new System.Data.SqlClient.SqlParameter("@isused","true"),
                new System.Data.SqlClient.SqlParameter("@unscore","0"),
                new System.Data.SqlClient.SqlParameter("@jfitemid","050201"),
                new System.Data.SqlClient.SqlParameter("@itemtype","6")
            });
                }
            return 0;
        }
        /// <summary>
        /// 按照从高到低的顺序对所有用户的积分进行汇总排名
        /// </summary>
        /// <returns></returns>
        public static DataTable RankbyAllUserid()
        {
            DataTable table = new DataTable();
            //按照从高到低的顺序对所有用户的积分进行汇总排名
            string sqlstr = "select userid,SUM(convert(int,score)) as scoresum,COUNT(*) as itemcount from  [Integrating].[dbo].[businessSet] group  by userid order by scoresum desc";
            table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            return table;
        }
        public static DataTable RankbyUserid(string userid)
        {
            DataTable table = new DataTable();
            //按照从高到低的顺序对所有用户的积分进行汇总排名
            string sqlstr = "select SUM(convert(int,score)) as scoresum,COUNT(*) as count from  [Integrating].[dbo].[businessSet] where userId = @userid";
            table = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] {
                new System.Data.SqlClient.SqlParameter("@userid",userid)
            })[0];
            return table;
        }
    }
}