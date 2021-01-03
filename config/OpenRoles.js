module.exports = {
    randomString:(len, charSet) =>{
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    },
    open_otp:(len, charSet) =>{
        charSet = charSet || '0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz,randomPoz+1);
        }
        return randomString;
    }
}
module.exports.url = 'http://vietnail.tk'

// module.exports.url = 'http://localhost:8080';
//notyfile
module.exports.Key_Notify = "";
module.exports.urls_notify = "https://fcm.googleapis.com/fcm/send";
module.exports.priority_notify = 'high';
module.exports.Authorization_notify = 'key=AAAAI03A8A0:APA91bGsIIK6IvC_0r_mkJo38wpIHuHZoNbGqNzM_17s5FSv7L8fxKCf4fLoB0t61RZb4_dbGYbBdeP2FPxTx8P2K0MAaUJcaTXde4IB00k85yvCKb8SyxnSXUKmvkyI7XjOqrGHgXAI';
module.exports.notification_notify = {
    "title": "Chào bạn",
    "text": "Nhớ xác nhận khách hàng đến !"
};
module.exports.notification_notify_user = {
    "title": "Chào bạn",
    "text": "Sắp đến giờ làm nail cửa bạn!"
};
module.exports.notification_notify_userk = {
    "title": "Chào bạn",
    "text": "Đã đến giờ làm nails cửa bạn bạn đến chưa !"
};
module.exports.notification_notify_usern = {
    "title": "Chào bạn",
    "text": "Bạn đến muộn cửa hàng huỷ đơn cửa bạn !"
};
module.exports.data_notify_userl = {
    "title": "Firebase Notification Example",
    "detail": "This firebase"
};
//
module.exports.esms_url = 'http://rest.esms.vn/MainService.svc/json/SendMultipleMessage_V4_get'
module.exports.ApiKey = 'F48260F00D837259291DA540B3270C';
module.exports.SecretKey = 'E98BC403500A84C321D11811EC34CC'
module.exports.Brandname = 'Verify';
module.exports.SmsType = 2;
