using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace integrating.web.Helper
{
    public  class Computer
    {
        /// <summary>
        /// 计算学历积分方法
        /// </summary>
        /// <param name="用户ID"></param>
        /// <returns></returns>
        public static List<string> getEduScore(string userid)
        {
            List<string> list = new List<string>();
            string eduScore = "";
            string JFitem = "";
            string JFitemid = "";
            string sqlstr = "SELECT  ZEmployee_Num,ZEmployee_Name,ZEmployee_DiYiXueLi,ZEmployee_ZhuiGaoXueLi FROM [Integrating].[dbo].[mms_ZEmployee] where ZEmployee_Num=" + userid;
                DataTable dt = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
                if (dt.Rows.Count > 0)
                {
                    if (dt.Rows[0][2].ToString().Trim() == dt.Rows[0][3].ToString().Trim())
                    {
                        switch (dt.Rows[0][3].ToString().Trim())
                        {
                            case "大专":
                                eduScore = "50";
                                JFitem = "取得大专学历（学信网可查的）,第一学历（普通全日制学历）积分50分/人";
                                JFitemid = "01010101";
                                break;
                            case "本科":
                                eduScore = "100";
                                JFitem = "取得本科学历（学信网可查的）,第一学历（普通全日制学历）积分100分/人";
                                JFitemid = "01010201";
                                break;
                            case "研究生":
                                eduScore = "200";
                                JFitem = "取得硕士研究生学历（学信网可查的）,第一学历（普通全日制学历）积分200分/人";
                                JFitemid = "01010301";
                                break;
                            case "硕士":
                                eduScore = "200";
                                JFitem = "取得硕士研究生学历（学信网可查的）,第一学历（普通全日制学历）积分200分/人";
                                JFitemid = "01010301";
                                break;
                            case "博士":
                                eduScore = "400";
                                JFitem = "取得博士研究生学历（学信网可查的）,第一学历（普通全日制学历）积分400分/人";
                                JFitemid = "01010401";
                                break;
                            default:
                                eduScore = "0";
                                JFitem = "";
                                JFitemid = "";
                                break;

                        }
                    }
                    else
                    {
                        switch (dt.Rows[0][3].ToString().Trim())
                        {
                            case "大专":
                                eduScore = "25";
                                JFitem = "取得大专学历（学信网可查的）,第二学历（在工作期间取得本级学历）积分25分/人";
                                JFitemid = "01010102";
                                break;
                            case "本科":
                                eduScore = "50";
                                JFitem = "取得大专学历（学信网可查的）,第二学历（在工作期间取得本级学历）积分50分/人";
                                JFitemid = "01010202";
                                break;
                            case "研究生":
                                eduScore = "100";
                                JFitem = "取得硕士研究生学历（学信网可查的）,第二学历（在工作期间取得本级学历）积分100分/人";
                                JFitemid = "01010302";
                                break;
                            case "硕士":
                                eduScore = "100";
                                JFitem = "取得硕士研究生学历（学信网可查的）,第二学历（在工作期间取得本级学历）积分100分/人";
                                JFitemid = "01010302";
                                break;
                            case "博士":
                                eduScore = "200";
                                JFitem = "取得博士研究生学历（学信网可查的）,第二学历（在工作期间取得本级学历）积分100分/人";
                                break;
                            default:
                                eduScore = "0";
                                JFitem = "";
                                JFitemid = "01010402";
                                break;

                        }
                    }
                }
                else
                {
                    eduScore = "0";
                    JFitem = "";
                    JFitemid = "0101";
                }
                list.Add(userid);
                list.Add(eduScore);
                list.Add(JFitem);
                list.Add(JFitemid);
                return list;
            }

        /// <summary>
        /// 职称加分项计算,银行从业资格
        /// </summary>
        /// <param name="用户ID"></param>
        /// <returns></returns>
        public static List<string> getYinHangCongYeScore(string userid)
        {
            List<string> list = new List<string>();
            string[] str = { };
            string JFitem = "";
            string yhcyScore = "";
            string JFitemid = "";
            string sqlstr = "select  [ZEmployee_Num],[ZEmployee_Name],[ZEmployee_YingHangCongYeZiGeZhengKeMu] from[Integrating].[dbo].[mms_ZEmployee] where len(ZEmployee_YingHangCongYeZiGeZhengKeMu)> 2  and ZEmployee_Num="+userid;
            DataTable dt = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (dt.Rows.Count > 0)
            {
                str = dt.Rows[0][2].ToString().Trim().Split('、');
                yhcyScore = (str.Length * 100).ToString();
                JFitem = "获得银行业从业资格证书,100分/门";
                JFitemid = "010201";
            }
            else {
                yhcyScore = "0";
                JFitem = "";
                JFitemid = "010201";
            }
            list.Add(userid);
            list.Add(yhcyScore);
            list.Add(JFitem);
            list.Add(JFitemid);
            return list;
        }
        /// <summary>
        /// 计算职称水平提升得分
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static List<string> getZhichengLeiScore(string userid)
        {
            List<string> list = new List<string>();
            string zclscore = "";
            string JFitem = "";
            string JFitemid = "";
            string sqlstr = " select  [ZEmployee_Num],[ZEmployee_Name],[ZEmployee_LiCaiGuiHuaShi] from[Integrating].[dbo].[mms_ZEmployee] where len(ZEmployee_LiCaiGuiHuaShi)> 1 and ZEmployee_Num=" + userid;
            DataTable dt = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (dt.Rows.Count > 0)
            {
                switch (dt.Rows[0][2].ToString().Trim())
                {
                    case "初级":
                        zclscore = "200";
                        JFitem = "获得初级职称类证书（金融相关专业职称）,取得初级会计和金融职称：200分/人/类";
                        JFitemid = "01020201";
                        break;
                    case "中级":
                        zclscore = "400";
                        JFitem = "获得中级职称类证书（金融相关专业职称）,取得中级会计和金融职称：400分/人/类";
                        JFitemid = "01020301";
                        break;
                    case "高级":
                        zclscore = "600";
                        JFitem = "获得高级职称或注册类证书（金融相关专业职称）,取得高级会计和金融职称：600分/人/类";
                        JFitemid = "01020401";
                        break;
                    default:
                        zclscore = "0";
                        JFitem = "";
                        JFitemid = "0102";
                        break;
                }
            }
            else {
                zclscore = "";
                JFitem = "";
                JFitemid = "0102";
            }
            list.Add(userid);
            list.Add(zclscore);
            list.Add(JFitem);
            list.Add(JFitemid);
            return list;
        }
        /// <summary>
        /// 计算工龄积分
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static List<string> getGongLingScore(string userid)
        {
            List<string> list = new List<string>();
            string gonglingscore = "";
            string JFitem = "";
            string Jiondanwei = "";
            string JFitemid = "";
            DateTime nowdate = DateTime.Parse(System.DateTime.Now.Date.ToShortDateString());
            string sqlstr = " select  [ZEmployee_Num],[ZEmployee_Name],[ZEmployee_JoinBankDate] from[Integrating].[dbo].[mms_ZEmployee] where  ZEmployee_Num=" + userid+ " and [ZEmployee_JoinBankDate] is not null";
            DataTable dt = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (dt.Rows.Count > 0)
            {
                Jiondanwei = dt.Rows[0][2].ToString().Trim();
                if(Jiondanwei==""||Jiondanwei==null)
                {
                    Jiondanwei = "2018-1-1";
                }
                int i = nowdate.Year;
                int j = (DateTime.Parse(Jiondanwei)).Year;
                if ((i - j) > 0)
                {
                    gonglingscore = ((i - j + 1) * 20).ToString();
                    JFitem = "按员工参加信用社（本行）工作年限累计（评价年份-参加工作年份+1）,20分/年，逐年积分";
                    JFitemid = "010301";
                }
                else
                {
                    gonglingscore = (1 * 20).ToString();
                    JFitem = "按员工参加信用社（本行）工作年限累计（评价年份-参加工作年份+1）,20分/年，逐年积分";
                    JFitemid = "010301";
                }
            }
            else {
                gonglingscore = (1 * 20).ToString();
                JFitem = "按员工参加信用社（本行）工作年限累计（评价年份-参加工作年份+1）,20分/年，逐年积分";
                JFitemid = "010301";
                //提示补充人事系统信息。
            }
            list.Add(userid);
            list.Add(gonglingscore);
            list.Add(JFitem);
            list.Add(JFitemid);
            return list;
        }
        /// <summary>
        /// 计算星级柜员得分
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static List<string> getXingJiScore(string userid)
        {
            List<string> list = new List<string>();
            string xingjiscoe = "";
            string JFitem = "";
            string JFitemid = "";
            string sqlstr = " select  [ZEmployee_Num],[ZEmployee_Name],[ZEmployee_GongZhuoGangWei] from[Integrating].[dbo].[mms_ZEmployee] where  [ZEmployee_GongZhuoGangWei] is not null and [ZEmployee_GongZhuoGangWei] like '%星级%' and ZEmployee_Num='" + userid + "'";
            DataTable dt = SqlHelper.GetTable(SqlHelper.connectionString, System.Data.CommandType.Text, sqlstr, new System.Data.SqlClient.SqlParameter[] { })[0];
            if (dt.Rows.Count > 0)
            {
                switch (dt.Rows[0][2].ToString().Trim())
                {

                    case "二星级综合柜员":
                        xingjiscoe = "100";
                        JFitem = "达到二星级，100分/人（补足或扣减差分）";
                        JFitemid = "010504";
                        break;
                    case "三星级综合柜员":
                        xingjiscoe = "300";
                        JFitem = "达到三星级，300分/人（补足或扣减差分）";
                        JFitemid = "010503";
                        break;
                    case "四星级综合柜员":
                        xingjiscoe = "500";
                        JFitem = "达到四星级，500分/人（补足或扣减差分）";
                        JFitemid = "010502";
                        break;
                    case "五星级综合柜员":
                        xingjiscoe = "700";
                        JFitem = "达到五星级，700分/人（补足或扣减差分）";
                        JFitemid = "010501";
                        break;
                    default:
                        xingjiscoe = "0";
                        JFitem = "";
                        JFitemid = "0105";
                        break;
                }
            }
            else
            {
                xingjiscoe = "0";
                JFitem = "";
                JFitemid = "0105";
                //提示修改或提交申请。
            }
            list.Add(userid);
            list.Add(xingjiscoe);
            list.Add(JFitem);
            list.Add(JFitemid);
            return list;
        }
        /// <summary>
        /// 计算全员考勤积分
        /// </summary>
        /// <returns></returns>
        public static List<string[]> getKaoQinScore()
        {
            List<string[]> listall = new List<string[]>();
            string fromdate = System.DateTime.Now.ToString("yyyy-MM-dd 06:00:00");
            string todate= System.DateTime.Now.ToString("yyyy-MM-dd 23:40:00");
            string str = "";
            List<string> list= Common.UserandDepcs.getallDDuser();
            for (int i = 0; i < list.Count; i++)
            {
                bool b = Common.KaoQin.IsDakaNormal(list[i], fromdate, todate);
                if (b == true)
                {
                     str = "50";
                     listall.Add(new string[]{ list[i].ToString(),str});
                }
                else
                {
                    bool c= Common.KaoQin.IsQingJiaNormal(list[i],fromdate,todate);
                    if (c == true)
                    {
                         str = "50";
                        listall.Add(new string[] { list[i].ToString(), str });
                    }
                    else
                    {
                        str = "0";
                        listall.Add(new string[] { list[i].ToString(), str });
                    }
                }
            }
            return listall;
        }
    }
}