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
                        var nails_service_id = order_details_id[k].nails_service_id;
                        var moneys_od = order_details_id[k].moneys_od;
                        var data_schedule_details = {
                            nails_service_id: nails_service_id,
                            orders_id: orders_id,
                            moneys_od: moneys_od,
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
    //sét thời gian làm nails
    open_settime_order: (req, res, next) => {
        var derts = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
            "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
            "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
        let start_time = "2021-01-06%"
        // nhaan vieen ddi lamf
        let sql = `SELECT * FROM user WHERE id NOT IN (SELECT user_id_nv FROM day_off WHERE day_off.end_date >= '${start_time}' and day_off.begin_date <= '${start_time}') and roles_id = 2 and is_active =0`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            // hoas don khach hang tao
            let sql_orders = `SELECT * FROM orders WHERE start_time LIKE '${start_time}' and status = 0`;
            db.query(sql_orders, (err, rowns, fields) => {
                if (err) throw err
                for (var m = 0; m < rown.length; m++) {
                    var user_id_nv = rown[m].id;
                    console.log("user_id_nv", user_id_nv)
                    // khung gio nhaan vieen lamf
                    let sql_order_staffs = `SELECT * FROM order_staffs JOIN orders ON orders.id = order_staffs.orders_id WHERE start_time LIKE '${start_time}' and user_id_nv =${user_id_nv}`;
                    db.query(sql_order_staffs, (err, rownl, fields) => {
                        if (err) throw err
                        if (rown && rowns && rownl != '') {
                            for (var i = 0; i < derts.length; i++) {
                                var x = derts[i];
                                for (var k = 0; k < rownl.length; k++) {
                                    var start_time = rownl[k].start_time.toString();
                                    var end_time = rownl[k].end_time.toString();
                                    var a = start_time.slice(16, 21);
                                    var b = end_time.slice(16, 21);
                                    if (x >= a && x <= b) {
                                        ArrSchedule = {
                                            working_time: x,
                                            user_id_nv: rownl[k].user_id_nv
                                        };
                                        for (var n=0 ; n < rowns.length ; n++){
                                            console.log()
                                            var status = rowns[k].status;
                                            var rowns_start_time = rowns[n].start_time.toString();
                                            var rowns_end_time = rowns[n].end_time.toString();
                                            var is_rowns_start_time = rowns_start_time.slice(16, 21);
                                            var is_rowns_end_time = rowns_end_time.slice(16, 21);
                                            if (x >= is_rowns_start_time && x <= is_rowns_end_time) {
                                                is_ArrSchedule = {
                                                    working_time: x,
                                                    status: status,
                                                    user_id_nv: rowns[n].user_id_nv
                                                };
                                                console.log("is_ArrSchedule", is_ArrSchedule)
                                                console.log("ArrSchedule", ArrSchedule)
                                                break;
                                            }
                                        }
                                        break;
                                    }
                                }
                            }
                            // nhaan vieen ddi lam
                            // console.log("rown", rown)
                            // // ddown hang khach hang tao
                            // console.log("rowns", rowns)
                            // // ddown hangf nhan vieen lam
                            // console.log("rownl", rownl)


                        }

                    })
                }
                // if (rowns != '') {
                //
                //     for (var i = 0; i < derts.length; i++) {
                //         var x = derts[i];
                //         for (var k = 0; k < rowns.length; k++) {
                //             var status = rowns[k].status;
                //             var start_time = rowns[k].start_time.toString();
                //             var end_time = rowns[k].end_time.toString();
                //             var a = start_time.slice(16, 21);
                //             var b = end_time.slice(16, 21);
                //             if (x >= a && x <= b) {
                //                 ArrSchedule = {
                //                     working_time: x,
                //                     status: status,
                //                     user_id_nv:rowns[k].user_id_nv
                //                 };
                //                 console.log("1212",ArrSchedule)
                //                 break;
                //             }
                //         }
                //     }
                // }
            })


        })
    },
    open_settime_order_don: (req, res, next) => {
        let start_time = req.body.start_time;
        let sql = `SELECT * FROM orders WHERE start_time LIKE '2021-01-06%' and status = 0`;
        db.query(sql, [start_time], (err, rown, fields) => {
            if (err) throw err
            var derts = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
                "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
                "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
            var objN = [];
            var ArrSchedule;
            for (var i = 0; i < derts.length; i++) {
                var x = derts[i];
                // console.log("111",x);
                if (rown.length > 0) {
                    for (var k = 0; k < rown.length; k++) {
                        var status = rown[0].status;
                        var start_time = rown[0].start_time.toString();
                        var end_time = rown[0].end_time.toString();
                        var a = start_time.slice(16, 21);
                        var b = end_time.slice(16, 21);
                        if (x >= a && x <= b) {
                            ArrSchedule = {
                                working_time: x,
                                start_time: rown[0].start_time,
                                end_time: rown[0].end_time,
                                status: status,
                            };
                            ArrSchedule && objN.push(ArrSchedule)
                            break;
                        }
                    }
                }

            }
            var ArrGetSchedule = [{"status": "200", message: 'schedule working time !', "data": objN}]
            res.json(ArrGetSchedule);
        })

    },
    // open_settime_order_don: (req, res, next) => {
    //     let start_time = req.body.start_time;
    //     let sql = `SELECT * FROM orders WHERE start_time LIKE '2021-01-06%'`;
    //     console.log("11", sql)
    //     db.query(sql, [start_time, req.params.start_time], (err, rown, fields) => {
    //         if (err) throw err
    //         var derts = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
    //             "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    //             "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    //         var objN = [];
    //         var ArrSchedule;
    //         for (var i = 0; i < derts.length; i++) {
    //             var x = derts[i];
    //             // console.log("111",x);
    //             if (rown.length > 0) {
    //                 for (var k = 0; k < rown.length; k++) {
    //                     var status = rown[k].status;
    //                     var start_time = rown[k].start_time.toString();
    //                     var end_time = rown[k].end_time.toString();
    //                     var a = start_time.slice(16, 21);
    //                     var b = end_time.slice(16, 21);
    //                     if (x >= a && x <= b) {
    //                         ArrSchedule = {
    //                             working_time: x,
    //                             start_time: rown[k].start_time,
    //                             end_time: rown[k].end_time,
    //                             status: status,
    //                         };
    //                         ArrSchedule && objN.push(ArrSchedule)
    //                         break;
    //                     } else {
    //                         if (k == (rown.length - 1)) {
    //                             ArrSchedule = {
    //                                 working_time: x,
    //                                 status: 3,
    //                             };
    //                             ArrSchedule && objN.push(ArrSchedule)
    //                         }
    //                     }
    //                 }
    //             } else {
    //                 ArrSchedule = {
    //                     working_time: x,
    //                     status: 3,
    //                 };
    //                 ArrSchedule && objN.push(ArrSchedule)
    //             }
    //
    //         }
    //         var ArrGetSchedule = [{"status": "200", message: 'schedule working time !', "data": objN}]
    //         res.json(ArrGetSchedule);
    //     })
    //
    // },
}
