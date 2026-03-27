// assets/js/scanner.js
let html5QrCode;

export async function startScanner(onSuccess) {
    html5QrCode = new Html5Qrcode("reader");
    const config = { fps: 10, qrbox: { width: 250, height: 150 } };

    try {
        await html5QrCode.start(
            { facingMode: "environment" }, 
            config,
            (text) => {
                onSuccess(text);
                stopScanner();
            }
        );
    } catch (err) {
        alert("Камера недоступна: " + err);
    }
}

export function stopScanner() {
    if (html5QrCode && html5QrCode.getState() !== 1) {
        html5QrCode.stop().catch(err => console.error(err));
    }
}