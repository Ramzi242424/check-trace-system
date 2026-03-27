// assets/js/app.js
import { validateLuhn } from './utils.js';
import { startScanner, stopScanner } from './scanner.js';

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const imeiInput = document.getElementById('imeiInput');
const checkBtn = document.getElementById('checkBtn');

startBtn.addEventListener('click', () => {
    startScanner((code) => {
        imeiInput.value = code;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    stopScanner();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

checkBtn.addEventListener('click', () => {
    const imei = imeiInput.value.trim();
    if (validateLuhn(imei)) {
        alert("✅ IMEI Валиден: " + imei);
        // Сюда добавим сохранение в Firebase
    } else {
        alert("❌ Ошибка: Неверный IMEI");
    }
});