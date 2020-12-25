
let modDef = {
    idban: {
        aliases: ['hackban', 'iban', 'banid', 'idban'],
        description: 'Bans a user via __ID__'
    },
    idkick: {
        aliases: ['hackkick', 'ikick', 'kickid', 'idkick'],
        description: 'Kicks a user via __ID__'
    },
    nickname: {
        aliases: ['nick', 'name'],
        description: 'Changes the nickname of a user'
    },
    nukechannel: {
        aliases: ['nuke'],
        description: 'Nukes a channel'
    },
    permissions: {
        aliases: ['perm', 'perms'],
        description: 'Checks the permissions the bot has in the server'
    },
    purge: {
        aliases: ['clear', 'clean', 'delete', 'del'],
        description: 'Deletes a certain amount of messages'
    },
    slowmode: {
        aliases: ['slow'],
        description: 'Sets the slowmode of a channel in seconds'
    },
    topic: {
        aliases: [],
        description: 'Sets the topic for a channel'
    },
    userban: {
        aliases: ['ban', 'uban', 'banuser', 'userban'],
        description: 'Bans a user via __tag__'
    },
    userkick: {
        aliases: ['kick', 'ukick', 'kickuser', 'userkick'],
        description: 'Kicks a user via __tag__'
    },
    warn: {
        aliases: ['w'],
        description: 'Warns a user'
    }
}

let mathDef = {
    base32: {
        aliases: ['b32'],
        description: 'Converts number to base32'
    },
    base64: {
        aliases: ['b64'],
        description: 'Converts number to base64'
    },
    binary: {
        aliases: ['bin'],
        description: 'Converts number to binary'
    },
    calculate: {
        aliases: ['calc', 'c'],
        description: 'Calculates an expression'
    },
    hexadecimal: {
        aliases: ['hex', 'base16', 'b16'],
        description: 'Converts number to hexadecimal'
    },
}

let animalDef = {
    animalfact: {
        description: "Shows a random fact of the given animal",
        aliases: ['fact', 'randomfact', 'animalfact']
    },
    animalimage: {
        description: "Shows a random image of the given animal",
        aliases: ['randomimage', 'randomimg', 'animal', 'picture']
    },
}

let clashDef = {
    baselayout: {
        aliases: ['base', 'layout'],
        description: 'Loads a base layout'
    },
    clashtips: {
        aliases: ['tip', 'clashtip', 'tips', 'clashtips'],
        description: 'Shows tips based on interval given'
    },
    searchclan: {
        aliases: ['clan', 'findclan', 'clanfind'],
        description: 'Finds the clan stats via Clash of Stats'
    },
    searchplayer: {
        aliases: ['player', 'findplayer', 'playerfind'],
        description: 'Finds the player stats via Clash of Stats'
    },
}

let cuteDef = {
    hug: {
        description: 'Hugs a member'
    },
    pat: {
        description: 'Pats a member'
    },
    wink: {
        description: 'Winks a member'
    },
}

let infoDef = {
    author: {
        aliases: ['creator', 'dev', 'developer'],
        description: 'Shows the creator of this awesome bot'
    },
    avatar: {
        aliases: ['pic', 'pfp', 'av'],
        description: 'Shows the user profile pic'
    },
    covid19: {
        aliases: ['covid', 'cov'],
        description: 'Shows covid stats of world or a specific country'
    },
    definition: {
        aliases: ['def', 'define'],
        description: 'Shows the definition of a word'
    },
    giphygif: {
        aliases: ['gif', 'giphy'],
        description: 'Shows a random GIF with given search item'
    },
    github: {
        aliases: ['code', 'source'],
        description: 'Brings up the GitHub repo of Processor'
    },
    googleimage: {
        aliases: ['image', 'img'],
        description: 'Shows an image from google'
    },
    invite: {
        aliases: ['botinvite'],
        description: 'Gives the bot\'s invite link'
    },
    lyrics: {
        aliases: ['lyric'],
        description: 'Shows the name and a link to the song lyrics'
    },
    phone: {
        description: 'Looks up the specs of a phone',
    },
    ping: {
        aliases: ['alive'],
        description: 'Shows the ping'
    },
    pokemon: {
        aliases: ['poke'],
        description: 'Looks up the stats of a pokemon'
    },
    poll: {
        description: 'Sends a poll with two options to react to'
    },
    stats: {
        description: 'Shows the stats of the server or a member'
    },
    support: {
        description: 'Gives the bot\'s invite link'
    },
    vote: {
        description: 'Brings up the vote link of Processor'
    },
    weather: {
        description: 'Finds weather in an area'
    },
}

let otherDef = {
    chucknorrisjoke: {
        aliases: ['chuck', 'chuckjoke', 'norrisjoke', 'cjoke'],
        description: 'Shows a random Chuck Norris joke'
    },
    comment: {
        description: 'Generates a fake YouTube comment'
    },
    dadjoke: {
        aliases: ['dad', 'djoke'],
        description: 'Shows a random dad joke'
    },
    echo: {
        aliases: ['say'],
        description: 'Makes the bot say something'
    },
    eval: {
        aliases: ['e'],
        description: 'Calculates an expression'
    },
    hack: {
        description: 'Hacks a user (not really)'
    },
    joke: {
        description: 'Shows a random joke'
    },
    meme: {
        aliases: ['haha', 'funny', 'lol'],
        description: 'Shows a random meme'
    },
    quote: {
        description: 'Shows a random quote'
    },
    roll: {
        aliases: ['dice', 'rolldice'],
        description: 'Rolls a dice from 1 to 6'
    },
    suggest: {
        description: 'Sends a suggestion with two options to react to'
    },
    wikipedia: {
        aliases: ['wiki'],
        description: 'Loads a Wikipedia page of the given topic'
    },
}

module.exports = {
    modDef,
    mathDef,
    animalDef,
    clashDef,
    cuteDef,
    infoDef,
    otherDef
};
