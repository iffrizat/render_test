import { lerp } from "./math.js";

function drawLine(ctx, x0, y0, x1, y1) {
    const dx = x1 - x0;
    const dy = y1 - y0;    
    
    // Horizontal line
    if (dx > dy) {
        for (let x = x0; x < x1; x++) {
            const y = lerp(x0, y0, x1, y1, x);
            ctx.fillRect(x, y, 1, 1);
        }
    // Vertical line
    } else {
        for (let y = y0; y < y1; y++) {
            const x = lerp(y0, x0, y1, x1, y);
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

export { drawLine }