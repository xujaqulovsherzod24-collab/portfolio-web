document.getElementById('tg-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // ⚠️ BOT MA'LUMOTLARINGIZNI SHU YERGA YOZING:
    const BOT_TOKEN = "BU_YERGA_BOT_TOKEN_QO'YING";
    const CHAT_ID = "BU_YERGA_CHAT_ID_QO'YING";

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Telegramga boradigan matn formati
    const fullMessage = `🔔 **Yangi xabar!**\n\n👤 **Ism:** ${name}\n📞 **Aloqa:** ${phone}\n💬 **Xabar:** ${message}`;

    const url = `https://telegram.org{BOT_TOKEN}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: fullMessage,
            parse_mode: 'Markdown'
        })
    })
    .then(response => {
        const status = document.getElementById('form-status');
        if(response.ok) {
            status.innerHTML = "✅ Xabar muvaffaqiyatli yuborildi!";
            status.style.color = "#22c55e";
            document.getElementById('tg-form').reset(); // Formani tozalash
        } else {
            status.innerHTML = "❌ Xatolik yuz berdi. Bot token yoki Chat ID xato.";
            status.style.color = "#ef4444";
        }
    })
    .catch(error => {
        document.getElementById('form-status').innerHTML = "❌ Tarmoqda xatolik yuz berdi!";
        document.getElementById('form-status').style.color = "#ef4444";
    });
});
