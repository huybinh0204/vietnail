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
        let sql = `SELECT * FROM order_details JOIN nails_service ON nails_service.id = order_details.nails_service_id JOIN orders ON orders.id = order_details.orders_id where orders.id = ${orders_id}`;
        console.log("111", sql)
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
        let sql = `SELECT * FROM orders WHERE status = 4`;
        db.query(sql, (err, rown, fields) => {
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
                let sql_orders = `SELECT id,start_time,end_time FROM orders WHERE created_order LIKE '${start_time}%' and status = 0`;
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
                                            db.query(sql_o, [{status: 2}, orders_id], (err, response) => {
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
                                    // console.log("objN", objN)
                                    // console.log("time_order_staffs", time_order_staffs)
                                    // console.log("is_time_order", is_time_order)
                                    for (var v = 0; v < objN.length; v++) {
                                        for (var i = 0; i < time_order_staffs.length; i++) {
                                            let time_id = time_order_staffs[i].time;
                                            let user_time = time_order_staffs[i].user_order_staffs;
                                            if (user_time == objN[v]) {
                                                console.log("user_time", user_time)
                                                console.log("time_id", time_id)
                                                break;
                                            }
                                        }
                                        // console.log("time_id", time_id);
                                        // console.log("user_time", user_time);
                                        // for (var v = 0; v < is_time_order.length; v++) {
                                        //     let is_time_s = is_time_order[v].time_s;
                                        //     for (var nt = 0; nt < objN.length; nt++) {
                                        //         console.log("1111", objN[nt])
                                        //
                                        //     }
                                        // }
                                    }

                                }
                                //     var objN = [];
                                //     var objNN = [];
                                //     for (var i = 0; i < rown.length; i++) {
                                //         let user_id_nv = rown[i].id
                                //         let fullname_nv = rown[i].fullname_nv
                                //
                                //         // console.log(user_id_nv)
                                //         for (var l = 0; l < derts.length; l++) {
                                //             var x = derts[l];
                                //             if (rowns != '') {
                                //                 // for (var k = 0; k < rowns.length; k++) {
                                //                     let orders_id = rowns[0].id;
                                //                     var rowns_start_time = rowns[0].start_time.toString();
                                //                     var rowns_end_time = rowns[0].end_time.toString();
                                //                     var is_rowns_start_time = rowns_start_time.slice(16, 21);
                                //                     var is_rowns_end_time = rowns_end_time.slice(16, 21);
                                //                     if (x >= is_rowns_start_time && x <= is_rowns_end_time) {
                                //                         var abn = {
                                //                             orders_id: orders_id,
                                //                             time: x
                                //                         };
                                //                         objNN.push(abn)
                                //                         // break;
                                //                     }
                                //                 // }
                                //                 if (rownl != '') {
                                //                     for (var m = 0; m < rownl.length; m++) {
                                //                         let user_nv = rownl[m].nv_user
                                //                         var start_time = rownl[m].start_time.toString();
                                //                         var end_time = rownl[m].end_time.toString();
                                //                         var a = start_time.slice(16, 21);
                                //                         var b = end_time.slice(16, 21);
                                //                         if (x >= a && x <= b) {
                                //                             if (user_nv == user_id_nv) {
                                //                                 var ab = {
                                //                                     user_nv: user_id_nv,
                                //                                     time: x,
                                //                                 };
                                //                                 ab && objN.push(ab);
                                //                                 break;
                                //                             }
                                //                         }
                                //                     }
                                //                 }
                                //             }
                                //         }
                                //     }
                                // console.log("check", objNN)
                                // console.log("objN", objN)
                                // function uniqBy(objNN, key) {
                                //     var seen = {};
                                //     return objNN.filter(function (item) {
                                //         var k = key(item);
                                //         return seen.hasOwnProperty(k) ? false : (seen[k] = true);
                                //     })
                                // }
                                // var bk = uniqBy(objNN, JSON.stringify);
                                // console.log("check", bk)
                                // console.log("objN", objN)
                                // for (var q = 0; q < rown.length; q++) {
                                //     let user_id_nv = rown[q].id;
                                //     let fullname_nv = rown[q].fullname_nv;
                                //     for (var w = 0; w<objN.length;w++){
                                //         var user_nv = objN[w].user_nv;
                                //         var user_time = objN[w].time;
                                //         for (var  r = 0; r<bk.length;r++){
                                //             var orders_time = bk[r].time;
                                //             if (orders_time == user_time){
                                //                 console.log("orders_time",orders_time + " : user_nv : " + user_nv)
                                //             }else {
                                //                 console.log("121111",orders_time + " : 222222 : " + user_nv)
                                //             }
                                //
                                //             // if (user_id_nv == user_nv){
                                //             //     console.log("111",user_nv);
                                //             // }
                                //         }
                                //     }
                                // }


                                // var check = [];

                                //         var check_h = derts[h];
                                //         var objN_time = objN[m].time;
                                //          if (check_h != objN[m].time) {
                                //              if(m - (objN.length-1)){
                                //                  // console.log("check_h", check_h)
                                //                  // console.log("objN_time", objN_time)
                                //                  var check_time_derts = {
                                //                      user_nv: objN[m].user_nv,
                                //                      time: check_h
                                //                  };
                                //                  check_time_derts && check.push(check_time_derts)
                                //                  break;
                                //              }
                                //
                                //         // } else {
                                //         //
                                //         }
                                //     }
                                // }

                                // console.log("bk",bk)
                                // var n =[]
                                // for (var f = 0; f < objN.length; f++) {
                                //     for (var g = 0; g < bk.length; g++) {
                                //         if (objN[f].time == bk[g].time) {
                                //             // var abd = {
                                //             //     user_nv: objN[0].user_nv,
                                //             //     orders_id: bk[0].orders_id
                                //             // };
                                //                 console.log("user_nv", objN[f].user_nv+":"+objN[f].time)
                                //                 console.log("time", bk[0].orders_id)
                                //         }
                                //     }
                                // }
                            } else {
                                console.log("Không có hoá đơn nào tồn tại !")
                            }
                        }
                    )
                })
            }
        )
    },

