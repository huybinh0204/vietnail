const db = require('../service');
module.exports = {
    store_notify: (req, res) => {
        let notification_key = req.body.on_key;
        let user_id = req.body.user_id;
        if (user_id != undefined && notification_key != undefined) {
            if (user_id != "" && notification_key != "") {
                let sql = `INSERT INTO notification SET ?`;
                console.log("123", sql)
                db.query(sql, [{user_id, notification_key}], (err, rewn, response) => {
                    if (err) throw err
                    res.json({"status": "200", message: 'Notify key OK INSERT !'});
                })
            } else {
                res.json({"status": "400", message: 'Notify No INSERT !'});
            }
        } else {
            res.json({"status": "400", message: 'Notify No INSERT !'});
        }
    },
}
