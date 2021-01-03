const db = require('../service');
var is_OFFSET = 0;
var is_LIMIT = 10;
var Eis_OFFSET;
module.exports = {
    get: (req, res) => {
        is_OFFSET = is_OFFSET + is_LIMIT
        var sql = `SELECT * FROM service_shop WHERE is_status = 0`;
        // if (is_OFFSET <= 10){
        //     sql = `SELECT * FROM service_shop LIMIT ${is_LIMIT} OFFSET 0 `;
        // }else{
        //     Eis_OFFSET = is_OFFSET - is_LIMIT;
        //     sql = `SELECT * FROM service_shop LIMIT ${is_LIMIT} OFFSET ${Eis_OFFSET} `;
        // }
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrService = {
                    id: rown[i].id,
                    title: rown[i].title,
                    content: rown[i].content,
                    moneys_ser: rown[i].moneys_ser,
                    image: rown[i].image,
                    service_shop_time: rown[i].created_at,
                    created_translate: rown[i].created_translate,
                };
                obj.push(ArrService);
            }
            var _ArrService = JSON.stringify(obj);
            var ServiceJson = JSON.parse(_ArrService);
            var ArrGetService = [{"status": "200", "data": ServiceJson}]
            res.json(ArrGetService);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM service_shop WHERE is_status = 0 and id = ?'
        db.query(sql, [req.params.serviceId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrService = {
                    id: rown[i].id,
                    title: rown[i].title,
                    content: rown[i].content,
                    moneys_ser: rown[i].moneys_ser,
                    image: rown[i].image,
                    service_shop_time: rown[i].created_at,
                    created_translate: rown[i].created_translate,
                };
                obj.push(ArrService);
            }
            var _ArrService = JSON.stringify(obj);
            var ServiceJson = JSON.parse(_ArrService);
            var ArrGetService = [{"status": "200", "data": ServiceJson}]
            res.json(ArrGetService);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let serviceId = req.params.serviceId;
        let sql = 'UPDATE service_shop SET ? WHERE id = ?'
        db.query(sql, [data, serviceId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", message: 'Update service shop success!'})
        })
    },
    store: (req, res) => {

        let title = req.body.title;
        let content = req.body.content;
        let moneys_ser = req.body.moneySer;
        let image = req.body.imagePath;
        let id_Shop = 1;
        let is_status = 0;
        let data = {title,content,moneys_ser,image,id_Shop,is_status};

        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO service_shop SET ?`;
            console.log("111",sql)
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = `SELECT * FROM service_shop ORDER BY id DESC LIMIT 1`;
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var ArrService = {
                            id: rown[i].id,
                            title: rown[i].title,
                            content: rown[i].content,
                            moneys_ser: rown[i].moneys_ser,
                            image: rown[i].image,
                            service_shop_time: rown[i].created_at,
                            created_translate: rown[i].created_translate,
                        };
                        obj.push(ArrService);
                    }
                    var _ArrService = JSON.stringify(obj);
                    var ServiceJson = JSON.parse(_ArrService);
                    var ArrGetService = [{"status": "200", message: 'Service_shop INSERT Ok!', "data": ServiceJson}]
                    res.json(ArrGetService);
                })
            })
        } else {
            res.json({"status": "400", message: 'Service_shop No INSERT !'});
        }
    },
    delete: (req, res) => {
        let id = req.params.serviceId
        let is_status = 1
        let sql = `UPDATE service_shop SET ? WHERE id = ${id}`;
        console.log("11",sql)
        db.query(sql, [{is_status,id}], (err, response) => {
            if (err) throw err
            res.json({"status": "200", message: 'Delete success!'})
        })
    }
}

