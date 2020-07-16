const StateManager = require('./StateManager');

async function exists(guildId, memberId) {
    return StateManager.connection.query(
        `SELECT * FROM GuildMemberExperience WHERE guildId = ${guildId} AND memberId = ${memberId}`
    );
}

async function insertGuildMember(guildId, memberId) {
    return StateManager.connection.query(
        `INSERT INTO GuildMemberExperience VALUES (
            '${guildId}', '${memberId}', DEFAULT, DEFAULT 
        )`
    )
}

function updateGuildMemberEXP(guildId, memberId, updatedEXP, updatedLevel) {
    return StateManager.connection.query(
        `UPDATE GuildMemberExperience SET experiencePoints = ${updatedEXP}, currentLevel = ${updatedLevel} WHERE guildId = ${guildId} AND 
        memberId = ${memberId}`
    )
}

module.exports = {
    exists,
    insertGuildMember,
    updateGuildMemberEXP
}