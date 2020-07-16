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

CREATE TABLE GuildMemberExperience (
    guildId VARCHAR(100) NOT NULL,
    memberId VARCHAR(100) NOT NULL,
    currentLevel SMALLINT NOT NULL DEFAULT 1,
    experiencePoints INT NOT NULL DEFAULT 1,
    PRIMARY KEY(guildId, memberId)
);