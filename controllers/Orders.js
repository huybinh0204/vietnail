const db = require('../service');
const random_random = require("../config/OpenRoles");
const schedule_details_mode = require("../models/Order_details_model")
var moment = require('moment-timezone');
var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
module.exports = {
    get_orders: (req, res) => {
        let sql = `SELECT schedule.id,code_schedule,minus_point,moneys,start_time, schedule.fullName AS fullName_nv,phone_nv,schedule_details.working_time as fullName_kh,phone_kh ,status,content_schedule FROM schedule JOIN schedule_details ON schedule.id = schedule_details.id_Schedule where status = 4 GROUP BY schedule.id`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_schedule: rown[i].code_schedule,
                    start_time: rown[i].start_time,
                    moneys: rown[i].moneys,
                    minus_point: rown[i].minus_point,
                    phone_nv: rown[i].phone_nv,
                    status: rown[i].status,
                    fullName_nv: rown[i].fullName_nv,
                    content_schedule: rown[i].content_schedule,
                    fullName_kh: rown[i].fullName_kh,
                    phone_kh: rown[i].phone_kh,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    store_orders: (req, res) => {
        var code_order = random_random.randomString(10);
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;
        let content_order = req.body.content_order;
        let moneys = req.body.moneys;
        let user_id_kh = req.body.user_id_kh;
        let order_details_id = req.body.order_details_id;
        if (start_time != '' && end_time && content_order && moneys && user_id_kh != null || undefined) {
            let sql_kh = `SELECT * FROM user WHERE id =${user_id_kh}`;
            // console.log("222",sql_kh)
            db.query(sql_kh, (err, rows_kh, response) => {
                var data = {
                    code_order: code_order,
                    start_time: start_time,
                    end_time: end_time,
                    content_order: content_order,
                    moneys: moneys,
                    status: 0,
                    phone_kh: rows_kh[0].phone,
                    name_kh: rows_kh[0].fullname,
                    user_id_kh: user_id_kh,
                }
                // console.log("rows_kh", rows_kh)
                // console.log("222", data)
                let sql = `INSERT INTO orders SET ?`;
                db.query(sql, [data], (err, response) => {
                    if (err) throw err
                    let _sqlSELECT = `SELECT * FROM orders ORDER BY id DESC LIMIT 1`;
                    db.query(_sqlSELECT, (err, rown, fields) => {
                        if (err) throw err
                        var obj = [];
                        for (var i = 0; i < rown.length; i++) {
                            var ArrSchedule = {
                                id: rown[i].id,
                                code_order: rown[i].code_order,
                                start_time: rown[i].start_time,
                                end_time: rown[i].end_time,
                                content_order: rown[i].content_order,
                                moneys: rown[i].moneys,
                                status: rown[i].status,
                                phone_kh: rown[i].phone_kh,
                                name_kh: rown[i].name_kh,
                                user_id_kh: rown[i].user_id_kh,
                                created_order: rown[i].created_order,
                            };
                            obj.push(ArrSchedule);
                        }
                        var _ArrSchedule = JSON.stringify(obj);
                        var ScheduleJson = JSON.parse(_ArrSchedule);
                        var ArrGetSchedule = [{
                            "status": "200",
                            message: 'orders INSERT Ok!',
                            "data": ScheduleJson
                        }]
                        res.json(ArrGetSchedule);
                    })
                })
                //INSERT INTO schedule_details
                let sql_order_details = `SELECT * FROM orders WHERE code_order ="${code_order}"`;
                db.query(sql_order_details, (err, rowsl, response) => {
                    if (err) throw err
                    var orders_id = Number(rowsl.map(x => x.id).toString());
                    for (var k = 0; k < order_details_id.length; k++) {
                        var service_list_id = order_details_id[k].service_list_id;
                        var data_schedule_details = {
                            service_list_id: service_list_id,
                            orders_id: orders_id,
                        }
                        let is_sql_order_details = 'INSERT INTO order_details SET ?';
                        db.query(is_sql_order_details, [data_schedule_details], (err, rown, fields) => {
                            if (err) throw err
                            console.log("Schedule_details INSERT OK")
                        })
                    }
                })
            })
        } else {
            res.json({"status": "400", message: 'schedule No INSERT !'});
        }
    },
}
