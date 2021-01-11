const db = require('../service');
const service_type_model = require('../models/Nails_Service_Type_model');
module.exports = {
    get_service_type: (req, res) => {
        let sql = `SELECT * FROM nails_service_type where status_st =0`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrNews = {
                    [service_type_model.id]: rown[i].id,
                    [service_type_model.name]: rown[i].name,
                    [service_type_model.image_st]: rown[i].image_st,
                    [service_type_model.created_at]: rown[i].created_at,
                };
                obj.push(ArrNews);
            }
            var _ArrNews = JSON.stringify(obj);
            var NewsJson = JSON.parse(_ArrNews);
            var ArrGetNews = [{"status": "200", "data": NewsJson}]
            res.json(ArrGetNews);
        })
    },
    update_service_type: (req, res) => {
        let data = req.body;
        let ServiceTypeId = req.params.ServiceTypeId;
        let sql = 'UPDATE nails_service_type SET ? WHERE id = ?'
        db.query(sql, [data, ServiceTypeId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Update service_type success!'})
        })
    },
    store_service_type: (req, res) => {
        let data = req.body;
        console.log("qqq", JSON.stringify(data))
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO nails_service_type SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = 'SELECT * FROM nails_service_type ORDER BY id DESC LIMIT 1'
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var ArrShop = {
                            [service_type_model.id]: rown[i].id,
                            [service_type_model.name]: rown[i].name,
                            [service_type_model.image_st]: rown[i].image_st,
                            [service_type_model.created_at]: rown[i].created_at,
                        };
                        obj.push(ArrShop);
                    }
                    var _ArrShop = JSON.stringify(obj);
                    var ShopJson = JSON.parse(_ArrShop);
                    var ArrGetShop = [{"status": "200", message: 'nails_service_type INSERT Ok!', "data": ShopJson}]
                    res.json(ArrGetShop);
                })
            })
        } else {
            res.json({"status": "400", message: 'nails_service_type No INSERT !'});
        }
    },
    delete_service_type: (req, res) => {
        let status_st = 1;
        let ServiceTypeId = req.params.ServiceTypeId;
        let sql = 'UPDATE nails_service_type SET ? WHERE id = ?'
        // db.query(sql, [data, ServiceTypeId], (err, response) => {
        //     if (err) throw err
        //     res.json({"status": "200", shop: 'Update service_type success!'})
        // })
        // let sql = 'DELETE FROM service_type WHERE id = ?'
        db.query(sql, [{status_st}, ServiceTypeId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete service_type success!'})
        })
    }
}

