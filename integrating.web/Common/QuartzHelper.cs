using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace integrating.web.Common
{
    public class QuartzHelper
    {
        /// <summary>
        /// 时间间隔执行任务
        /// </summary>
        /// <typeparam name="T">任务类，必须实现IJob接口</typeparam>
        /// <param name="seconds">时间间隔(单位：毫秒)</param>
        public static void ExecuteInterval<MyJob>(int seconds) where MyJob : IJob
        {
            ISchedulerFactory factory = new StdSchedulerFactory();
            IScheduler scheduler = (IScheduler)factory.GetScheduler();

            //IJobDetail job = JobBuilder.Create<T>().WithIdentity("job1", "group1").Build();
            IJobDetail job = JobBuilder.Create<MyJob>().Build();

            ITrigger trigger = TriggerBuilder.Create()
                .StartNow()
                .WithSimpleSchedule(x => x.WithIntervalInSeconds(seconds).RepeatForever())
                .Build();

            scheduler.ScheduleJob(job, trigger);

            scheduler.Start();
        }

        /// <summary>
        /// 指定时间执行任务
        /// </summary>
        /// <typeparam name="T">任务类，必须实现IJob接口</typeparam>
        /// <param name="cronExpression">cron表达式，即指定时间点的表达式</param>
        public static void ExecuteByCron<MyJob>(string cronExpression) where MyJob : IJob
        {
            ISchedulerFactory factory = new StdSchedulerFactory();
            IScheduler scheduler = factory.GetScheduler();

            IJobDetail job = JobBuilder.Create<MyJob>().Build();

            //DateTimeOffset startTime = DateBuilder.NextGivenSecondDate(DateTime.Now.AddSeconds(1), 2);
            //DateTimeOffset endTime = DateBuilder.NextGivenSecondDate(DateTime.Now.AddYears(2), 3);

            ICronTrigger trigger = (ICronTrigger)TriggerBuilder.Create()
                //.StartAt(startTime).EndAt(endTime)
                .WithCronSchedule(cronExpression)
                .Build();

            scheduler.ScheduleJob(job, trigger);

            scheduler.Start();

            //Thread.Sleep(TimeSpan.FromDays(2));
            //scheduler.Shutdown();
        }
    }

    
    public class MyJob : IJob
    {
        public void Execute(IJobExecutionContext context)
        {
            ///给所有员工增加上日的考勤积分
            BLL.JiFenoption.AddAllUserKaoqin();
        }
    }


   
}