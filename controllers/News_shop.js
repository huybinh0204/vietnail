const db = require('../service');
const news_shop_model = require('../models/News_shop_model');
module.exports = {
    get: (req, res) => {
        let sql = `SELECT * FROM news_shop`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrNews = {
                    [news_shop_model.id]: rown[i].id,
                    [news_shop_model.title]: rown[i].title,
                    [news_shop_model.image]: rown[i].image,
                    [news_shop_model.content_news]: rown[i].content_news,
                    [news_shop_model.id_Shop]: rown[i].id_Shop,
                    [news_shop_model.created_news]: rown[i].created_news,
                };
                obj.push(ArrNews);
            }
            var _ArrNews = JSON.stringify(obj);
            var NewsJson = JSON.parse(_ArrNews);
            var ArrGetNews = [{"status": "200", "data": NewsJson}]
            res.json(ArrGetNews);
        })
    },
    detail: (req, res) => {
        let sql = 'SELECT * FROM news_shop WHERE id = ?'
        db.query(sql, [req.params.NewsShopId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrNews = {
                    [news_shop_model.id]: rown[i].id,
                    [news_shop_model.title]: rown[i].title,
                    [news_shop_model.image]: rown[i].image,
                    [news_shop_model.content_news]: rown[i].content_news,
                    [news_shop_model.id_Shop]: rown[i].id_Shop,
                    [news_shop_model.created_news]: rown[i].created_news,
                };
                obj.push(ArrNews);
            }
            var _ArrNews = JSON.stringify(obj);
            var NewsJson = JSON.parse(_ArrNews);
            var ArrGetNews = [{"status": "200", "data": NewsJson}]
            res.json(ArrGetNews);
        })
    },
    update: (req, res) => {
        let data = req.body;
        let NewsShopId = req.params.NewsShopId;
        let sql = 'UPDATE news_shop SET ? WHERE id = ?'
        db.query(sql, [data, NewsShopId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Update news_shop success!'})
        })
    },
    store: (req, res) => {
        let data = req.body;
        console.log("qqq", JSON.stringify(data))
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO news_shop SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = 'SELECT * FROM news_shop ORDER BY id DESC LIMIT 1'
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var ArrShop = {
                            [news_shop_model.id]: rown[i].id,
                            [news_shop_model.title]: rown[i].title,
                            [news_shop_model.image]: rown[i].image,
                            [news_shop_model.content_news]: rown[i].content_news,
                            [news_shop_model.id_Shop]: rown[i].id_Shop,
                            [news_shop_model.created_news]: rown[i].created_news,
                        };
                        obj.push(ArrShop);
                    }
                    var _ArrShop = JSON.stringify(obj);
                    var ShopJson = JSON.parse(_ArrShop);
                    var ArrGetShop = [{"status": "200", message: 'News_shop INSERT Ok!', "data": ShopJson}]
                    res.json(ArrGetShop);
                })
            })
        } else {
            res.json({"status": "400", message: 'News_shop No INSERT !'});
        }
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM news_shop WHERE id = ?'
        db.query(sql, [req.params.NewsShopId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete news_shop success!'})
        })
    }
}

