// Script para converter SVG para PNG usando Canvas
// Execute este código no console do navegador ou crie um arquivo HTML para executar

function svgToPng(svgElement, filename, width, height) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = width;
    canvas.height = height;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(function(blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = filename;
            link.href = url;
            link.click();
            
            URL.revokeObjectURL(url);
            URL.revokeObjectURL(svgUrl);
        }, 'image/png');
    };
    
    img.src = svgUrl;
}

// Função para gerar todas as versões
function generateLogos() {
    // Carrega o SVG da logo
    fetch('logo.svg')
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.documentElement;
            
            // Gera diferentes tamanhos
            svgToPng(svgElement, 'horys-logo-200x80.png', 200, 80);
            svgToPng(svgElement, 'horys-logo-400x160.png', 400, 160);
            svgToPng(svgElement, 'horys-logo-600x240.png', 600, 240);
        });
    
    // Carrega o SVG do favicon
    fetch('favicon.svg')
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.documentElement;
            
            // Gera diferentes tamanhos de favicon
            svgToPng(svgElement, 'favicon-16x16.png', 16, 16);
            svgToPng(svgElement, 'favicon-32x32.png', 32, 32);
            svgToPng(svgElement, 'favicon-64x64.png', 64, 64);
            svgToPng(svgElement, 'favicon-128x128.png', 128, 128);
        });
}

// Como usar:
// 1. Abra o site no navegador
// 2. Abra o console (F12)
// 3. Cole este código e execute
// 4. Execute: generateLogos()

console.log('Script carregado! Execute generateLogos() para gerar as imagens PNG.');
