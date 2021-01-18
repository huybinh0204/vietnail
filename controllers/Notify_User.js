const db = require('../service');
const axios = require('axios');
const is_OpenRoles = require('../config/OpenRoles')
var moment = require('moment-timezone');
module.exports = {
    // notify thu ngan
    get_time_schedule: (req, res) => {
        let sql = `SELECT user_id,notification_key FROM user JOIN notification ON user.id = notification.user_id WHERE roles_id=4`;
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            if (rown != '') {
                // var registration_ids = [];
                for (var i = 0; i < rown.length; i++) {
                    // registration_ids.push(rown[i].on_key);
                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: [rown[i].notification_key],
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify,
                            data: is_OpenRoles.data_notify_userl
                        },
                        {
                            headers: {
                                // Authorization: 'key=AAAAI03A8A0:APA91bGsIIK6IvC_0r_mkJo38wpIHuHZoNbGqNzM_17s5FSv7L8fxKCf4fLoB0t61RZb4_dbGYbBdeP2FPxTx8P2K0MAaUJcaTXde4IB00k85yvCKb8SyxnSXUKmvkyI7XjOqrGHgXAI',
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

                    var user_id = rown[i].user_id;
                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: 'Nhớ xác nhận khách hàng đến !',
                            user_id: user_id,
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
                console.log("NO User thtu ngan  push notify!");
            }
        })
    },
    //ban notify khách hàng
    get_notify_kh: (req, res) => {
        var check_time = moment().tz("Asia/Bangkok").format("YYYY-MM-DD hh:mmA");
        var check_PM = check_time.slice(16, 18);
        // var ngay = '2021-01-06';
        var ngay = check_time.slice(0, 11);
        var gio = Number(check_time.slice(11, 13));
        var phut_ht = Number(check_time.slice(14, 16));
        var gio_ht = check_PM == "PM" ? (gio + 12) : gio;
        var is_gio_ht = check_PM == "PM" ? (gio + 13) : gio;
        let sql = `SELECT orders.id,user_id,notification_key,orders.start_time FROM orders JOIN notification ON orders.user_id_kh = notification.user_id WHERE start_time LIKE '${ngay}%' GROUP BY orders.user_id_kh`;
        // console.log("sql khach hang", sql)
        db.query(sql, (err, rown, response) => {
            if (err) throw err
            for (var i = 0; i < rown.length; i++) {
                var a = rown[i].start_time.toString();
                var schedule_id = rown[i].id;
                var gio_db = Number(a.slice(16, 18));
                var phut_db = Number(a.slice(19, 21));
                if (is_gio_ht == gio_db && phut_db == 0 && phut_ht >= 45) {
                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: [rown[i].notification_key],
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_user,
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
                    var user_id = rown[i].user_id;

                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: "Sắp đến giờ làm nail cửa bạn!",
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                } else if (gio_ht == gio_db && phut_db == 0 && phut_ht >= 0) {
                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].notification_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_userk,
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

                    var user_id = rown[i].user_id;

                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: 'Đã đến giờ làm nails của bạn, bạn đến chưa !',
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });


                } else if (gio_ht == gio_db && phut_db == 0 && phut_ht < 30) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].notification_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_userk,
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

                    var user_id = rown[i].user_id;
                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: "Đã đến giờ làm nails ca bạn, bạn đến chưa !",
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                }else if (gio_ht == gio_db && phut_db == 0 && phut_ht == 30) {
                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].notification_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_usern,
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

                    var user_id = rown[i].user_id;
                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: "Bạn đến muộn cửa hàng huỷ đơin cửa bạn !",
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                        var data_kh = {
                            user_id:user_id,
                            status: 1,
                        }
                        let sql_schedule = `UPDATE orders SET ? WHERE status != 5 and status != 4 and status != 1 and id = ${schedule_id} `
                        db.query(sql_schedule, [data_kh], (err, response) => {
                            if (err) throw err
                            console.log('he thong huy khách hàng huỷ đơn!');
                        })
                    });
                }

                if (gio_ht == gio_db && phut_db == 30 && phut_ht >= 15) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].notification_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_user,
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

                    var user_id = rown[i].user_id;
                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: 'Sắp đến giờ làm nail cửa bạn!',
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                } else if (gio_ht == gio_db && phut_db == 30 && phut_ht >= 30) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].notification_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_userk,
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

                    var user_id = rown[i].user_id;
                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: 'Đã đến giờ làm nails cửa bạn bạn đến chưa !',
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });
                } else if (is_gio_ht == gio_db && phut_db == 30 && phut_ht > 0) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].notification_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_userk,
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

                    var user_id = rown[i].user_id;
                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: 'Đã đến giờ làm nails cửa bạn bạn đến chưa !',
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                    });

                } else if (is_gio_ht == gio_db && phut_db == 30 && phut_ht == 0) {

                    axios.post(is_OpenRoles.urls_notify, {
                            registration_ids: rown[i].notification_key,
                            priority: is_OpenRoles.priority_notify,
                            notification: is_OpenRoles.notification_notify_usern,
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

                    var user_id = rown[i].user_id;
                    let sql_select = `SELECT fullname FROM user WHERE id = ${user_id}`;
                    db.query(sql_select, (err, rowk, response) => {
                        if (err) throw err
                        var data_notification = {
                            content: 'Bạn đến muộn cửa hàng huỷ đơn cửa bạn !',
                            user_id: user_id,
                            receiver: rowk[0].fullname,
                        }
                        let sql = `INSERT INTO message SET ?`;
                        db.query(sql, [data_notification], (err, response) => {
                            if (err) throw err
                            console.log("thong bao thanh cong")
                        });
                        var data_kh = {
                            user_id:user_id,
                            status: 1,
                        }
                        let sql_schedule = `UPDATE orders SET ? WHERE status != 5  and status != 4 and status != 1 and id = ${schedule_id}`
                        db.query(sql_schedule, [data_kh], (err, response) => {
                            if (err) throw err
                            console.log('he thong huy khách hàng huỷ đơn!');
                        })
                    });
                }
            }
        })
    },

}
