import mongoose from "mongoose";

const notificationModel = new mongoose.Schema({
    content: {
        type: String
    }
}, {timestamps: true})

const NotificationModel = mongoose.model('Notification', notificationModel)
export default NotificationModel