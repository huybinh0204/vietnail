const db = require('../service');
module.exports = {
    detail: (req, res) => {
        let sql = 'SELECT * FROM notification WHERE id_User = ?'
        db.query(sql, [req.params.idUserNotification], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrnotification = {
                    id: rown[i].id,
                    content: rown[i].content,
                    id_User: rown[i].id_User,
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
