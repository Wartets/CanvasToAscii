/**
 * @param {HTMLCanvasElement} sourceCanvas
 * @param {Object} options
 * @param {number} [options.resolution=6] 
 * @param {string} [options.asciiChars=' .,:;i1oahkbdpqwmeASBDQWMNE#$@']
 * @returns {string}
 */
function canvasToAscii(sourceCanvas, options = {}) {
    const {
        resolution = 6,
            asciiChars = ' .,:;i1oahkbdpqwmeASBDQWMNE#$@'
    } = options;

    const context = sourceCanvas.getContext('2d');
    const { width, height } = sourceCanvas;

    const tempCanvas = document.createElement('canvas');
    const tempContext = tempCanvas.getContext('2d');

    const asciiWidth = Math.floor(width / resolution);
    const asciiHeight = Math.floor(height / resolution);
    tempCanvas.width = asciiWidth;
    tempCanvas.height = asciiHeight;

    tempContext.drawImage(sourceCanvas, 0, 0, asciiWidth, asciiHeight);

    const imageData = tempContext.getImageData(0, 0, asciiWidth, asciiHeight);
    const pixels = imageData.data;

    let asciiImage = '';

    for (let y = 0; y < asciiHeight; y++) {
        let row = '';
        for (let x = 0; x < asciiWidth; x++) {
            const i = (y * asciiWidth + x) * 4;
            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            const brightness = (r + g + b) / 3;

            const charIndex = Math.floor((brightness / 255) * (asciiChars.length - 1));
            row += asciiChars[charIndex];
        }
        asciiImage += row + '\n';
    }

    return asciiImage;
}