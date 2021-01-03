const db = require('../service');
const moment = require('moment-timezone');
const schedule_historical_model = require('../models/Schedule_historical_model');
var is_OFFSET = 0;
var is_LIMIT = 10;
var Eis_OFFSET;
module.exports = {
    get: (req, res) => {
        // is_OFFSET = is_OFFSET + is_LIMIT;
        var sql = `SELECT * FROM schedule_historical WHERE id_User = ? ORDER BY id DESC`;
        // if (is_OFFSET <= 10){
        //     sql = `SELECT * FROM schedule_historical WHERE id_User = ? ORDER BY id DESC LIMIT ${is_LIMIT} OFFSET  0 `;
        // }else{
        //     Eis_OFFSET = is_OFFSET - is_LIMIT;
        //     sql = `SELECT * FROM schedule_historical WHERE id_User = ? ORDER BY id DESC LIMIT ${is_LIMIT} OFFSET ${Eis_OFFSET} `;
        // }
        db.query(sql, [req.params.schedule_historicalID], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrschedule_historical = {
                    [schedule_historical_model.id]: rown[i].id,
                    [schedule_historical_model.end_code_schedule]: rown[i].end_code_schedule,
                    [schedule_historical_model.content]: rown[i].content,
                    [schedule_historical_model.is_status]: rown[i].is_status,
                    [schedule_historical_model.id_User]: rown[i].id_User,
                    [schedule_historical_model.id_schedule]: rown[i].id_schedule,
                    [schedule_historical_model.created_historical]: rown[i].created_historical,

                };
                obj.push(Arrschedule_historical);
            }
            var _Arrschedule_historical = JSON.stringify(obj);
            var schedule_historicalJson = JSON.parse(_Arrschedule_historical);
            var ArrGetschedule_historical = [{"status": "200", "data": schedule_historicalJson}]
            res.json(ArrGetschedule_historical);
        })
    },

    get_list_time: (req, res) => {
        let toong = moment().tz("Asia/Ho_Chi_Minh").format();
        let get_yeur = toong.slice(0, 10);
        let get_home = toong.slice(11, 19);

        let moth = get_yeur + " " + get_home;
        var ArrGetschedule_historical = [{"status": "200", "data": moth}]
        res.json(ArrGetschedule_historical);
    },

    store: (req, res) => {
        let schedule_historicalID = req.params.schedule_historicalID;
        var id_User = req.body.id_User;
        let status = req.body.status;
        let phone_nv = req.body.phone_nv;
        let content = req.body.content;
        console.log("1222", id_User + " :" + status + ":" + content);
        if (status == 1) {
            var data = {
                id_User:id_User,
                status: 1,
            }
            let sql = 'UPDATE schedule SET ? WHERE id = ?'
            db.query(sql, [data, schedule_historicalID], (err, response) => {
                if (err) throw err
                res.json({"status": "200", "schedule": 'khách hàng huỷ đơn!'});
            })
        } else if (status == 2) {
            var data = {
                status: 2,
                id_User: id_User
            }
            let sql = 'UPDATE schedule SET ? WHERE id = ?'
            db.query(sql, [data, schedule_historicalID], (err, response) => {
                if (err) throw err
                let schedule_sql = `SELECT * FROM schedule WHERE id = ${schedule_historicalID}`
                db.query(schedule_sql, (err, rown, fields) => {
                    if (err) throw err
                    var data = {
                        end_code_schedule: rown[0].code_schedule,
                        is_status: 1,
                        id_schedule: rown[0].id,
                        id_User: id_User,
                        content: content
                    }
                    let sql = `INSERT INTO schedule_historical SET ?`;
                    db.query(sql, [data], (err, response) => {
                        if (err) throw err
                        res.json({"status": "200", "schedule": 'Nhân viên nhận đơn!'});
                    });
                })
            })
        } else if (status == 3) {
            let sql = `SELECT * FROM user WHERE id_roles = 4 and id = ${id_User}`;
            db.query(sql, (err,rown_s, response) => {
                if (err) throw err
                if(rown_s != ''){
                    var data = {
                        id_User: rown_s[0].id,
                        phone_nv:rown_s[0].phone,
                        fullName:rown_s[0].fullName,
                        status: 3,
                    }
                    let sql = 'UPDATE schedule SET ? WHERE  id = ?'
                    db.query(sql, [data, schedule_historicalID], (err, response) => {
                        if (err) throw err
                        let schedule_sql = `SELECT * FROM schedule WHERE id = ${schedule_historicalID}`
                        db.query(schedule_sql, (err, rown, fields) => {
                            if (err) throw err
                            var data = {
                                end_code_schedule: rown[0].code_schedule,
                                is_status: 2,
                                id_schedule: rown[0].id,
                                id_User: id_User,
                                content: content
                            }
                            let sql = `INSERT INTO schedule_historical SET ?`;
                            db.query(sql, [data], (err, response) => {
                                if (err) throw err
                                res.json({"status": "200", "message": 'Nhân viên huỷ đơn thành công!'});
                            });
                        })
                    })
                }else {
                    res.json({"status": "400", "message": 'Nhân viên khong huỷ đơn duoc!'});
                }

            })

        } else if (status == 4) {
            var data = {
                status: 4,
                content_schedule: content
            }
            let sql = 'UPDATE schedule SET ? WHERE id = ?'
            db.query(sql, [data, schedule_historicalID], (err, response) => {
                if (err) throw err
                res.json({"status": "200", "message": 'Đơn làm nails hoàn thành !'});
            })
        } else if (status == 5) {
            var data = {
                status: 5,
                phone_nv: phone_nv
            }
            let sql = 'UPDATE schedule SET ? WHERE id = ?'
            db.query(sql, [data, schedule_historicalID], (err, response) => {
                if (err) throw err
                res.json({"status": "200", "message": 'Đơn làm lể tân xác nhận khách hang den !'});
            })
        } else {
            res.json({"status": "403", "message": 'không có quyền với status này !'});
        }

    },

}

