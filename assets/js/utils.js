// assets/js/utils.js
export function validateLuhn(imei) {
    if (!/^\d{15}$/.test(imei)) return false;
    let sum = 0;
    for (let i = 0; i < 15; i++) {
        let d = parseInt(imei[i]);
        if (i % 2 !== 0) d *= 2;
        if (d > 9) d -= 9;
        sum += d;
    }
    return sum % 10 === 0;
}