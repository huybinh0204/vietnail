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
    let LoginCtrl = require('../controllers/Login');
    let Post_ContentCtrl = require('../controllers/Post_Content');
    let OrdersCtrl = require('../controllers/Orders');
    let Order_StaffsCtrl = require('../controllers/Order_Staffs');
    let Notify_UserCtrl = require('../controllers/Notify_User');
    let Service_TypeCtrl = require('../controllers/Nails_Service_Type');
    let Nails_ServiceCtrl = require('../controllers/Nails_Service');
    let Day_OffCtrl = require('../controllers/Day_Off');
    let NotificationCtrl = require('../controllers/Notification');
    //order

    // let ScheduleCtrl = require('../controllers/Schedule');

    // let RolesCtrl = require('../controllers/Roles');
    // let Schedule_historicalCtrl = require('../controllers/Schedule_historical');

    app.route('/')
        .get(UserCtrl._get)
// Login đăng nhập
    app.route('/api/login/')
        .post(LoginCtrl.login_user);
// exit đăng nhập

// danh sách quyền
//     app.route('/api/roles/')
//         .get(token_config.checkToken, RolesCtrl.get);

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
    //suwa thong tin user
    app.route('/api/user/edit/:userId')
        .put(UserCtrl.update);
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


// baif viet
    // api News shop bài
    app.route('/api/post_content/')
        .get(token_config.checkToken, Post_ContentCtrl.get_post_content);

    app.route('/api/post_content/:PostContentId')
        .get(token_config.checkToken, Post_ContentCtrl.detail_post_content);

    app.route('/api/post_content/edit/:PostContentId')
        .put(token_config.checkToken, Post_ContentCtrl.update_post_content);

    app.route('/api/post_content/delete/:PostContentId')
        .delete(token_config.checkToken, Post_ContentCtrl.delete_post_content);

    app.route('/api/post_content/')
        .post(token_config.checkToken, Post_ContentCtrl.store_post_content);

// exit baif viet

// api uploas ảnh
    app.route('/api/upload_file/')
        .post(upload.single('image_file'), LoginCtrl.upload_file);

// exit uploas ảnh

// hoá đơn
    // api schedule taats car hoas ddown
    app.route('/api/get_orders/:orders_id')
        .get(OrdersCtrl.get_orders);

    app.route('/api/get_orders_status/')
        .get(OrdersCtrl.get_orders_status);

    // tao hoas don
    app.route('/api/order/store_orders/')
        .post(OrdersCtrl.store_orders);


    app.route('/api/order/store_status/:OrderStatusID')
        .post(OrdersCtrl.store_status);

    // thòi gian hiên thị chon
    app.route('/api/get_orders_list/:user_id_kh')
        .get(OrdersCtrl.get_orders_list);

    // thự động set nhân viênlàm nail
    app.route('/api/order_staffs/')
        .get(Order_StaffsCtrl.store_order_staffs);
    // store_order_staffs_TN thu ngan theem gio
    app.route('/api/order_staffs/store_order_staffs/')
        .post(Order_StaffsCtrl.store_order_staffs_TN);


    app.route('/api/order_staffs/statistical_service/')
        .post(Order_StaffsCtrl.statistical_service);

    app.route('/api/order_staffs/statistical_service_moneys/')
        .post(Order_StaffsCtrl.statistical_service_moneys);

    // store_order_staffs_TN thu ngan theem gio
    app.route('/api/get_order_details/')
        .get(Order_StaffsCtrl.get_order_details);


    // store_order_staffs_TN thu ngan theem gio
    app.route('/api/order_staffs/delete_order_details/')
        .post(Order_StaffsCtrl.delete_order_details);

    app.route('/api/order_staffs/get_date_time/')
        .get(Order_StaffsCtrl.get_date_time);

    // thự động set nhân viênlàm nail
    app.route('/api/open_settime_order_don/')
        .get(OrdersCtrl.open_settime_order_don);


    // thự động set nhân viênlàm nail
    cron.schedule('*/1 * * * *', () => {
        app.get(OrdersCtrl.open_settime_order());
    }, {
        scheduled: true,
        timezone: "Asia/Bangkok"
    });

    // thự động set nhân viênlàm nail
    app.route('/api/get_list_time/')
        .get(OrdersCtrl.get_list_time);

    // //    status 0 , 1 ,2 , 3 , 4
    // app.route('/api/schedule_historical/:schedule_historicalID')
    //     .post(token_config.checkToken, Schedule_historicalCtrl.store);


//    exit hoá đơn

// notify
    // thêm key notify
    app.route('/api/notify_userkey/')
        .post(NotificationCtrl.store_notify);

    app.route('/api/get_notify/:user_id')
        .get(NotificationCtrl.get_notify);

    // cron.schedule('*/15 * * * *', () => {
    //
    //     app.get(Notify_UserCtrl.get_time_schedule())
    //     app.get(Notify_UserCtrl.get_notify_kh())
    // }, {
    //     scheduled: true,
    //     timezone: "Asia/Bangkok"
    // });
//exit notify

// loai dich vu
    // danh sach loai dich vu
    app.route('/api/get_service_type/')
        .get(Service_TypeCtrl.get_service_type);

    app.route('/api/service_type/edit/:ServiceTypeId')
        .put(Service_TypeCtrl.update_service_type);

    app.route('/api/service_type/')
        .post(Service_TypeCtrl.store_service_type);

    app.route('/api/service_type/delete/:ServiceTypeId')
        .delete(Service_TypeCtrl.delete_service_type);
//exit loai dich vu
// api service dich vu
    app.route('/api/nails_service/')
        .get( Nails_ServiceCtrl.get_service);

    app.route('/api/get_service_list/')
        .get( Nails_ServiceCtrl.get_service_list);

    app.route('/api/nails_service/delete/:serviceId')
        .delete(Nails_ServiceCtrl.delete_service);

    app.route('/api/nails_service/')
        .post(Nails_ServiceCtrl.store_service);

    app.route('/api/nails_service/edit/:serviceId')
        .put(Nails_ServiceCtrl.update_service);
// exit api service dich vu

//  làm đơn từ xin nghỉ

    // danh sach đơn đuoc duyet
    app.route('/api/day_off/')
        .get(Day_OffCtrl.get_Day_Off);

    app.route('/api/day_off/edit/:DayOffId')
        .put(Day_OffCtrl.update_Day_Off);

    app.route('/api/day_off/')
        .post(Day_OffCtrl.store_Day_Off);

    app.route('/api/day_off/delete/:DayOffId')
        .delete(Day_OffCtrl.delete_Day_Off);
//làm đơn từ xin nghỉ

};
