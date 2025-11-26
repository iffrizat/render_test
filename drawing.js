import { lerp } from "./math.js";

function drawLine(id, x0, y0, x1, y1, color) {
    const dx = x1 - x0;
    const dy = y1 - y0;    
    
    // Horizontal line
    if (dx > dy) {
        for (let x = x0; x < x1; x++) {
            const y = lerp(x0, y0, x1, y1, x);
            drawPixel(id, x, y, color);
        }
    // Vertical line
    } else {
        for (let y = y0; y < y1; y++) {
            const x = lerp(y0, x0, y1, x1, y);
            drawPixel(id, x, y, color);
        }
    }
}

function drawPixel(id, x, y, color) {
    const data = id.data;
    
    if (x < 0 || x > id.width-1) return;
    if (y < 0 || y > id.height-1) return;

    const index = 4*(Math.ceil(y) * id.width + Math.ceil(x));
    data[index + 0] =  (color >> 16) & 0xff; // red
    data[index + 1] =  (color >> 8) & 0xff ; // green 
    data[index + 2] =  (color >> 0) & 0xff; // blue
    data[index + 3] =  255; // alpha 
}

export { drawLine, drawPixel }