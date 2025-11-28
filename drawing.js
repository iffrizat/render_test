import { lerp } from "./math.js";

function color(r, g, b) {
    return b + (g << 8) + (r << 16)
}

function drawTriangleFilled(id, p0, p1, p2, color) {
    // p2 is the top point, p0 is the bottom point
    if (p1.y < p0.y) [p1, p0] = [p0, p1];
    if (p2.y < p0.y) [p2, p0] = [p0, p2];
    if (p2.y < p1.y) [p2, p1] = [p1, p2];
    
    // draw the top half
    for (let y = p2.y; y > p1.y; y--) {
        let left = lerp(p2.y, p2.x, p0.y, p0.x, y);
        let right = lerp(p2.y, p2.x, p1.y, p1.x, y);
        if (left > right) [left, right] = [right, left];
        for (let x = left; x < right; x++) {
            drawPixel(id, x, y, color);
        }
    }

    // draw the bottom half
    for (let y = p1.y; y > p0.y; y--) {
        let left = lerp(p2.y, p2.x, p0.y, p0.x, y);
        let right = lerp(p1.y, p1.x, p0.y, p0.x, y);
        if (left > right) [left, right] = [right, left];
        for (let x = left; x < right; x++) {
            drawPixel(id, x, y, color);
        }
    }
}

function drawTriangleWireframe(id, p0, p1, p2, color) {
    drawLine(id, p0, p1, color);
    drawLine(id, p0, p2, color);
    drawLine(id, p1, p2, color);
}

function drawLine(id, p0, p1, color) {
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;    
    
    // Horizontal line
    if (dx > dy) {
        for (let x = p0.x; x < p1.x; x++) {
            const y = lerp(p0.x, p0.y, p1.x, p1.y, x);
            drawPixel(id, x, y, color);
        }
    // Vertical line
    } else {
        for (let y = p0.y; y < p1.y; y++) {
            const x = lerp(p0.y, p0.x, p1.y, p1.x, y);
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

export { drawLine, drawPixel, drawTriangleWireframe, drawTriangleFilled, color }