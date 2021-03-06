const db = require('../service');
const random_random = require("../config/OpenRoles");
const schedule_details_mode = require("../models/Order_details_model")
var moment = require('moment-timezone');
const axios = require('axios');
const is_OpenRoles = require('../config/OpenRoles')
var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
module.exports = {
    get_orders: (req, res) => {
        let orders_id = req.params.orders_id;
        let sql = `SELECT nails_service.id,code_order,time_service,image,nails_service.title,nails_service.moneys_sv as moneys,status,content_order FROM order_details JOIN nails_service ON nails_service.id = order_details.nails_service_id JOIN orders ON orders.id = order_details.orders_id where orders.id = ${orders_id}`;
        // console.log("111", sql)
        db.query(sql, [orders_id], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_order: rown[i].code_order,
                    time_service: rown[i].time_service,
                    image: rown[i].image,
                    title: rown[i].title,
                    moneys: rown[i].moneys,
                    status: rown[i].status,
                    content_order: rown[i].content_order,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    get_orders_list: (req, res) => {
        let user_id_kh = req.params.user_id_kh;
        let sql = `SELECT * FROM orders WHERE user_id_kh = ${user_id_kh} `;
        db.query(sql, [user_id_kh], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_order: rown[i].code_order,
                    start_time: rown[i].start_time,
                    title: rown[i].title,
                    moneys: rown[i].moneys,
                    phone_nv: rown[i].phone_nv,
                    status: rown[i].status,
                    fullName_nv: rown[i].fullName_nv,
                    content_order: rown[i].content_order,
                    name_kh: rown[i].name_kh,
                    fullname_nv: rown[i].fullname,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    get_orders_status: (req, res) => {
        var Userid = req.params.Userid
        let sql = `SELECT * FROM user WHERE id = ${Userid}`;
        db.query(sql, [Userid], (err, rown, fields) => {
            if (err) throw err
            if (rown != '') {
                let sqlk = '';
                // console.log("rown[0].roles_id",rown[0].roles_id)
                if (rown[0].roles_id == 1) {
                    sqlk = `SELECT * FROM orders WHERE status = 4`;
                } else if (rown[0].roles_id == 2) {
                    sqlk = `SELECT * FROM orders WHERE status = 4`;
                } else if (rown[0].roles_id == 3) {
                    sqlk = `SELECT * FROM orders JOIN order_staffs on order_staffs.orders_id = orders.id WHERE order_staffs.user_id_nv  = ${Userid}`;
                } else {
                    sqlk = `SELECT * FROM orders WHERE status = 4`;
                }
                db.query(sqlk, (err, rowns, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rowns.length; i++) {
                        var ArrSchedule = {
                            id: rowns[i].id,
                            code_order: rowns[i].code_order,
                            start_time: rowns[i].start_time,
                            title: rowns[i].title,
                            moneys: rowns[i].moneys,
                            phone_nv: rowns[i].phone_nv,
                            status: rowns[i].status,
                            fullName_nv: rowns[i].fullName_nv,
                            content_order: rowns[i].content_order,
                            name_kh: rowns[i].name_kh,
                        };
                        obj.push(ArrSchedule);
                    }
                    var _ArrSchedule = JSON.stringify(obj);
                    var ScheduleJson = JSON.parse(_ArrSchedule);
                    var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
                    res.json(ArrGetSchedule);
                })
            }
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
        console.log("order_details_id", order_details_id)
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
                    let data_order_staffs = {
                        is_status: 1,
                        orders_id: orders_id
                    }
                    let is_sql_order_staffs = 'INSERT INTO order_staffs SET ?';
                    db.query(is_sql_order_staffs, [data_order_staffs], (err, rown, fields) => {
                        if (err) throw err
                        console.log("order_staffs INSERT OK")
                    })


                    for (var k = 0; k < order_details_id.length; k++) {
                        var nails_service_id = order_details_id[k].nails_service_id;
                        var moneys_od = order_details_id[k].moneys_od;
                        var data_schedule_details = {
                            nails_service_id: nails_service_id,
                            orders_id: orders_id,
                            moneys_od: moneys_od,
                        }
                        console.log("111", data_schedule_details)
                        let is_sql_order_details = 'INSERT INTO order_details SET ?';
                        console.log("is_sql_order_details", is_sql_order_details)
                        db.query(is_sql_order_details, [data_schedule_details], (err, rown, fields) => {
                            if (err) throw err
                            console.log("order_details INSERT OK")
                        })
                    }
                })

                let sql_notification = `SELECT * FROM notification WHERE notification.user_id = ${user_id_kh}`;
                db.query(sql_notification, (err, rown_notify, response) => {
                    if (err) throw err
                    if (rown_notify != '') {
                        for (var i = 0; i < rown_notify.length; i++) {
                            console.log("rown_notify", rown_notify[i].notification_key)
                            // registration_ids.push(rown[i].on_key);
                            axios.post(is_OpenRoles.urls_notify, {
                                    registration_ids: [rown_notify[i].notification_key],
                                    priority: is_OpenRoles.priority_notify,
                                    notification: is_OpenRoles.notification_notify,
                                    data: is_OpenRoles.data_notify_userl
                                },
                                {
                                    headers: {
                                        Authorization: is_OpenRoles.Authorization_notify,
                                        'Content-Type': 'application/json'
                                    }
                                }
                            )
                                .then(function (response) {
                                    console.log("notify thanh cong")
                                })
                                .catch(function (error) {
                                    console.log("error", error)
                                });
                            let sql_select = `SELECT fullname FROM user WHERE id = ${user_id_kh}`;
                            db.query(sql_select, (err, rowk, response) => {
                                if (err) throw err
                                var data_notification = {
                                    content: 'Bạn đã đặt đơn thành công!',
                                    user_id: user_id_kh,
                                    receiver: rowk[0].fullname,
                                }
                                let sql = `INSERT INTO message SET ?`;
                                db.query(sql, [data_notification], (err, response) => {
                                    if (err) throw err
                                    console.log("thong bao thanh cong")
                                });
                            });
                        }
                    } else {
                        console.log("rown_notify onkey khách hàng chưa có!");
                    }
                })
            })
        } else {
            res.json({"status": "400", message: 'order No INSERT !'});
        }
    },
    get_list_time: (req, res) => {
        let toong = moment().tz("Asia/Ho_Chi_Minh").format();
        let get_yeur = toong.slice(0, 10);
        let get_home = toong.slice(11, 19);

        let moth = get_yeur + " " + get_home;
        var ArrGetschedule_historical = [{"status": "200", "data": moth}]
        res.json(ArrGetschedule_historical);
    },
    //sét thời gian làm nails
    open_settime_order: (req, res, next) => {
        var derts = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
            "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
            "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
        // let start_time = "2021-01-13%";
        let start_time = year;
        // nhaan vieen ddi lamf
        let sql = `SELECT * FROM user WHERE id NOT IN (SELECT user_id_nv FROM day_off WHERE day_off.end_date >= '${start_time}%' and day_off.begin_date <= '${start_time}%') and roles_id = 2 and is_active =0`;
        db.query(sql, (err, rown, fields) => {
                if (err) throw err
                // tat car hoas don khach hang tao
                let sql_orders = `SELECT id,start_time,end_time FROM orders WHERE created_order LIKE '${start_time}%' and status = 0 and assig_status = 0`;
                db.query(sql_orders, (err, rowns, fields) => {
                    if (err) throw err
                    // hoas ddown nhaan vien lam
                    let sql_order_staffs = `SELECT user_id_nv as nv_user,start_time,end_time FROM order_staffs JOIN orders ON orders.id = order_staffs.orders_id WHERE created_order LIKE '${start_time}%' and user_id_nv != ''`;
                    // console.log("sql_order_staffs", sql_order_staffs)
                    db.query(sql_order_staffs, (err, rownl, fields) => {
                            if (err) throw err
                            if (rowns != '') {
                                var objN = [];
                                var objNN = [];
                                for (var i = 0; i < rown.length; i++) {
                                    let user_is = rown[i].id
                                    objN.push(user_is)
                                }
                                for (var m = 0; m < rownl.length; m++) {
                                    let nv_user = rownl[m].nv_user
                                    objNN.push(nv_user)
                                }

                                function arr_diff(a1, a2) {
                                    var a = [], diff = [];
                                    for (var i = 0; i < a1.length; i++) {
                                        a[a1[i]] = true;
                                    }
                                    for (var i = 0; i < a2.length; i++) {
                                        if (a[a2[i]]) {
                                            delete a[a2[i]];
                                        } else {
                                            a[a2[i]] = true;
                                        }
                                    }
                                    for (var k in a) {
                                        diff.push(k);
                                    }
                                    return diff;
                                }

                                function uniqBy(objNN, key) {
                                    var seen = {};
                                    return objNN.filter(function (item) {
                                        var k = key(item);
                                        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                                    })
                                }

                                var bk = uniqBy(objNN, JSON.stringify);
                                var check_user_null = arr_diff(objN, bk);
                                if (check_user_null != "") {
                                    let orders_id = rowns[0].id
                                    for (var i = 0; i < check_user_null.length; i++) {
                                        let user_id = Number(check_user_null[0]);
                                        let sql = `SELECT id, fullname FROM user WHERE id = ${user_id}`;
                                        db.query(sql, (err, ro_order_staffs, fields) => {
                                            if (err) throw err
                                            let fullname_nv = ro_order_staffs[0].fullname;
                                            let sql_od = 'UPDATE order_staffs SET ? WHERE orders_id = ?'
                                            db.query(sql_od, [{
                                                user_id_nv: user_id,
                                                fullname_nv: fullname_nv
                                            }, orders_id], (err, response) => {
                                                if (err) throw err
                                                console.log("tự động phân công nhân viên thành công!")
                                            });
                                            let sql_o = 'UPDATE orders SET ? WHERE id = ?'
                                            db.query(sql_o, [{assig_status: 1}, orders_id], (err, response) => {
                                                if (err) throw err
                                            });

                                        })
                                    }
                                } else {
                                    let orders_id = rowns[0].id;
                                    // console.log("111",objN)
                                    var is_time_order = [];
                                    var time_order_staffs = [];
                                    for (var l = 0; l < derts.length; l++) {
                                        var x = derts[l];
                                        for (var i = 0; i < rownl.length; i++) {
                                            var rowns_nv_user = rownl[i].nv_user;
                                            var rowns_start_time = rownl[i].start_time.toString();
                                            var rowns_end_time = rownl[i].end_time.toString();
                                            var is_rowns_start_time = rowns_start_time.slice(16, 21);
                                            var is_rowns_end_time = rowns_end_time.slice(16, 21);

                                            if (x >= is_rowns_start_time && x <= is_rowns_end_time) {
                                                let arrorder = {
                                                    user_order_staffs: rowns_nv_user,
                                                    time: x
                                                }
                                                time_order_staffs.push(arrorder);
                                            }
                                        }
                                        var start_time = rowns[0].start_time.toString();
                                        var end_time = rowns[0].end_time.toString();
                                        var a = start_time.slice(16, 21);
                                        var b = end_time.slice(16, 21);
                                        if (x >= a && x <= b) {
                                            is_time_order.push({time_s: x});
                                        }
                                    }
                                    var check_d = [];
                                    for (var v = 0; v < objN.length; v++) {
                                        for (var i = 0; i < time_order_staffs.length; i++) {
                                            let time_id = time_order_staffs[i].time;
                                            let user_time = time_order_staffs[i].user_order_staffs;
                                            if (user_time == objN[v]) {
                                                for (var kt = 0; kt < is_time_order.length; kt++) {
                                                    let timmeee = is_time_order[kt].time_s;
                                                    if (time_id !== timmeee) {
                                                        // console.log("timmeee",)
                                                        // console.log("timmeee",timmeee);
                                                        // break;
                                                    } else {
                                                        check_d.push(user_time)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    var chek_ = uniqBy(check_d, JSON.stringify);
                                    var check_u = arr_diff(objN, chek_);
                                    // console.log("222",check_u);
                                    for (var p = 0; p < check_u.length; p++) {
                                        let user_id = Number(check_u[0]);
                                        let sql = `SELECT id, fullname FROM user WHERE id = ${user_id}`;
                                        db.query(sql, (err, ro_order_staffs, fields) => {
                                            if (err) throw err
                                            let fullname_nv = ro_order_staffs[0].fullname;
                                            let sql_od = 'UPDATE order_staffs SET ? WHERE orders_id = ?'
                                            db.query(sql_od, [{
                                                user_id_nv: user_id,
                                                fullname_nv: fullname_nv
                                            }, orders_id], (err, response) => {
                                                if (err) throw err
                                                console.log("tự động phân công nhân viên thành công!")
                                            });
                                            let sql_o = 'UPDATE orders SET ? WHERE id = ?'
                                            db.query(sql_o, [{assig_status: 1}, orders_id], (err, response) => {
                                                if (err) throw err
                                            });

                                        })
                                    }
                                }
                            } else {
                                console.log("Không có hoá đơn nào tồn tại !")
                            }
                        }
                    )
                })
            }
        )
    },
    open_settime_order_don: (req, res, next) => {
        let start_time = req.body.start_time;
        let sql = `SELECT * FROM orders WHERE start_time LIKE '${start_time}%' and status = 0`;
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
    store_status: (req, res) => {
        let OrderStatusID = req.params.OrderStatusID;
        let status = Number(req.body.status);
        let user_id = req.body.user_id;
        let is_content_cancel = req.body.content_cancel;
        let content_cancel = is_content_cancel + " : " + user_id;
        var data = {
            status: status,
            content_cancel: content_cancel
        }
        let sql_check = `SELECT * FROM orders WHERE status != 1 and status != 4 and id = ${OrderStatusID}`;
        db.query(sql_check, (err, respon, response) => {
            if (err) throw err
            if (respon != '') {
                let sql = 'UPDATE orders SET ? WHERE id = ?';
                let sqlm = 'UPDATE order_staffs SET ? WHERE orders_id = ?'
                if (status == 1 && user_id && is_content_cancel != '' || undefined) {
                    db.query(sql, [data, OrderStatusID], (err, response) => {
                        if (err) throw err
                        res.json({"status": "200", "message": 'khách hàng huỷ đơn!'});
                    })

                    db.query(sqlm, [{is_status: 3}, OrderStatusID], (err, response) => {
                        if (err) throw err
                        console.log("khách hàng huỷ đơn!");
                    })
                } else if (status == 3 && user_id && is_content_cancel != '' || undefined) {
                    db.query(sql, [data, OrderStatusID], (err, response) => {
                        if (err) throw err
                        res.json({"status": "200", "message": 'Thu ngân huỷ đơn thành công!'});
                    });

                    db.query(sqlm, [{is_status: 2}, OrderStatusID], (err, response) => {
                        if (err) throw err
                        console.log("Thu ngân huỷ đơn!");
                    });
                } else if (status == 4 && user_id && is_content_cancel != '' || undefined) {
                    db.query(sql, [data, OrderStatusID], (err, response) => {
                        if (err) throw err
                        res.json({"status": "200", "message": 'Đơn làm nails hoàn thành !'});
                    })
                } else if (status == 5 && user_id && is_content_cancel != '' || undefined) {
                    db.query(sql, [data, OrderStatusID], (err, response) => {
                        if (err) throw err
                        res.json({"status": "200", "message": 'Đơn làm lể tân xác nhận khách hang den !'});
                    })
                } else {
                    res.json({"status": "403", "message": 'không có quyền với status này !'});
                }
            } else {
                res.json({"status": "403", "message": 'không có quyền với banr ghi này !'});
            }
        })
    },
}
