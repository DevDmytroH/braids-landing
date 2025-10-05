const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Save products.json and run optimization + generation
app.post('/api/save-product', async (req, res) => {
    try {
        const productsData = req.body;

        // Save products.json
        fs.writeFileSync('./products.json', JSON.stringify(productsData, null, 2), 'utf8');
        console.log('✅ products.json saved');

        // Run optimize-images.js
        console.log('🖼️  Running image optimization...');
        await runCommand('node optimize-images.js');
        console.log('✅ Images optimized');

        // Run generate-html.js
        console.log('📄 Generating HTML...');
        await runCommand('node generate-html.js');
        console.log('✅ HTML generated');

        res.json({
            success: true,
            message: 'Продукт збережено! Оптимізацію та генерацію завершено. Сайт оновлено!'
        });

    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({
            success: false,
            message: 'Помилка: ' + error.message
        });
    }
});

// Helper function to run shell commands
function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error: ${stderr}`);
                reject(error);
                return;
            }
            console.log(stdout);
            resolve(stdout);
        });
    });
}

app.listen(PORT, () => {
    console.log('');
    console.log('═'.repeat(60));
    console.log('🚀 Адмін-панель запущена!');
    console.log('');
    console.log(`📍 Відкрийте у браузері: http://localhost:${PORT}/admin.html`);
    console.log('');
    console.log('ℹ️  Щоб зупинити сервер, натисніть Ctrl+C');
    console.log('═'.repeat(60));
    console.log('');
});
