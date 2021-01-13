const db = require('../service');
const random_random = require("../config/OpenRoles");
const order_staffs_model = require("../models/Order_Staffs_model")
var moment = require('moment-timezone');
var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
module.exports = {
    store_order_staffs: (req, res) => {
        let sql = `SELECT * FROM user WHERE id NOT IN (SELECT user_id_nv FROM day_off WHERE day_off.end_date >= "2021-01-06%" and day_off.begin_date <= "2021-01-06%") and roles_id = 2 and is_active =0`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var user_id_nv = rown[0].id;
            console.log("user_id_nv", user_id_nv)
            let sql_orders = `SELECT * FROM orders WHERE status =0`;
            db.query(sql_orders, (err, rowns, fields) => {
                if (err) throw err
                var orders_id = rowns[0].id;
                let data = {
                    content: "",
                    is_status: 1,
                    user_id_nv: user_id_nv,
                    orders_id: orders_id
                }
                let sql_order_staffs = `INSERT INTO order_staffs SET ?`;
                db.query(sql_order_staffs, [data], (err, response) => {
                    if (err) throw err
                })
                let status_orders = 2;
                let sql_update_orders = `UPDATE orders SET status = ${status_orders} WHERE id = ${orders_id}`;
                console.log("sql_update_orders", sql_update_orders)
                db.query(sql_update_orders, (err, response) => {
                    if (err) throw err
                    console.log("ok")
                })
                res.json({"status": "400", message: 'schedule No INSERT !'});
            })
            // res.json(rown);
        })
    },
    store_order_staffs_TN: (req, res) => {
        let orders_id = req.body.orders_id;
        let user_id_tn = req.body.user_id_tn;
        let order_details_id = req.body.order_details_id;
        let sql = `SELECT * FROM orders WHERE id = ${orders_id}`;
        if (orders_id && user_id_tn != undefined || "") {
            db.query(sql, (err, rown, fields) => {
                if (err) throw err
                let sql = `SELECT * FROM user WHERE id = ${user_id_tn}`;
                db.query(sql, (err, rown, fields) => {
                    if (err) throw err
                    let name_tn = rown[0].fullname
                    let phone_tn = rown[0].phone

                    for (var k = 0; k < order_details_id.length; k++) {
                        var nails_service_id = order_details_id[k].nails_service_id;
                        var moneys_od = order_details_id[k].moneys_od;
                        var data_schedule_details_n = {
                            nails_service_id: nails_service_id,
                            orders_id: orders_id,
                            moneys_od: moneys_od,
                            user_id_tn: user_id_tn,
                            name_tn: name_tn,
                            phone_tn: phone_tn
                        }
                        let is_sql_order_details = 'INSERT INTO order_details SET ?';
                        db.query(is_sql_order_details, [data_schedule_details_n], (err, rown, fields) => {
                            if (err) throw err
                            console.log("OK")
                        })
                    }
                    res.json({status: "200", message: 'order_details INSERT Ok!'});
                })

            })
        } else {
            res.json({"status": "400", message: 'No!'});
        }
    },
    get_date_time: (req, res) => {
        let sql = `SELECT * FROM order_staffs JOIN orders ON orders.id = order_staffs.orders_id WHERE start_time LIKE '${year}%'`;
        // console.log("111", sql)
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_order: rown[i].code_order,
                    start_time: rown[i].start_time,
                    end_time: rown[i].end_time,
                    status: rown[i].status,
                    moneys: rown[i].moneys,
                    phone_kh: rown[i].phone_kh,
                    name_kh: rown[i].name_kh,
                    user_id_kh: rown[i].user_id_kh,
                    fullname_nv: rown[i].fullname_nv,
                    created_order: rown[i].created_order,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    get_order_details: (req, res) => {
        let orders_id = req.query.orders_id;
        let sql = `SELECT * FROM order_details JOIN nails_service ON nails_service.id = order_details.nails_service_id WHERE orders_id = ${orders_id}`;
        if (orders_id != undefined || "") {
            db.query(sql, (err, rown, fields) => {
                if (err) throw err
                var obj = [];
                for (var i = 0; i < rown.length; i++) {
                    var ArrShop = {
                        id: rown[i].id,
                        name_tn: rown[i].name_tn,
                        orders_id: rown[i].orders_id,
                        moneys_od: rown[i].moneys_od,
                        time_service: rown[i].time_service,
                        title: rown[i].title,
                        status_od: rown[i].status_od,
                        nails_service_id: rown[i].nails_service_id,
                    };
                    obj.push(ArrShop);
                }
                var _ArrShop = JSON.stringify(obj);
                var ShopJson = JSON.parse(_ArrShop);
                var ArrGetShop = [{"status": "200", message: 'nails_service_type OK!', "data": ShopJson}]
                res.json(ArrGetShop);

            })
        } else {
            res.json({"status": "400", message: 'No!'});
        }
    },
    delete_order_details: (req, res) => {
        let orders_id = req.body.orders_id;
        let order_details = req.body.order_details_id;
        let user_id_tn = req.body.user_id_tn;
        let sql = `SELECT * FROM orders WHERE id = ${orders_id}`;
        if (orders_id && user_id_tn && order_details != undefined || "") {
            db.query(sql, (err, rown, fields) => {
                if (err) throw err
                let sql = `SELECT * FROM user WHERE id = ${user_id_tn}`;
                db.query(sql, (err, rown, fields) => {
                    if (err) throw err
                    let name_tn = rown[0].fullname
                    let phone_tn = rown[0].phone

                    var data_schedule_details_n = {
                        status_od: 1,
                        user_id_tn: user_id_tn,
                        name_tn: name_tn,
                        phone_tn: phone_tn
                    }
                    for (var k = 0; k < order_details.length; k++) {
                        var id = order_details[k].id;
                        let sql = 'UPDATE order_details SET ? WHERE id = ?'
                        db.query(sql, [data_schedule_details_n, id], (err, response) => {
                            if (err) throw err

                        })
                    }
                    res.json({"status": "200", shop: 'Xoa dich vu thanh cong!'})

                })

            })
        } else {
            res.json({"status": "400", message: 'No!'});
        }
    },
// thong ke
    statistical_service: (req, res) => {
        let start_time = req.body.start_time ;
        let sql = `SELECT COUNT(*) as sum_service, title, start_time,nails_service_id FROM orders JOIN order_details ON orders.id = order_details.orders_id JOIN nails_service ON order_details.nails_service_id = nails_service.id WHERE orders.start_time LIKE '${start_time}%' GROUP BY order_details.nails_service_id`;
        if (start_time != undefined || "") {
            db.query(sql, (err, rown, fields) => {
                if (err) throw err
                var obj = [];
                for (var i = 0; i < rown.length; i++) {
                    var ArrShop = {
                        sum_service: rown[i].sum_service,
                        title: rown[i].title,
                        start_time: rown[i].start_time,
                        time_service: rown[i].time_service,
                        nails_service_id: rown[i].nails_service_id
                    };
                    obj.push(ArrShop);
                }
                var _ArrShop = JSON.stringify(obj);
                var ShopJson = JSON.parse(_ArrShop);
                var ArrGetShop = [{"status": "200", message: 'thống kê dịch vụ làm trong tháng  OK!', "data": ShopJson}]
                res.json(ArrGetShop);

            })
        } else {
            res.json({"status": "400", message: 'No statistical_service!'});
        }
    },
    statistical_service_moneys: (req, res) => {
        let start_time = req.body.start_time ;
        let sql = `SELECT SUM(moneys) as sum_moneys FROM orders WHERE orders.start_time LIKE '2021-01%'`;
        if (start_time != undefined || "") {
            db.query(sql, (err, rown, fields) => {
                if (err) throw err
                var obj = [];
                for (var i = 0; i < rown.length; i++) {
                    var ArrShop = {
                        sum_moneys: rown[i].sum_moneys,
                        start_time: start_time,
                    };
                    obj.push(ArrShop);
                }
                var _ArrShop = JSON.stringify(obj);
                var ShopJson = JSON.parse(_ArrShop);
                var ArrGetShop = [{"status": "200", message: 'thống kê tổng tiền theo tháng OK!', "data": ShopJson}]
                res.json(ArrGetShop);

            })
        } else {
            res.json({"status": "400", message: 'No statistical_service!'});
        }
    },
}
