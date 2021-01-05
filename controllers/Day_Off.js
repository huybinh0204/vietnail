const db = require('../service');
const day_off_model = require('../models/Day_Off_model');
module.exports = {
    // đơn chưa duyệt
    get_Day_Off: (req, res) => {
        // let DayOffId = req.params.DayOffId
        let params_status  = req.query.is_status;
        console.log("params_is",params_status)
        let sql = `SELECT * FROM day_off where is_status = ${params_status}`;
        db.query(sql,[params_status], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var Arrday_off = {
                    [day_off_model.id]: rown[i].id,
                    [day_off_model.begin_date]: rown[i].begin_date,
                    [day_off_model.end_date]: rown[i].end_date,
                    [day_off_model.content]: rown[i].content,
                    [day_off_model.is_status]: rown[i].is_status,
                    [day_off_model.user_id_admin]: rown[i].user_id_admin,
                    [day_off_model.user_id_nv]: rown[i].user_id_nv,
                    [day_off_model.created_single]: rown[i].created_single,
                };
                obj.push(Arrday_off);
            }
            var _Arrday_off = JSON.stringify(obj);
            var day_offJson = JSON.parse(_Arrday_off);
            var ArrGetday_off = [{"status": "200","message": 'danh sach don tu !',"data": day_offJson}]
            res.json(ArrGetday_off);
        })
    },
    update_Day_Off: (req, res) => {
        let data = req.body;
        let begin_date = req.body.begin_date;
        let end_date = req.body.end_date;
        let content = req.body.content;
        let user_id_admin = req.body.user_id_admin;
        let is_status = req.body.is_status;
        let DayOffId = req.params.DayOffId;
        if (begin_date && end_date && content != '' || undefined) {
            let sql = 'UPDATE day_off SET ? WHERE id = ?'
            db.query(sql, [data, DayOffId], (err, response) => {
                if (err) throw err
                res.json({"status": "200", shop: 'Update day_off success!'})
            })
        }else if((user_id_admin && is_status != undefined) && (user_id_admin != null && is_status != 0) ){
            let sql = 'UPDATE day_off SET ? WHERE id = ?'
            db.query(sql, [data, DayOffId], (err, response) => {
                if (err) throw err
                res.json({"status": "200", shop: 'duyet don thanh cong!'})
            })

        }else{
            res.json({"status": "400", shop: 'tin đơn từ thất bại !'})
        }
    },
    store_Day_Off: (req, res) => {
        let data = req.body;
        let begin_date = req.body.begin_date;
        let end_date = req.body.end_date;
        let content = req.body.content;
        let user_id_nv = req.body.user_id_nv;
        if (begin_date && end_date && user_id_nv && content != '' || undefined) {
            let sql = `INSERT INTO day_off SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = 'SELECT * FROM day_off ORDER BY id DESC LIMIT 1'
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var Arrday_off = {
                            [day_off_model.id]: rown[i].id,
                            [day_off_model.begin_date]: rown[i].begin_date,
                            [day_off_model.end_date]: rown[i].end_date,
                            [day_off_model.content]: rown[i].content,
                            [day_off_model.is_status]: rown[i].is_status,
                            [day_off_model.user_id_admin]: rown[i].user_id_admin,
                            [day_off_model.user_id_nv]: rown[i].user_id_nv,
                            [day_off_model.created_single]: rown[i].created_single,
                        };
                        obj.push(Arrday_off);
                    }
                    var _Arrday_off = JSON.stringify(obj);
                    var day_offJson = JSON.parse(_Arrday_off);
                    var ArrGetday_off = [{"status": "200","message": 'Tạo đơn thành công!',"data": day_offJson}]
                    res.json(ArrGetday_off);
                })
            })
        } else {
            res.json({"status": "400", "message": 'Tạo đơn thất bại!'});
        }
    },
    delete_Day_Off: (req, res) => {
        let sql = 'DELETE FROM day_off WHERE is_status = 0 and id = ?'
        db.query(sql, [req.params.DayOffId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete Day_Off success!'})
        })
    }
}

