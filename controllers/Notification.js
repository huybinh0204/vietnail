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
    get_notify: (req, res) => {
        let user_id = req.params.user_id
        let sql_message = `SELECT * FROM message WHERE user_id = ${user_id}`;
        db.query(sql_message,[user_id], (err, rown, response) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrNews = {
                    id: rown[i].id,
                    content: rown[i].content,
                    receiver: rown[i].receiver,
                    date_notification: rown[i].date_notification,
                };
                obj.push(ArrNews);
            }
            var _ArrNews = JSON.stringify(obj);
            var NewsJson = JSON.parse(_ArrNews);
            var ArrGetNews = [{"status": "200",message:"message ok", "data": NewsJson}]
            res.json(ArrGetNews);
        })
    },
}
