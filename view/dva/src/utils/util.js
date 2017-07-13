/**
   * 时间格式转换
   * timestamp -> yyyy-MM-dd hh:mm
   * @param {*} timestamp 
   */
exports.formateDate = function (timestamp) {
    if (timestamp == null || timestamp == undefined) {
        return "";
    }
    var date = new Date(timestamp);
    var dateValue = [date.getFullYear(), date.getMonth(), date.getDate()].join('-');
    var timeValue = date.getHours() + ':' + date.getMinutes();
    return dateValue + ' ' + timeValue;
};

