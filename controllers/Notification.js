const db = require('../service');
module.exports = {
    detail: (req, res) => {
        let sql = 'SELECT * FROM notification WHERE user_id = ?'
        db.query(sql, [req.params.idUserNotification], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrnotification = {
                    id: rown[i].id,
                    content: rown[i].content,
                    user_id: rown[i].user_id,
                    receiver_name: rown[i].receiver,
                    date_notification: rown[i].date_notification,
                };
                obj.push(Arrnotification);
            }
            var _Arrnotification = JSON.stringify(obj);
            var notificationJson = JSON.parse(_Arrnotification);
            var ArrGetnotification = [{"status": "200", "data": notificationJson}]
            res.json(ArrGetnotification);
        })
    },
}