//     if (rowns && rownl != '') {
//         let rowns_check =[];
//         let rownl_check =[];
//         for (var i = 0; i < derts.length; i++) {
//             var x = derts[i];
//             for (var s = 0; s < rowns.length; s++) {
//                 var rowns_start_time = rowns[s].start_time.toString();
//                 var rowns_end_time = rowns[s].end_time.toString();
//                 var is_rowns_start_time = rowns_start_time.slice(16, 21);
//                 var is_rowns_end_time = rowns_end_time.slice(16, 21);
//                 if (x >= is_rowns_start_time && x <= is_rowns_end_time) {
//                     var checktime = x;
//                     // if (s == (rowns.length - 1)) {
//                         console.log("cccccc",checktime)
//                         rowns_check.push(checktime)
//                     // }
//                 }
//                 console.log("22222222",user_id_nv)
//                 for (var k = 0; k < rownl.length; k++) {
//                     var start_time = rownl[k].start_time.toString();
//                     var end_time = rownl[k].end_time.toString();
//                     var a = start_time.slice(16, 21);
//                     var b = end_time.slice(16, 21);
//                     console.log("user_id_nv 3333",user_id_nv)
//
//                     if (x >= a && x <= b) {
//                         var check_time_nv = x;
//                     }
//                 }
//             }
//             // for (var k = 0; k < rownl.length; k++) {
//             //     var start_time = rownl[k].start_time.toString();
//             //     var end_time = rownl[k].end_time.toString();
//             //     var a = start_time.slice(16, 21);
//             //     var b = end_time.slice(16, 21);
//             //     var check_time_nv = x;
//             //     if (x >= a && x <= b) {
//             //         console.log("checktime", x);
//             //         rownl_check.push(check_time_nv)
//             //     }
//
//                     // let sql_o = 'UPDATE orders SET ? WHERE id = ?'
//                     // db.query(sql_o, [{status:2}, rowns[0].id], (err, response) => {
//                     //     if (err) throw err
//                     // })
//                     // let sql_od = 'UPDATE order_staffs SET ? WHERE orders_id = ?'
//                     // db.query(sql_od, [{user_id_nv:user_id_nv,fullname_nv:fullname_nv}, rowns[0].id], (err, response) => {
//                     //     if (err) throw err
//                     // })
//
//             // }
//
//         }
//     }
//
//     for (var n=0 ; n < rowns.length ; n++){
//     console.log()
//     var status = rowns[k].status;
//     var rowns_start_time = rowns[n].start_time.toString();
//     var rowns_end_time = rowns[n].end_time.toString();
//     var is_rowns_start_time = rowns_start_time.slice(16, 21);
//     var is_rowns_end_time = rowns_end_time.slice(16, 21);
//     if (x >= is_rowns_start_time && x <= is_rowns_end_time) {
//         is_ArrSchedule = {
//             working_time: x,
//             status: status,
//             user_id_nv: rowns[n].user_id_nv
//         };
//         console.log("is_ArrSchedule", is_ArrSchedule)
//         console.log("ArrSchedule", ArrSchedule)
//         break;
//     }
// }
// break;
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
                        res.json({"status": "200", "message": 'Nhân viên huỷ đơn thành công!'});
                    });
                    db.query(sqlm, [{is_status: 0}, OrderStatusID], (err, response) => {
                        if (err) throw err
                        console.log("Nhân viên huỷ đơn!");
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
                } else if (status == 6 && user_id && is_content_cancel != '' || undefined) {
                    db.query(sql, [data, OrderStatusID], (err, response) => {
                        if (err) throw err
                        res.json({"status": "200", "message": 'Thu ngân huỷ đơn thành công !'});
                    })
                    db.query(sqlm, [{is_status: 3}, OrderStatusID], (err, response) => {
                        if (err) throw err
                        console.log("Thu ngân huỷ đơn!");
                    });
                } else {
                    res.json({"status": "403", "message": 'không có quyền với status này !'});
                }
            } else {
                res.json({"status": "403", "message": 'không có quyền với banr ghi này !'});
            }
        })
    },
}
