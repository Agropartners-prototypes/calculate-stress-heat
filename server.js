const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const app = express();

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Rota para gerar o PDF
app.get('/generate-pdf', async (req, res) => {
    try{

        const url = req.query.url ; // URL da página a ser convertida
        if(!url) {
            return res.status(400).send('URL é necessária');
        }

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    
        const content = await page.content();
        if(!content) {
            await browser.close();
            return res.status(500).send('Erro ao carregar o conteúdo da página');
        }

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        if(pdfBuffer.length === 0) {
            await browser.close();
            return res.status(500).send('PDF gerado está vazio');
        }
    
        await browser.close();
    
        // Define o cabeçalho para download do PDF
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="download.pdf"',
            'Content-Length': pdfBuffer.length
        });
    
        res.send(pdfBuffer);

    } catch (error) {
        console.error('Erro ao gerar PDF: ', error);

        if(browser && browser.isConnected()) {
            await browser.close();
        }

        res.status(500).send('Erro ao gerar PDF');
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
