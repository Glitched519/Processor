const BASE = 5;

function generateEXP() {
    return Math.ceil(Math.random() * 25);
}

function checkExperience(experience, level) {
    const y = Math.floor((BASE * level) * (Math.pow(Math.E, level)));
    return  experience >= y ? ++level : level;
}

module.exports = { generateEXP, checkExperience }