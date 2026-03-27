// assets/js/app.js
import { validateLuhn } from './utils.js'; // ИМПОРТ ИЗ UTILS, А НЕ ИЗ APP
import { startScanner, stopScanner } from './scanner.js';

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const imeiInput = document.getElementById('imeiInput');
const checkBtn = document.getElementById('checkBtn');

// Запуск сканера
if (startBtn) {
    startBtn.addEventListener('click', () => {
        startScanner((code) => {
            imeiInput.value = code;
            stopBtn.disabled = false;
            startBtn.disabled = true;
        });
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });
}

// Остановка сканера
if (stopBtn) {
    stopBtn.addEventListener('click', () => {
        stopScanner();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
}

// Проверка IMEI
checkBtn.addEventListener('click', () => {
    const imei = imeiInput.value.trim();
    if (validateLuhn(imei)) {
        alert("✅ IMEI валиден: " + imei);
        // Сюда добавим вызов Firebase позже
    } else {
        alert("❌ Ошибка: Неверный формат или контрольная сумма");
    }
});