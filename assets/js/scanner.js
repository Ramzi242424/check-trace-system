const html5QrCode = new Html5Qrcode("reader");
const config = { fps: 10, qrbox: { width: 280, height: 150 } }; // Прямоугольник под IMEI

export function startScanner(onSuccess) {
    html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        (decodedText) => {
            // Если считали штрих-код
            document.getElementById('imeiInput').value = decodedText;
            onSuccess(decodedText);
            // Виброотклик (если поддерживается)
            if (navigator.vibrate) navigator.vibrate(100);
        },
        (errorMessage) => {
            // Ошибки сканирования (обычно просто "код не найден в кадре")
        }
    ).catch((err) => console.error("Ошибка камеры:", err));
}

export function stopScanner() {
    if (html5QrCode.getState() !== 1) {
        html5QrCode.stop().catch(err => console.error(err));
    }
}