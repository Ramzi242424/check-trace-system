// assets/js/utils.js

const API_KEY = '8bcd9c71-58bf-4b3a-93b2-43ee3cf61064';

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

export async function fetchDeviceData(imei) {
    // ВНИМАНИЕ: imei.info может требовать POST запрос или иметь специфичный Endpoint.
    // Это стандартный пример интеграции.
    try {
        const response = await fetch(`https://api.imei.info/v1/check/${imei}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error('Ошибка API или лимит исчерпан');

        const result = await response.json();
        
        // Мапим данные под наш интерфейс (структура зависит от ответа imei.info)
        return {
            success: true,
            brand: result.brand || "Unknown",
            model: result.model || "Unknown Model",
            specs: result.specifications || "Характеристики не найдены",
            status: result.status
        };
    } catch (error) {
        console.error("API Error:", error);
        // Если API не отвечает (например, CORS), возвращаем ошибку для UI
        throw error;
    }
}