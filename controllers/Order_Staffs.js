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
            console.log("user_id_nv",user_id_nv)
            let sql_orders = `SELECT * FROM orders WHERE status =0`;
            db.query(sql_orders, (err, rowns, fields) => {
                if (err) throw err
                var orders_id = rowns[0].id;
                let data = {
                    content:"",
                    is_status:1,
                    user_id_nv:user_id_nv,
                    orders_id:orders_id
                }
                let sql_order_staffs = `INSERT INTO order_staffs SET ?`;
                db.query(sql_order_staffs, [data], (err, response) => {
                    if (err) throw err
                })
                let status_orders = 2;
                let sql_update_orders = `UPDATE orders SET status = ${status_orders} WHERE id = ${orders_id}`;
                console.log("sql_update_orders",sql_update_orders)
                db.query(sql_update_orders, (err, response) => {
                    if (err) throw err
                    console.log("ok")
                })
                res.json({"status": "400", message: 'schedule No INSERT !'});
            })
            // res.json(rown);
        })
    },
}