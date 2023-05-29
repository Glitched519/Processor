const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    callback: async (client, interaction) => {
        const targetUserId = interaction.options.get('target-user').value;
        const reason = interaction.options.get('reason')?.value;

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(targetUserId);

        if (!targetUser) {
            await interaction.editReply("That user doesn't exist in this server.");
            return;
        }

        if (targetUser.id === interaction.guild.ownerId) {
            await interaction.editReply("You can't ban the server owner.");
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the command
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("You can't ban that user because they have the same or higher role than you.");
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("I can't ban that user because they have the same or higher role than me.");
        }

        // Ban the targetUser
        try {
            await targetUser.ban({ reason });
            await interaction.editReply(`${targetUser} was banned ${reason ? `for **${reason}**` : ""}`)
        } catch (error) {
            console.error(`ERROR when banning: ${error}`);
        }
    },

    name: 'ban',
    description: 'Bans a member from this server.',
    options: [
        {
            name: 'target-user',
            description: 'The user you want to ban.',
            type: ApplicationCommandOptionType.Mentionable,
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason you for the ban.',
            type: ApplicationCommandOptionType.String,
        }
    ],
    permissionsRequired: [PermissionFlagsBits.BanMembers],
    botPermissions: [PermissionFlagsBits.BanMembers],
}