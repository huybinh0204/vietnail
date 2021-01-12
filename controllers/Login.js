const db = require('../service');
const jwt = require('jsonwebtoken');
var md5 = require('md5');
const user_model = require('../models/User_model');
var linkfile = require("../config/OpenRoles")
module.exports = {
    upload_file: (req, res) => {
        var name_file = req.file.path.replace('public', '');
        var name_str = name_file.substr(7);
        console.log("name_str",name_str)
        if (name_str != "aa.png"){
            var image_file = linkfile.url + "/Image/" + name_str;
            res.json({status: "200", error: false, message: 'Upload file OK!', data: [{image_file: image_file}]});
        }else {
            res.json({status: "400", error: true, message: 'NO Upload file!'});
        }
    },
    login_user: async (req, res) => {
        let phone = req.body.phone;
        let password = req.body.password;
        console.log("12",phone + ":",password)
        if (phone && password != undefined || '') {
            var sql = `SELECT * FROM user WHERE phone = "${phone}" and password = "${md5(password)}"`;
            console.log("sql",sql)
            db.query(sql, [phone, password], (err, rown, fields) => {
                if (err) throw err
                try {
                    if (rown != "" && rown[0].is_active === 0) {
                        let payload = {
                            [user_model.id]: rown[0].id,
                            [user_model.phone]: phone,
                            [user_model.password]: password,
                            [user_model.email]: rown[0].email,
                            [user_model.fullname]: rown[0].fullname,
                            [user_model.roles_id]: rown[0].roles_id,
                            [user_model.avatar]: rown[0].avatar,
                            [user_model.address]: rown[0].address,
                            [user_model.is_active]: rown[0].is_active,
                            type: "access"
                        }
                        var sql_key = `SELECT * FROM info_config`;
                        db.query(sql_key, (err, rown_key, fields) => {
                            if (err) throw err
                            let token = jwt.sign(payload, rown_key[0].conten_config, {
                                algorithm: 'HS256',
                                expiresIn: 5184000
                            })
                            console.log("access")
                            res.json({status: "200", error: false, message: 'Login true!', "token": token});
                        });
                    } else {
                        res.json({status: "400", error: true, message: 'Login false!'});
                    }
                } catch (e) {
                    console.log("err", e.toString())
                }
            })
        } else {
            res.json({status: "400", error: true, message: 'Login false!'});
        }
    }
}

