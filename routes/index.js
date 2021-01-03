var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var shortid = require('shortid');
var multer = require('multer');
router.use(bodyParser.json());
let token_config = require('../config/ConfigJwt');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/Image');

    }, filename: function (req, file, cb) {
        var sample_str = file.originalname.split(" ").join("_");
        var a = shortid.generate() + "00" + sample_str;
        var _LowerCase = (a.slice(0, 100)).toLowerCase();
        try {
            if (_LowerCase.endsWith(".raw") || _LowerCase.endsWith(".flv")
                || _LowerCase.endsWith(".jpeg") || _LowerCase.endsWith(".png") || _LowerCase.endsWith(".gif")
                || _LowerCase.endsWith(".wmv") || _LowerCase.endsWith(".mp3") || _LowerCase.endsWith(".jpg")
                || _LowerCase.endsWith(".psd") || _LowerCase.endsWith(".mp4") || _LowerCase.endsWith(".mov")
                || _LowerCase.endsWith(".docx") || _LowerCase.endsWith(".txt") || _LowerCase.endsWith(".pdf") == true) {
                cb(null, shortid.generate() + "00" + file.originalname)
            } else {
                cb(null, "aa.png")
            }
        } catch (e) {
            console.log("err", e.toString())
        }
    }
});
var upload = multer({storage: storage});
var cron = require('node-cron');
module.exports = function (app) {
    let UserCtrl = require('../controllers/User');
    let ServiceCtrl = require('../controllers/Service_shop');
    //order
    let OrdersCtrl = require('../controllers/Orders');
    let ScheduleCtrl = require('../controllers/Schedule');
    let LoginCtrl = require('../controllers/Login');
    let NewsCtrl = require('../controllers/News_shop');
    let RolesCtrl = require('../controllers/Roles');
    let Schedule_historicalCtrl = require('../controllers/Schedule_historical');
    let Notify_UserCtrl = require('../controllers/Notify_User');
    // let NotificationCtrl = require('../controllers/Notification');
    // app.route('/')
    //     .get(UserCtrl._get)
// Login đăng nhập
    app.route('/api/login/')
        .post(LoginCtrl.login_user);
// exit đăng nhập

// danh sách quyền
    app.route('/api/roles/')
        .get(token_config.checkToken, RolesCtrl.get);

//    exit quyền

// api user quản lý user (hien thi tat ca user)
    app.route('/api/user/')
        .get(UserCtrl.get);
//    exit  User

// đăng ký tài khoản đổi mật khẩu quên mật khẩu

    // quên mật khẩu
    app.route('/api/check_phone/')
        .post(UserCtrl.check_phone);
    //chek mã otp
    app.route('/api/check_otp/')
        .post(UserCtrl.check_otp);

    // doi mat khau
    app.route('/api/user/edit_password/:userId')
        .put(UserCtrl.update_password);

    // thêm tài khoản
    app.route('/api/user/')
        .post(UserCtrl.store);
    // khi dắng nhập lấy thôgn tin cá nhân
    app.route('/api/user/:userId')
        .get(token_config.checkToken, UserCtrl.detail);


    // sử thông tin tài kh
    // app.route('/api/user/edit/:userId')
    //     .put(token_config.checkToken, UserCtrl.update);


    //Khoa tai khoản (xoá tài khoản)
    // app.route('/api/user/delete/:userId')
    //     .delete(token_config.checkToken, UserCtrl.delete);

    //Mo tai khoản (Mo tài khoản), khoas tai khoan
    app.route('/api/user/is_active/:userId')
        .put( UserCtrl.roles_is_active);
//    exit đăng ký tài khoản đổi mật khẩu quên mật khẩu


// api service dich vu
    app.route('/api/service/')
        .get(token_config.checkToken, ServiceCtrl.get);

    app.route('/api/service/delete/:serviceId')
        .delete(token_config.checkToken, ServiceCtrl.delete);

    app.route('/api/service/')
        .post(token_config.checkToken, ServiceCtrl.store);

    app.route('/api/service/edit/:serviceId')
        .put(token_config.checkToken, ServiceCtrl.update);

// baif viet
    // api News shop bài
    app.route('/api/news_shop/')
        .get(token_config.checkToken, NewsCtrl.get);

    app.route('/api/news_shop/:NewsShopId')
        .get(token_config.checkToken, NewsCtrl.detail);

    app.route('/api/news_shop/edit/:NewsShopId')
        .put(token_config.checkToken, NewsCtrl.update);

    app.route('/api/news_shop/delete/:NewsShopId')
        .delete(token_config.checkToken, NewsCtrl.delete);

    app.route('/api/news_shop/')
        .post(token_config.checkToken, NewsCtrl.store);

// exit baif viet



// api uploas ảnh
    app.route('/api/upload_file/')
        .post(upload.single('image_file'), LoginCtrl.upload_file);

// exit uploas ảnh

// hoá đơn
    // api schedule taats car hoas ddown
    app.route('/api/get_orders/')
        .get(token_config.checkToken, OrdersCtrl.get_orders);

    // tao hoas don
    app.route('/api/order/store_orders/')
        .post(OrdersCtrl.store_orders);

    app.route('/api/schedule/get_date_time/')
        .get(token_config.checkToken, ScheduleCtrl.get_date_time);

    //list thoi gian dat licj
    app.route('/api/schedule/:start_time')
        .post(token_config.checkToken, ScheduleCtrl.Open_Schedule);


    //chi tiet hoas down
    app.route('/api/schedule/:scheduleId')
        .get(token_config.checkToken, ScheduleCtrl.detail);

    //    status 0 , 1 ,2 , 3 , 4
    app.route('/api/schedule_historical/:schedule_historicalID')
        .post(token_config.checkToken, Schedule_historicalCtrl.store);


//    exit hoá đơn

// notify
    // thêm key notify
    app.route('/api/notify_userkey/')
        .post(Notify_UserCtrl.store);

    // cron.schedule('*/15 * * * *', () => {
    //
    //     app.get(Notify_UserCtrl.get_time_schedule())
    //     app.get(Notify_UserCtrl.get_notify_kh())
    // }, {
    //     scheduled: true,
    //     timezone: "Asia/Bangkok"
    // });
//exit notify

};
