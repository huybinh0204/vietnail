const db = require('../service');
const ruoles_model = require('../models/Roles_model');
// loại quyền
module.exports = {
    // get cac quyen khi taoj taif khaon quyen
    get: (req, res) => {
        let sql = `SELECT * FROM roles`;
        db.query(sql, (err, rown, fields) => {
            if (err) throw err
            res.json(rown);
        })
    },
    // // update quyeenf
    // update: (req, res) => {
    //     let dataname = req.body.name;
    //     if (dataname != "" && dataname != " ") {
    //         let data = req.body;
    //         let rolesId = req.params.rolesId;
    //         let sql = `UPDATE roles SET ? WHERE id >= 2 and id = ?`;
    //         console.log("aaa", data)
    //         db.query(sql, [data, rolesId], (err, response) => {
    //             if (err) throw err
    //             if (rolesId >= 2) {
    //                 res.json({"status": "200", "message": 'Update success!'})
    //             } else {
    //                 res.json({"status": "400", "message": 'No Update!'})
    //             }
    //
    //         })
    //     }else {
    //         res.json({"status": "400", "message": 'Name Update Null!'});
    //     }
    // },
    // store: (req, res) => {
    //     let sql = `INSERT INTO roles SET ?`;
    //     console.log("111",sql);
    //     db.query(sql, [req.body], (err, response) => {
    //         if (err) throw err
    //         let sqlSELECT = `SELECT * FROM roles`;
    //         db.query(sqlSELECT, (err, rown, fields) => {
    //             if (err) throw err
    //             var obj = [];
    //             for (var i = 0; i < rown.length; i++) {
    //                 var INSERTUser = {
    //                     [ruoles_model.type]: rown[i].id,
    //                     [ruoles_model.name]: rown[i].name,
    //                 };
    //                 obj.push(INSERTUser);
    //             }
    //             var _INSERTRuoles = JSON.stringify(obj);
    //             var INSERTRuolesJson = JSON.parse(_INSERTRuoles);
    //             res.json({"status": "200", "message": 'User INSERT Ok!', "data": INSERTRuolesJson})
    //         })
    //     })
    // },
    // delete: (req, res) => {
    //     let sql = 'DELETE FROM roles WHERE id >= 2  id = ?'
    //     db.query(sql, [req.params.rolesId], (err, response) => {
    //         if (err) throw err
    //         if(rolesId >= 2){
    //             res.json({"status": "200", "message": 'Delete success!'})
    //         }else {
    //             res.json({"status": "400", "message": 'No Delete!'})
    //         }
    //     })
    // }
}

