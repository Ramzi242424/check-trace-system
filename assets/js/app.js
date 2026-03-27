export function validateLuhn(imei) {
    let s = 0;
    let double = false;
    for (let i = imei.length - 1; i >= 0; i--) {
        let digit = parseInt(imei[i]);
        if (double) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        s += digit;
        double = !double;
    }
    return (s % 10) === 0;
}

document.getElementById('checkBtn').addEventListener('click', () => {
    const imei = document.getElementById('imeiInput').value.trim();
    const feedback = document.getElementById('feedback');

    if (imei.length !== 15 || !validateLuhn(imei)) {
        feedback.textContent = "❌ Неверный формат или контрольная сумма";
        feedback.className = "form-text text-danger";
        return;
    }
    
    feedback.textContent = "✅ IMEI валиден. Запрашиваю данные...";
    feedback.className = "form-text text-success";
    
    // Дальше логика вызова check_imei_api() и сохранения в Firebase
});