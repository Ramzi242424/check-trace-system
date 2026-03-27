import { validateLuhn } from './app.js'; // Если вынес отдельно
import { startScanner, stopScanner } from './scanner.js';

// Селекторы
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const imeiInput = document.getElementById('imeiInput');
const checkBtn = document.getElementById('checkBtn');

// Валидация Луна (дублирую здесь для ясности)
function isImeiValid(imei) {
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

// Управление сканером
startBtn.addEventListener('click', () => {
    startScanner((code) => {
        console.log("IMEI считан:", code);
        // Можно сразу запускать проверку после сканирования
    });
    startBtn.disabled = true;
    stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
    stopScanner();
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// Проверка
checkBtn.addEventListener('click', () => {
    const imei = imeiInput.value.trim();
    if (isImeiValid(imei)) {
        alert("IMEI валиден! Отправляю в базу...");
        // Тут будет вызов Firebase
    } else {
        alert("Ошибка: Неверный IMEI");
    }
});