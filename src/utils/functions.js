import 'intl';
import 'intl/locale-data/jsonp/en';

export const validateEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
        return true;
    }
    return false;
}

export const validateMobile = (value) => {
    var phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im;
    if (phoneRex.test(value)) {
        return true;
    }
    return false;
}

export const validateAlias = (value) => {
    var aliasRex = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;
    if (aliasRex.test(value)) {
        return true;
    }
    return false;
}

export const validateLength = (value, length) => {
    if (value.length >= length) {
        return true;
    }
    return false;
}

export const isEmpty = (param) => {
    return param === 'undefined' || param === undefined || param === null || (typeof param === 'string' && param === '') || (typeof param === 'object' && param.length === 0) || (typeof param === 'array' && param.length === 0);
}

export const isCurrency = (param) => {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    return formatter.format(param);
}

export const isNumber = (param) => {
    var SI_SYMBOL = ['', 'K', 'M', 'G', 'T', 'P', 'E'];
    // what tier? (determines SI symbol)
    var tier = Math.log10(param) / 3 | 0;
    // if zero, we don't need a suffix
    if (tier === 0) return param;
    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    // scale the number
    var scaled = param / scale;
    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}

export const isTimer = (minTime) => {
    let curTime = Date.now();
    let preTime = window.prevTime;
    let rangeTime = curTime - preTime;
    window.prevTime = curTime;
    return rangeTime > minTime;
}

export const mortgageCalc = (principal, rate, term) => {

    if (rate > 1) {
        rate = rate * 0.01;
    }
    
    //Can accept term in years or months
    if (term <= 30) {
        term = term * 12;
    }
    
    var monthlyRate = rate / 12;
    var factor = Math.pow(monthlyRate + 1, term);
    var numerator = monthlyRate * factor;
    var denominator = factor - 1;
    var quotient = numerator / denominator;
    var payment = principal * quotient;
    return payment.toFixed(2);
}

export const generateKey = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}