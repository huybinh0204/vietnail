const db = require('../service');
const random_random = require("../config/OpenRoles");
const schedule_details_mode = require("../models/Order_details_model")
var moment = require('moment-timezone');
var year = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");
module.exports = {
    get: (req, res) => {
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
    get_nv: (req, res) => {
        let start_time = req.body.start_time;
        let id_User = req.body.id_User;
        let sql = `SELECT DISTINCT code_schedule , schedule.id ,start_time, end_time ,status ,moneys , user.fullName as fullName_nv ,` +
            `phone_nv , schedule_details.phone_kh ,schedule_details.working_time as fullName_kh , schedule.id_User as id_User_nv, ` +
            `schedule_details.id_User as id_User_kh FROM schedule JOIN schedule_details ON schedule.id = schedule_details.id_Schedule ` +
            `JOIN user ON user.id = schedule.id_User WHERE start_time LIKE '${start_time}%' and schedule.id_User = ${id_User}`;
        // console.log("111", sql)
        if (start_time && id_User != undefined || '') {
            db.query(sql, [{start_time, id_User}], (err, rown, fields) => {
                if (err) throw err
                var obj = [];
                for (var i = 0; i < rown.length; i++) {
                    var ArrSchedule = {
                        id: rown[i].id,
                        code_schedule: rown[i].code_schedule,
                        start_time: rown[i].start_time,
                        end_time: rown[i].end_time,
                        status: rown[i].status,
                        moneys: rown[i].moneys,
                        fullName_nv: rown[i].fullName_nv,
                        phone_nv: rown[i].phone_nv,
                        id_User_nv: rown[i].id_User_nv,
                        fullName_kh: rown[i].fullName_kh,
                        phone_kh: rown[i].phone_kh,
                        id_User_kh: rown[i].id_User_kh,
                    };
                    obj.push(ArrSchedule);
                }
                var _ArrSchedule = JSON.stringify(obj);
                var ScheduleJson = JSON.parse(_ArrSchedule);
                var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
                res.json(ArrGetSchedule);
            })
        } else {

            res.json({"status": "400", "message": 'acc no!'});
        }
    },
    get_date_time: (req, res) => {
        let sql = `SELECT DISTINCT code_schedule , schedule.id ,start_time, end_time ,status ,moneys , user.fullName as fullName_nv ,` +
            `phone_nv , schedule_details.phone_kh ,schedule_details.working_time as fullName_kh , schedule.id_User as id_User_nv, ` +
            `schedule_details.id_User as id_User_kh FROM schedule JOIN schedule_details ON schedule.id = schedule_details.id_Schedule ` +
            `JOIN user ON user.id = schedule.id_User WHERE start_time LIKE '${year}%'`;
        // console.log("111", sql)
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_schedule: rown[i].code_schedule,
                    start_time: rown[i].start_time,
                    end_time: rown[i].end_time,
                    status: rown[i].status,
                    moneys: rown[i].moneys,
                    fullName_nv: rown[i].fullName_nv,
                    phone_nv: rown[i].phone_nv,
                    id_User_nv: rown[i].id_User_nv,
                    fullName_kh: rown[i].fullName_kh,
                    phone_kh: rown[i].phone_kh,
                    id_User_kh: rown[i].id_User_kh,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM schedule JOIN schedule_details ON schedule_details.id_Schedule=schedule.id WHERE schedule.id = ?'
        db.query(sql, [req.params.scheduleId], (err, rown, fields) => {
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
                    fullName: rown[i].fullName,
                    content_schedule: rown[i].content_schedule,
                    created_schedule: rown[i].created_schedule,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    detail_service_shop: (req, res) => {
        let sql = `SELECT service_shop.id,service_shop.title,service_shop.content,service_shop.moneys_ser, service_shop.created_at,service_shop.image ` +
            `FROM schedule_details JOIN service_shop ON service_shop.id = schedule_details.id_Service_shop WHERE id_Schedule = ?`
        db.query(sql, [req.params.scheduleId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    title: rown[i].title,
                    content: rown[i].content,
                    moneys_ser: rown[i].moneys_ser,
                    created_at: rown[i].created_at,
                    image: rown[i].image
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    list_detail: (req, res) => {
        let scheduleId = req.params.scheduleId;
        let sql = `SELECT DISTINCT schedule.id, code_schedule,start_time,moneys,minus_point,phone_nv,phone_kh,content_schedule,schedule.status ,schedule.fullName as fullName_nv FROM schedule ` +
            `JOIN schedule_details ON schedule_details.id_Schedule = schedule.id WHERE schedule_details.id_User = ${scheduleId}`;
        // console.log("123",sql)
        db.query(sql, [scheduleId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrSchedule = {
                    id: rown[i].id,
                    code_schedule: rown[i].code_schedule,
                    start_time: rown[i].start_time,
                    moneys: rown[i].moneys,
                    minus_point: rown[i].minus_point,
                    phone_kh: rown[i].phone_kh,
                    phone_nv: rown[i].phone_nv,
                    fullName_nv: rown[i].fullName_nv,
                    status: rown[i].status,
                    content_schedule: rown[i].content_schedule,
                };
                obj.push(ArrSchedule);
            }
            var _ArrSchedule = JSON.stringify(obj);
            var ScheduleJson = JSON.parse(_ArrSchedule);
            var ArrGetSchedule = [{"status": "200", "data": ScheduleJson}]
            res.json(ArrGetSchedule);
        })
    },
    // sua hoas ddon
    update: (req, res) => {
        let data = req.body;
        let scheduleId = req.params.scheduleId;
        let sql = 'UPDATE schedule SET ? WHERE id = ?'
        db.query(sql, [data, scheduleId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", schedule: 'Update success!'})
        })
    },
    //taoj hoas ddon
    store: (req, res) => {
        var code_schedule = random_random.randomString(10);
        let start_time = req.body.start_time;
        let end_time = req.body.end_time;
        let moneys = req.body.moneys;
        let id_Shop = req.body.id_Shop;
        let id_promotion = req.body.id_promotion;
        let content_schedule = req.body.content_schedule;
        let id_schedule_details = req.body.id_schedule_details;
        let phone_kh = req.body.phone_kh;
        let fullName_kh = req.body.fullName_kh;
        let id_User = req.body.id_User;
        let id_User_nv = req.body.id_User_nv;

        if (id_schedule_details != '' && start_time && end_time && moneys && id_Shop && id_promotion && content_schedule != null || undefined) {

            let sql = `SELECT * FROM promotion WHERE id =${id_promotion}`;
            console.log("123", sql)
            db.query(sql, (err, rows, response) => {
                if (rows != '') {
                    if (err) throw err
                    var number = rows.map(x => x.number);
                    var is_number = number.toString();
                    var minus_point = Math.ceil((moneys * is_number) / 100000);
                    let sql_NV = `SELECT * FROM user WHERE id =${id_User_nv}`;
                    console.log("1111",sql_NV)
                    db.query(sql_NV, (err, rows_nv, response) => {
                        var data = {
                            code_schedule: code_schedule,
                            start_time: start_time,
                            end_time: end_time,
                            moneys: moneys,
                            minus_point: minus_point,
                            fullName:rows_nv[0].fullName,
                            phone_nv:rows_nv[0].phone,
                            id_Shop: id_Shop,
                            id_promotion: id_promotion,
                            id_User: id_User_nv,
                            status: 0,
                            content_schedule: content_schedule,
                        }
                        // console.log("222", data)
                        let sql = `INSERT INTO schedule SET ?`;
                        db.query(sql, [data], (err, response) => {
                            if (err) throw err

                            let _sqlSELECT = `SELECT * FROM schedule ORDER BY id DESC LIMIT 1`;
                            db.query(_sqlSELECT, (err, rown, fields) => {
                                if (err) throw err
                                var obj = [];
                                for (var i = 0; i < rown.length; i++) {
                                    var ArrSchedule = {
                                        id: rown[i].id,
                                        code_schedule: rown[i].code_schedule,
                                        start_time: rown[i].start_time,
                                        end_time: rown[i].end_time,
                                        moneys: rown[i].moneys,
                                        minus_point: rown[i].minus_point,
                                        phone_nv: rown[i].phone_nv,
                                        status: rown[i].status,
                                        fullName: rown[i].fullName,
                                        content_schedule: rown[i].content_schedule,
                                        created_schedule: rown[i].created_schedule,
                                    };
                                    obj.push(ArrSchedule);
                                }
                                var _ArrSchedule = JSON.stringify(obj);
                                var ScheduleJson = JSON.parse(_ArrSchedule);
                                var ArrGetSchedule = [{
                                    "status": "200",
                                    message: 'Schedule INSERT Ok!',
                                    "data": ScheduleJson
                                }]
                                res.json(ArrGetSchedule);
                            })
                        })
                        //INSERT INTO schedule_details
                        let sql_schedule_details = `SELECT * FROM schedule WHERE code_schedule ="${code_schedule}"`;
                        db.query(sql_schedule_details, (err, rowsk, response) => {
                            if (err) throw err
                            var id_Schedule = Number(rowsk.map(x => x.id).toString());
                            for (var k = 0; k < id_schedule_details.length; k++) {
                                var id_Service_shop = id_schedule_details[k].id_Service_shop;
                                // var working_time = id_schedule_details[k].working_time;
                                var data_schedule_details = {
                                    phone_kh: phone_kh,
                                    id_User: id_User,
                                    id_Schedule: id_Schedule,
                                    id_Service_shop: id_Service_shop,
                                    working_time: fullName_kh,
                                }
                                let is_sql_schedule_details = 'INSERT INTO schedule_details SET ?';
                                db.query(is_sql_schedule_details, [data_schedule_details], (err, rown, fields) => {
                                    if (err) throw err
                                    console.log("Schedule_details INSERT OK")
                                })
                            }
                        })
                    })

                } else {
                    res.json({"status": "400", message: 'schedule No INSERT promotion null  !'});
                }
            });
        } else {
            res.json({"status": "400", message: 'schedule No INSERT !'});
        }
    },
    Get_Open_Schedule: (req, res, next) => {
        let start_time = req.body.start_time;
        let id_User = req.body.id_User;
        if (start_time && id_User != undefined) {
            let sql = `SELECT * FROM schedule_details JOIN schedule ` +
                `ON schedule_details.id_Schedule = schedule.id WHERE start_time LIKE '${start_time}%' and schedule.id_User = ${id_User} `;
            db.query(sql, [start_time, req.params.start_time], (err, rown, fields) => {
                if (err) throw err
                var obj = [];
                for (var i = 0; i < rown.length; i++) {
                    var ArrSchedule = {
                        id: rown[i].id,
                        code_schedule: rown[i].code_schedule,
                        moneys: rown[i].moneys,
                        working_time: rown[i].working_time,
                        phone_kh: rown[i].phone_kh,
                        id_Service_shop: rown[i].id_Service_shop,
                        id_Schedule: rown[i].id_Schedule,
                    };
                    obj.push(ArrSchedule);
                }
                var _ArrSchedule = JSON.stringify(obj);
                var ScheduleJson = JSON.parse(_ArrSchedule);
                var ArrGetSchedule = [{"status": "200", message: 'schedule No INSERT !', "data": ScheduleJson}]
                res.json(ArrGetSchedule);
            })
        } else {
            res.json({"status": "400", message: 'schedule No Get_Open_Schedule !'});
        }
    },
    // thoi gian dawt lich
    Open_Schedule: (req, res, next) => {
        let start_time = req.body.start_time;
        let id_User = req.body.id_User;
        if (start_time && id_User != undefined) {
            let sql = `SELECT * FROM schedule WHERE start_time LIKE '${start_time}%' and schedule.id_User = ${id_User}`;
            console.log("11", sql)
            db.query(sql, [start_time, req.params.start_time], (err, rown, fields) => {
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
                            var status = rown[k].status;
                            var start_time = rown[k].start_time.toString();
                            var end_time = rown[k].end_time.toString();
                            var a = start_time.slice(16, 21);
                            var b = end_time.slice(16, 21);
                            if (x >= a && x <= b) {
                                ArrSchedule = {
                                    working_time: x,
                                    start_time: rown[k].start_time,
                                    end_time: rown[k].end_time,
                                    status: status,
                                };
                                ArrSchedule && objN.push(ArrSchedule)
                                break;
                            } else {
                                if (k == (rown.length - 1)) {
                                    ArrSchedule = {
                                        working_time: x,
                                        status: 3,
                                    };
                                    ArrSchedule && objN.push(ArrSchedule)
                                }
                            }
                        }
                    } else {
                        ArrSchedule = {
                            working_time: x,
                            status: 3,
                        };
                        ArrSchedule && objN.push(ArrSchedule)
                    }

                }
                var ArrGetSchedule = [{"status": "200", message: 'schedule working time !', "data": objN}]
                res.json(ArrGetSchedule);
            })
        } else {
            res.json({"status": "400", message: 'schedule No Open_Schedule !',});

        }
    },

    // store: (req, res) => {
    //     var code_schedule = random_random.randomString(10);
    //     let start_time = req.body.start_time;
    //     let end_time = req.body.end_time;
    //     let moneys = req.body.moneys;
    //     let id_Shop = req.body.id_Shop;
    //     let id_promotion = req.body.id_promotion;
    //     let content_schedule = req.body.content_schedule;
    //     let id_schedule_details = req.body.id_schedule_details;
    //
    //     if (start_time && end_time && moneys && id_Shop && id_promotion && content_schedule != null) {
    //         let sql = `SELECT number FROM promotion WHERE id =${id_promotion}`;
    //         db.query(sql, (err, rows, response) => {
    //             if (err) throw err
    //             var number = rows.map(x => x.number);
    //             var is_number = number.toString();
    //             var minus_point = Math.ceil((moneys * is_number) / 100000);
    //             var data = {
    //                 code_schedule: code_schedule,
    //                 start_time: start_time,
    //                 end_time: end_time,
    //                 moneys: moneys,
    //                 minus_point: minus_point,
    //                 id_Shop: id_Shop,
    //                 id_promotion: id_promotion,
    //                 content_schedule: content_schedule,
    //                 status: 0
    //             }
    //             let sql = `INSERT INTO schedule SET ?`;
    //             db.query(sql, [data], (err, response) => {
    //                 if (err) throw err
    //                 let sqlSELECT = `SELECT MAX(id) as id FROM schedule`;
    //                 db.query(sqlSELECT, (err, rownM, fields) => {
    //                     if (err) throw err
    //                     const Idmap = rownM.map(x => x.id);
    //                     var ServiceJson = JSON.parse(Idmap);
    //                     let _sqlSELECT = 'SELECT * FROM schedule WHERE id = ?';
    //                     db.query(_sqlSELECT, [ServiceJson], (err, rown, fields) => {
    //                         if (err) throw err
    //                         var obj = [];
    //                         for (var i = 0; i < rown.length; i++) {
    //                             var ArrSchedule = {
    //                                 id: rown[i].id,
    //                                 code_schedule: rown[i].code_schedule,
    //                                 start_time: rown[i].start_time,
    //                                 end_time: rown[i].end_time,
    //                                 moneys: rown[i].moneys,
    //                                 minus_point: rown[i].minus_point,
    //                                 phone_nv: rown[i].phone_nv,
    //                                 status: rown[i].status,
    //                                 Username: rown[i].Username,
    //                                 content_schedule: rown[i].content_schedule,
    //                                 created_schedule: rown[i].created_schedule,
    //                             };
    //                             obj.push(ArrSchedule);
    //                         }
    //                         var _ArrSchedule = JSON.stringify(obj);
    //                         var ScheduleJson = JSON.parse(_ArrSchedule);
    //                         var ArrGetSchedule = [{
    //                             "status": "200",
    //                             message: 'Schedule INSERT Ok!',
    //                             "data": ScheduleJson
    //                         }]
    //                         res.json(ArrGetSchedule);
    //                     })
    //                 })
    //                 // INSERT INTO schedule_details
    //                 let sql_schedule_details = `SELECT id FROM schedule WHERE code_schedule ="${code_schedule}"`;
    //                 db.query(sql_schedule_details, (err, rowsk, response) => {
    //                     if (err) throw err
    //                     var id_Schedule = Number(rowsk.map(x => x.id).toString());
    //                     var derts = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00",
    //                         "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    //                         "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00"];
    //
    //
    //                     for (var k = 0; k < id_schedule_details.length; k++) {
    //                         var phone_kh = id_schedule_details[k].phone_kh;
    //                         var id_Service_shop = id_schedule_details[k].id_Service_shop;
    //                         var id_User_kh = id_schedule_details[k].id_User;
    //                         var working_time = id_schedule_details[k].working_time;
    //                         // for (var j = 0; j < derts.length; j++) {
    //                         //     if (derts[j] >= is_start_time) {
    //                         //         if (derts[j] <= is_end_time) {
    //                         var data_schedule_details = {
    //                             phone_kh: phone_kh,
    //                             id_User: id_User_kh,
    //                             id_Schedule: id_Schedule,
    //                             id_Service_shop: id_Service_shop,
    //                             working_time: working_time,
    //                         }
    //                         // if (j == (id_schedule_details.length - 1)) {
    //                         let is_sql_schedule_details = 'INSERT INTO schedule_details SET ?';
    //                         db.query(is_sql_schedule_details, [data_schedule_details], (err, rown, fields) => {
    //                             if (err) throw err
    //                             console.log("Schedule_details INSERT OK")
    //                         })
    //                         // }
    //                     }
    //                     //         }
    //                     //     }
    //                     //
    //                     // }
    //                 })
    //             })
    //         });
    //     } else {
    //         res.json({"status": "400", message: 'schedule No INSERT !'});
    //     }
    //
    // },
}

