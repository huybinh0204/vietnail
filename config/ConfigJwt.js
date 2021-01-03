const jwt = require('jsonwebtoken');
// const rt = require("./OpenRoles");
const db = require('../service');
module.exports = {
    checkToken: (req, res, next)=> {
        let authorize_token = req.get("token_nails");
        let jwt_token = "";
        if (authorize_token === undefined) {
            res.status(401);
            res.send({"status": "401","message":"JWT Token cloes not begin with bearer!"});
            return;
        } else if (authorize_token.startsWith("")) {
            jwt_token = authorize_token.substring(0);
        } else {
            res.status(401);
            res.send({"status": "401","message":"JWT Token cloes not begin with bearer!"});
            return;
        }

        var sql_key = `SELECT * FROM info_config`;
        db.query(sql_key, (err, rown_key, fields) => {
            if (err) throw err
            try {
                let payload = jwt.verify(jwt_token, rown_key[0].conten_config);
                if (payload["type"] != 'access')
                    throw 'invalis JWT token';
                req.token = jwt_token;
                next();
            } catch (e) {
                console.error("Invalis JWT Token")
                res.status(401);
                res.send({"status": "401","message":"Invalis JWT Token !"});
            }
        });

    }
}
