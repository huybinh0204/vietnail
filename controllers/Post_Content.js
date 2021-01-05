const db = require('../service');
const post_content_model = require('../models/Post_Content_model');
module.exports = {
    get_post_content: (req, res) => {
        let sql = `SELECT * FROM post_content`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrNews = {
                    [post_content_model.id]: rown[i].id,
                    [post_content_model.title]: rown[i].title,
                    [post_content_model.image]: rown[i].image,
                    [post_content_model.content]: rown[i].content,
                    [post_content_model.user_id]: rown[i].user_id,
                    [post_content_model.created_at]: rown[i].created_at,
                };
                obj.push(ArrNews);
            }
            var _ArrNews = JSON.stringify(obj);
            var NewsJson = JSON.parse(_ArrNews);
            var ArrGetNews = [{"status": "200", "data": NewsJson}]
            res.json(ArrGetNews);
        })
    },
    detail_post_content: (req, res) => {
        let sql = 'SELECT * FROM post_content WHERE id = ?'
        db.query(sql, [req.params.PostContentId], (err, rown, fields) => {
            if (err) throw err
            var obj = [];
            for (var i = 0; i < rown.length; i++) {
                var ArrNews = {
                    [post_content_model.id]: rown[i].id,
                    [post_content_model.title]: rown[i].title,
                    [post_content_model.image]: rown[i].image,
                    [post_content_model.content]: rown[i].content,
                    [post_content_model.user_id]: rown[i].user_id,
                    [post_content_model.created_at]: rown[i].created_at,
                };
                obj.push(ArrNews);
            }
            var _ArrNews = JSON.stringify(obj);
            var NewsJson = JSON.parse(_ArrNews);
            var ArrGetNews = [{"status": "200", "data": NewsJson}]
            res.json(ArrGetNews);
        })
    },
    update_post_content: (req, res) => {
        let data = req.body;
        let PostContentId = req.params.PostContentId;
        let sql = 'UPDATE post_content SET ? WHERE id = ?'
        db.query(sql, [data, PostContentId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Update post_content success!'})
        })
    },
    store_post_content: (req, res) => {
        let data = req.body;
        console.log("qqq", JSON.stringify(data))
        if (JSON.stringify(data) != '{}') {
            let sql = `INSERT INTO post_content SET ?`;
            db.query(sql, [data], (err, response) => {
                if (err) throw err
                let _sqlSELECT = 'SELECT * FROM post_content ORDER BY id DESC LIMIT 1'
                db.query(_sqlSELECT, (err, rown, fields) => {
                    if (err) throw err
                    var obj = [];
                    for (var i = 0; i < rown.length; i++) {
                        var ArrShop = {
                            [post_content_model.id]: rown[i].id,
                            [post_content_model.title]: rown[i].title,
                            [post_content_model.image]: rown[i].image,
                            [post_content_model.content]: rown[i].content,
                            [post_content_model.user_id]: rown[i].user_id,
                            [post_content_model.created_at]: rown[i].created_at,
                        };
                        obj.push(ArrShop);
                    }
                    var _ArrShop = JSON.stringify(obj);
                    var ShopJson = JSON.parse(_ArrShop);
                    var ArrGetShop = [{"status": "200", message: 'post_content INSERT Ok!', "data": ShopJson}]
                    res.json(ArrGetShop);
                })
            })
        } else {
            res.json({"status": "400", message: 'post_content No INSERT !'});
        }
    },
    delete_post_content: (req, res) => {
        let sql = 'DELETE FROM post_content WHERE id = ?'
        db.query(sql, [req.params.PostContentId], (err, response) => {
            if (err) throw err
            res.json({"status": "200", shop: 'Delete post_content success!'})
        })
    }
}

