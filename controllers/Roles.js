const db = require('../service');
const ruoles_model = require('../models/Roles_model');
// loại quyền
module.exports = {
    // get cac quyen khi taoj taif khaon quyen
    get: (req, res) => {
        let sql = `SELECT * FROM roles`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            res.json(rown);
        })
    },
}

