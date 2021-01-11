const db = require('../service');
const nails_service_model = require('../models/Nails_Service_model');
module.exports = {
    get_service: (req, res) => {
        // let service_type_id  = req.query.id;
        let sql = `SELECT * FROM nails_service_type where status_st =0`;
        db.query(sql, (err, rowns, fields) => {
            if (err) throw err
            var sql_a = `SELECT * FROM nails_service WHERE is_status = 0`;
            db.query(sql_a, (err, rown, fields) => {
                if (err) throw err
                var objn = [];
                for (var l = 0; l < rowns.length; l++) {
                    var service_type_id = rowns[l].id
                    console.log("service_type_id", service_type_id)
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        if (service_type_id == rown[i].service_type_id) {
                            var Arrservice = {
                                [nails_service_model.id]: rown[i].id,
                                [nails_service_model.title]: rown[i].title,
                                [nails_service_model.content]: rown[i].content,
                                [nails_service_model.moneys_sv]: rown[i].moneys_sv,
                                [nails_service_model.image]: rown[i].image,
                                [nails_service_model.service_type_id]: rown[i].service_type_id,
                                [nails_service_model.time_service]: rown[i].time_service,
                            };
                            obj.push(Arrservice);
                        }
                    }
                    var Arrservicek = {
                        id_stype: service_type_id,
                        service_nails: obj,
                    };
                    objn.push(Arrservicek);

                }
                var _Arrservice = JSON.stringify(objn);
                var serviceJson = JSON.parse(_Arrservice);
                var ArrGetservice = [{"status": "200", "data": serviceJson}]
                res.json(ArrGetservice);
            })
        })

    },
    update_service: (req, res) => {
        let data = req.body;
        let serviceId = req.params.serviceId;
        let sql = 'UPDATE nails_service SET ? WHERE id = ?'
        db.query(sql, [data, serviceId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Update nails_service success!'})
        })
    },
    store_service: (req, res) => {
        let data = req.body;
        let title = req.body.title;
        let content = req.body.content;
        let moneys_sv = req.body.moneys_sv;
        let image = req.body.image;
        let time_service = req.body.time_service;
        let service_type_id = req.body.service_type_id;
        if (service_type_id && moneys_sv != undefined && content && title && time_service && image != "" || undefined) {
            let sql = `INSERT INTO nails_service SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = 'SELECT * FROM nails_service ORDER BY id DESC LIMIT 1'
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var Arrservice = {
                            [nails_service_model.id]: rown[i].id,
                            [nails_service_model.title]: rown[i].title,
                            [nails_service_model.content]: rown[i].content,
                            [nails_service_model.moneys_sv]: rown[i].moneys_sv,
                            [nails_service_model.image]: rown[i].image,
                            [nails_service_model.time_service]: rown[i].time_service,
                        };
                        obj.push(Arrservice);
                    }
                    var _Arrservice = JSON.stringify(obj);
                    var serviceJson = JSON.parse(_Arrservice);
                    var ArrGetservice = [{"status": "200", message: 'nails_service INSERT Ok!', "data": serviceJson}]
                    res.json(ArrGetservice);
                })
            })
        } else {
            res.json({"status": "400", message: 'nails_service No INSERT !'});
        }
    },
    delete_service: (req, res) => {
        let data = {is_status: 1}
        let sql = 'UPDATE nails_service SET ? WHERE id = ?'
        db.query(sql, [data, req.params.serviceId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete service_type success!'})
        })
    }
}

