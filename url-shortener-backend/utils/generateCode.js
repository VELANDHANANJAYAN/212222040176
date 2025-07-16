const { v4: uuidv4 } = require('uuid');
function generateCode() {
    return uuidv4().slice(0, 6);
}
module.exports = generateCode;
