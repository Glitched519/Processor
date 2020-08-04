CREATE DATABASE DiscordDb;

CREATE TABLE Guilds (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    guildOwnerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    cmdPrefix VARCHAR(10) DEFAULT '$',
    modLogId VARCHAR(100)
);

CREATE TABLE GuildMutedRole (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    mutedRole VARCHAR(100)
);

CREATE TABLE GuildModLog (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    modLog VARCHAR(100)
);

CREATE TABLE GuildJoinChannel (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    joinChannel VARCHAR(100)
);

CREATE TABLE GuildLeaveChannel (
    guildId VARCHAR(100) NOT NULL PRIMARY KEY,
    leaveChannel VARCHAR(100)
);

CREATE TABLE GuildMemberExperience (
    guildId VARCHAR(100) NOT NULL,
    memberId VARCHAR(100) NOT NULL,
    currentLevel SMALLINT NOT NULL DEFAULT 1,
    experiencePoints INT NOT NULL DEFAULT 1,
    PRIMARY KEY(guildId, memberId)
);