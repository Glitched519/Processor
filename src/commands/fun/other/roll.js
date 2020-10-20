module.exports = {
    run: async (client, message, args) => {
        const rollDice = Math.floor(Math.random() * 6) + 1;
        let nums = [':one:', ':two:', ':three:', ':four:', ':five:', ':six:'];
        let diceNum = '';
        switch (rollDice) {
            case 1:
                diceNum = nums[0];
                break;
            case 2:
                diceNum = nums[1];
                break;
            case 3:
                diceNum = nums[2];
                break;
            case 4:
                diceNum = nums[3];
                break;
            case 5:
                diceNum = nums[4];
                break;
            case 6:
                diceNum = nums[5];
                break;
        }
        let rollEmbed = {
            color: `RANDOM`,
            title: ':game_die: You rolled a ' + diceNum,
            timestamp: new Date()
        }
        message.channel.send({ embed: rollEmbed });
    },
    aliases: ['dice', 'rolldice'],
    description: 'Rolls a dice from 1 to 6'
}