using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace integrating.web.Common
{
    public  class DaKa
    {
        public string workDateFrom { get; set; }
        public string workDateTo { get; set; }
        public string[] userIdList { get; set; }  // 必填，与offset和limit配合使用，不传表示分页获取全员的数据
        public int offset { get; set; }  // 必填，第一次传0，如果还有多余数据，下次传之前的offset加上limit的值
        public int limit { get; set; }    // 必填，表示数据条数，最大不能超过50条
    }
    public class QingJia
    {
        public string userid { get; set; }
        public string from_date { get; set; }
        public string to_date { get; set; }
    }
    public class RecordresultItem
        {
            /// <summary>
            /// 
            /// </summary>
       public string gmtModified { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string isLegal { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string baseCheckTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string id { get; set; }
        /// <summary>
        ///
        /// </summary>
        public string userAddress { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string userId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string checkType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string timeResult { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string deviceId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string corpId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string sourceType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string workDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string planCheckTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string gmtCreate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string locationMethod { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string locationResult { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string userLongitude { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string planId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string groupId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string userAccuracy { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string userCheckTime { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string userLatitude { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string procInstId { get; set; }
        }
    public class DaKaresult
        {
            public string errmsg { get; set; }
            /// <summary>
            /// 
            /// </summary>
            public RecordresultItem recordresult { get; set; }
            /// <summary>
            /// 
            /// </summary>
            public int errcode { get; set; }
        }
    public class QingJiaRoot
    {
        /// <summary>
        /// 
        /// </summary>
        public QingJiaResult result { get; set; }
    }
    public class QingJiaResult
    {
        /// <summary>
        /// 
        /// </summary>
        public RResult result { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string ding_open_errcode { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string success { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string error_msg { get; set; }
    }
    public class RResult
    {
        /// <summary>
        /// 
        /// </summary>
        public string duration_in_minutes { get; set; }
    }

    public class KaoQin
    {
        /// <summary>
        /// 返回请假结果是否正常
        /// </summary>
        /// <param name="userid"></param>
        /// <param name="datefrom"></param>
        /// <param name="dateto"></param>
        /// <returns></returns>
        public static bool IsQingJiaNormal(string userid, string datefrom, string dateto)
        {
            string qingjiares = Getleaveapproveduration(userid, datefrom, dateto);
            QingJiaRoot qjr = new QingJiaRoot();
            QingJiaResult qj = new QingJiaResult();
            // qj = (QingJiaRoot)Helper.JsontoObj.JsonToObject(qingjiares, qjr);
            qj = Helper.JsonHelper.JSONToObject<QingJiaResult>(qingjiares);
            if (Convert.ToInt32(qj.result.duration_in_minutes) == 0)
            {
                return false;
            }
            else
            { 
                return true;
            }
        }
        /// <summary>
        /// 返回考勤打卡是否正常
        /// </summary>
        public static bool IsDakaNormal(string userid,string datefrom,string dateto)
        {
            string dakares = getDaKaRes(userid,datefrom,dateto);
            DaKaresult dks = new DaKaresult();
            DaKaresult dk = (DaKaresult)Helper.JsontoObj.JsonToObject(dakares, dks);
            RecordresultItem rcd = new RecordresultItem();
            if (dk.recordresult.timeResult == "Normal")
            {
                return true;
            }
            else {
                return false;
            }
        }
     /// <summary>
     /// 获取打卡结果
     /// </summary>
     /// <param name="userid"></param>
     /// <returns></returns>
        public static string getDaKaRes(string userid,string datefrom,string dateto)
        {
            
            string result = "";
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("https://oapi.dingtalk.com/attendance/list?access_token=" + Helper.DingHelper.GetDDToken());
            req.Method = "POST";
        //req.ContentType = "application/x-www-form-urlencoded";
              DaKa  dk = new DaKa();
            dk.workDateFrom = datefrom;
            dk.workDateTo = dateto;
            dk.userIdList = new string[] { "457208" };
            dk.offset = 0;
            dk.limit = 50;
            string strJson = JsonConvert.SerializeObject(dk);
            byte[] data = Encoding.UTF8.GetBytes(strJson);
            req.ContentLength = data.Length;
            using (Stream reqStream = req.GetRequestStream())
            {
                reqStream.Write(data, 0, data.Length);
                reqStream.Close();
            }

            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            Stream stream = resp.GetResponseStream();
            //获取响应内容
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                result = reader.ReadToEnd();
            }
            return result;
        }
        /// <summary>
        /// 获取请假时长
        /// </summary>
        /// <param name="userid"></param>
        /// <returns></returns>
        public static string Getleaveapproveduration(string userid, string datefrom, string dateto)
        {
            string result = "";
            HttpWebRequest req = (HttpWebRequest)WebRequest.Create("https://oapi.dingtalk.com/topapi/attendance/getleaveapproveduration?access_token=" + Helper.DingHelper.GetDDToken());
            req.Method = "POST";
            //req.ContentType = "application/x-www-form-urlencoded";
            QingJia qj = new QingJia();
            qj.from_date = datefrom;
            qj.to_date = dateto;
            qj.userid = "457208";
            string strJson = JsonConvert.SerializeObject(qj);
            byte[] data = Encoding.UTF8.GetBytes(strJson);
            req.ContentLength = data.Length;
            using (Stream reqStream = req.GetRequestStream())
            {
                reqStream.Write(data, 0, data.Length);
                reqStream.Close();
            }

            HttpWebResponse resp = (HttpWebResponse)req.GetResponse();
            Stream stream = resp.GetResponseStream();
            //获取响应内容
            using (StreamReader reader = new StreamReader(stream, Encoding.UTF8))
            {
                result = reader.ReadToEnd();
            }
            return result;
        }
    }
}