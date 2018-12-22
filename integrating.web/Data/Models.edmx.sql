
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 12/13/2018 09:10:59
-- Generated from EDMX file: C:\Users\Administrator\source\repos\integrating.web\integrating.web\Data\Models.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Integrating];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------


-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[__MigrationHistory]', 'U') IS NOT NULL
    DROP TABLE [dbo].[__MigrationHistory];
GO
IF OBJECT_ID(N'[dbo].[Admins]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Admins];
GO
IF OBJECT_ID(N'[dbo].[ArticleSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ArticleSet];
GO
IF OBJECT_ID(N'[dbo].[auditSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[auditSet];
GO
IF OBJECT_ID(N'[dbo].[businessSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[businessSet];
GO
IF OBJECT_ID(N'[dbo].[ButtonSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[ButtonSet];
GO
IF OBJECT_ID(N'[dbo].[Day_statisticsSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Day_statisticsSet];
GO
IF OBJECT_ID(N'[dbo].[DD_DeptSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[DD_DeptSet];
GO
IF OBJECT_ID(N'[dbo].[DD_UserSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[DD_UserSet];
GO
IF OBJECT_ID(N'[dbo].[dic_dateSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[dic_dateSet];
GO
IF OBJECT_ID(N'[dbo].[IntegratingSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[IntegratingSet];
GO
IF OBJECT_ID(N'[dbo].[JFitem]', 'U') IS NOT NULL
    DROP TABLE [dbo].[JFitem];
GO
IF OBJECT_ID(N'[dbo].[MenuSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[MenuSet];
GO
IF OBJECT_ID(N'[dbo].[RoleSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[RoleSet];
GO
IF OBJECT_ID(N'[dbo].[UsersSet]', 'U') IS NOT NULL
    DROP TABLE [dbo].[UsersSet];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Admins'
CREATE TABLE [dbo].[Admins] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(50)  NOT NULL,
    [Pwd] nvarchar(50)  NOT NULL,
    [AddTime] datetime  NOT NULL,
    [EditTime] datetime  NOT NULL,
    [State] bit  NOT NULL
);
GO

-- Creating table 'ArticleSet'
CREATE TABLE [dbo].[ArticleSet] (
    [ID] int IDENTITY(1,1) NOT NULL,
    [Title] nvarchar(max)  NOT NULL,
    [Content] nvarchar(max)  NOT NULL,
    [AddTime] datetime  NOT NULL
);
GO

-- Creating table 'MenuSet'
CREATE TABLE [dbo].[MenuSet] (
    [Menu_Id] int IDENTITY(1,1) NOT NULL,
    [Menu_Name] nvarchar(max)  NOT NULL,
    [Menu_Link] nvarchar(max)  NOT NULL,
    [Menu_Addtime] datetime  NOT NULL
);
GO

-- Creating table 'ButtonSet'
CREATE TABLE [dbo].[ButtonSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(max)  NOT NULL,
    [Link] nvarchar(max)  NOT NULL,
    [Menu_Id] nvarchar(max)  NOT NULL,
    [Addtime] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'RoleSet'
CREATE TABLE [dbo].[RoleSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [name] nvarchar(max)  NOT NULL,
    [Addtime] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'UsersSet'
CREATE TABLE [dbo].[UsersSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Name] nvarchar(100)  NOT NULL,
    [RoleId] nvarchar(100)  NULL,
    [RoleName] nvarchar(100)  NULL,
    [Sex] nvarchar(100)  NULL,
    [Userid] nvarchar(100)  NOT NULL,
    [IsDDadmin] nvarchar(100)  NOT NULL,
    [IsLeader] nvarchar(100)  NOT NULL,
    [IsJFadmin] nvarchar(100)  NULL,
    [dep_id] nvarchar(100)  NOT NULL,
    [position] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'DD_DeptSet'
CREATE TABLE [dbo].[DD_DeptSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Parent_ID] nvarchar(max)  NOT NULL,
    [Name] nvarchar(100)  NOT NULL,
    [Dep_ID] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'DD_UserSet'
CREATE TABLE [dbo].[DD_UserSet] (
    [userid] nvarchar(100)  NOT NULL,
    [unionid] nvarchar(100)  NOT NULL,
    [order] nvarchar(100)  NOT NULL,
    [isAdmin] nvarchar(max)  NOT NULL,
    [isBoss] nvarchar(max)  NOT NULL,
    [isHide] nvarchar(max)  NOT NULL,
    [isLeader] nvarchar(max)  NOT NULL,
    [name] nvarchar(max)  NOT NULL,
    [active] nvarchar(max)  NOT NULL,
    [deptID] nvarchar(max)  NOT NULL,
    [position] nvarchar(max)  NOT NULL,
    [avatar] nvarchar(max)  NOT NULL,
    [jobnumber] nvarchar(max)  NOT NULL,
    [id_prikey1] int IDENTITY(1,1) NOT NULL
);
GO

-- Creating table 'businessSet'
CREATE TABLE [dbo].[businessSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [app_User] nvarchar(100)  NOT NULL,
    [app_datetime] datetime  NOT NULL,
    [type] nvarchar(100)  NOT NULL,
    [score] nvarchar(100)  NOT NULL,
    [score_item] nvarchar(100)  NOT NULL,
    [state] nvarchar(100)  NOT NULL,
    [updatetime] datetime  NOT NULL,
    [userId] nvarchar(100)  NOT NULL,
    [beizhu] nvarchar(1000)  NULL,
    [isUsed] bit  NOT NULL,
    [unscore] nchar(100)  NOT NULL
);
GO

-- Creating table 'auditSet'
CREATE TABLE [dbo].[auditSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [business_id] nvarchar(max)  NOT NULL,
    [audit_user] nvarchar(max)  NOT NULL,
    [audit_datetime] nvarchar(max)  NOT NULL,
    [audit_opinion] nvarchar(max)  NOT NULL,
    [audit_type] nvarchar(max)  NOT NULL,
    [date] datetime  NOT NULL
);
GO

-- Creating table 'dic_dateSet'
CREATE TABLE [dbo].[dic_dateSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [date] nvarchar(max)  NOT NULL,
    [date_coding] nvarchar(max)  NOT NULL,
    [date_des] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'Day_statisticsSet'
CREATE TABLE [dbo].[Day_statisticsSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [User_ID] nvarchar(max)  NOT NULL,
    [Dep_ID] nvarchar(max)  NOT NULL,
    [Day_score] nvarchar(max)  NOT NULL,
    [sta_date] nvarchar(max)  NOT NULL
);
GO

-- Creating table 'IntegratingSet'
CREATE TABLE [dbo].[IntegratingSet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [P_Id] int  NOT NULL
);
GO

-- Creating table 'C__MigrationHistory'
CREATE TABLE [dbo].[C__MigrationHistory] (
    [MigrationId] nvarchar(150)  NOT NULL,
    [ContextKey] nvarchar(300)  NOT NULL,
    [Model] varbinary(max)  NOT NULL,
    [ProductVersion] nvarchar(32)  NOT NULL
);
GO

-- Creating table 'JFitem'
CREATE TABLE [dbo].[JFitem] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [JF_serial] nvarchar(100)  NOT NULL,
    [JF_name] nvarchar(100)  NOT NULL,
    [score] nvarchar(100)  NOT NULL,
    [desp] nvarchar(100)  NOT NULL,
    [par_Id] nvarchar(100)  NOT NULL,
    [unscore] nvarchar(100)  NULL,
    [ismul] nchar(100)  NULL,
    [exitmultp] nvarchar(100)  NULL
);
GO

-- Creating table 'BussHistorySet'
CREATE TABLE [dbo].[BussHistorySet] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [app_user] nvarchar(max)  NOT NULL,
    [userid] nvarchar(max)  NOT NULL,
    [app_date] datetime  NOT NULL,
    [bus_type] nvarchar(max)  NOT NULL,
    [score] nvarchar(max)  NOT NULL,
    [unscore] nvarchar(max)  NOT NULL,
    [busitem] nvarchar(max)  NOT NULL,
    [state] nvarchar(max)  NOT NULL,
    [update_date] datetime  NOT NULL,
    [isused] tinyint  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [ID] in table 'Admins'
ALTER TABLE [dbo].[Admins]
ADD CONSTRAINT [PK_Admins]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [ID] in table 'ArticleSet'
ALTER TABLE [dbo].[ArticleSet]
ADD CONSTRAINT [PK_ArticleSet]
    PRIMARY KEY CLUSTERED ([ID] ASC);
GO

-- Creating primary key on [Menu_Id] in table 'MenuSet'
ALTER TABLE [dbo].[MenuSet]
ADD CONSTRAINT [PK_MenuSet]
    PRIMARY KEY CLUSTERED ([Menu_Id] ASC);
GO

-- Creating primary key on [Id] in table 'ButtonSet'
ALTER TABLE [dbo].[ButtonSet]
ADD CONSTRAINT [PK_ButtonSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'RoleSet'
ALTER TABLE [dbo].[RoleSet]
ADD CONSTRAINT [PK_RoleSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'UsersSet'
ALTER TABLE [dbo].[UsersSet]
ADD CONSTRAINT [PK_UsersSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'DD_DeptSet'
ALTER TABLE [dbo].[DD_DeptSet]
ADD CONSTRAINT [PK_DD_DeptSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [id_prikey1] in table 'DD_UserSet'
ALTER TABLE [dbo].[DD_UserSet]
ADD CONSTRAINT [PK_DD_UserSet]
    PRIMARY KEY CLUSTERED ([id_prikey1] ASC);
GO

-- Creating primary key on [Id] in table 'businessSet'
ALTER TABLE [dbo].[businessSet]
ADD CONSTRAINT [PK_businessSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'auditSet'
ALTER TABLE [dbo].[auditSet]
ADD CONSTRAINT [PK_auditSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'dic_dateSet'
ALTER TABLE [dbo].[dic_dateSet]
ADD CONSTRAINT [PK_dic_dateSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Day_statisticsSet'
ALTER TABLE [dbo].[Day_statisticsSet]
ADD CONSTRAINT [PK_Day_statisticsSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'IntegratingSet'
ALTER TABLE [dbo].[IntegratingSet]
ADD CONSTRAINT [PK_IntegratingSet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [MigrationId], [ContextKey] in table 'C__MigrationHistory'
ALTER TABLE [dbo].[C__MigrationHistory]
ADD CONSTRAINT [PK_C__MigrationHistory]
    PRIMARY KEY CLUSTERED ([MigrationId], [ContextKey] ASC);
GO

-- Creating primary key on [Id] in table 'JFitem'
ALTER TABLE [dbo].[JFitem]
ADD CONSTRAINT [PK_JFitem]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'BussHistorySet'
ALTER TABLE [dbo].[BussHistorySet]
ADD CONSTRAINT [PK_BussHistorySet]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------