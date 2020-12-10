
import { Linking } from 'react-native';
import moment from 'moment';
import 'intl';
import 'intl/locale-data/jsonp/en';

const HelperUtils = {

    clone: function (obj) { return JSON.parse(JSON.stringify(obj)); },

    genereateAttachment: function (localUri) {
        let filename = localUri.split('/').pop();
        var content = {
            uri: localUri,
            type: 'image/jpeg',
            name: Math.random().toString(36).substr(2, 9) + '-' + filename
        };
        return content;
    },

    callPhone: function (phoneNumber) { Linking.openURL(`tel:${phoneNumber}`); },

    getMoment: function () { return moment(); },

    dateStr: function (date) { return moment(date).locale('tr').format("DD MMMM HH:mm"); },

    isEmpty: function (param) {
        return param == undefined || param == null || (typeof param === "string" && param == "");
    },

    isValid: function (regex, param) {
        return RegExp(regex).test(param);
    },

    isCurrency: function (param) {
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        })
        return formatter.format(param);
    },

    isNumber: function (param) {
        var SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];
        var tier = Math.log10(param) / 3 | 0;
        if (tier == 0) return param;
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);
        var scaled = param / scale;
        return scaled.toFixed(1) + suffix;
    },

    maskMobile: function (value) {
        value = value.charAt(0) === '0' ? value.slice(1) : value;
        var x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        return !x[2] ? x[1] : '' + x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
    },
}


export default HelperUtils;