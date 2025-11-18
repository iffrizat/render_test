import { Mat44, Vec4 } from "./matrix.js"
import { teapot } from "./teapot.js";

const ctx = document.querySelector("#canvas").getContext("2d");

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

let deg = 0;

setInterval(() => {
    ctx.clearRect(0, 0, 640, 480);

    const transform = Mat44.identity();
    transform
        .scale(1, 1, 1)
        .rotate([0, 1, 0], deg2rad(deg))
        .translate(0, 0, 0)
        .project(50, 640, 480, 1000, 1000);

    for (const face of teapot.faces) {
        const a = new Vec4(face[0].array)
        const b = new Vec4(face[1].array)
        const c = new Vec4(face[2].array)
        a.transform(transform);
        b.transform(transform);
        c.transform(transform);    
        
        ctx.beginPath();
        ctx.moveTo(a.array[0], a.array[1]);
        ctx.lineTo(b.array[0], b.array[1]);
        ctx.lineTo(c.array[0], c.array[1]);
        ctx.stroke();
    }
    
    deg += 1
})
