import { Mat44, Vec4 } from "./math.js"
import { teapot } from "./teapot.js";

const ctx = document.querySelector("#canvas").getContext("2d");

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

let deg = 0;

setInterval(() => {
    ctx.clearRect(0, 0, 640, 480);

    const transform = Mat44.identity()
        .rotate([0, 0, 1], deg2rad(20))
        .rotate([1, 0, 0], deg2rad(20))
        .rotate([0, 1, 0], deg2rad(deg*3))
        .scale(1, -1, 1)
        .translate(5.5, 5.5, 0)
        .project(50, 640, 480, 640, 480);

    for (const face of teapot.faces) {
        const verticies = [new Vec4(face[0].array), new Vec4(face[1].array), new Vec4(face[2].array)]
        for (const vertex of verticies) {
            vertex.transform(transform);
        }
        
        ctx.beginPath();
        ctx.moveTo(verticies[0].x, verticies[0].y);
        ctx.lineTo(verticies[1].x, verticies[1].y);
        ctx.lineTo(verticies[2].x, verticies[2].y);
        ctx.stroke();
    }
    
    deg += 1;
}, 1000/10)
