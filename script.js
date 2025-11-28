import { Mat44, Vec4, deg2rad } from "./math.js"
import { teapot } from "./teapot.js";
import { color, drawTriangleFilled } from "./drawing.js";

const ctx = document.querySelector("#canvas").getContext("2d");

let deg = 0;

function colorHash(p0, p1, p2) {
    return color(
        (p0.x + p0.y + p0.z) % 255,
        (p1.x + p1.y + p1.z) % 255,
        (p2.x + p2.y + p2.z) % 255
    );
}

setInterval(() => {
    ctx.clearRect(0, 0, 640, 480);

    const transform = Mat44.identity()
        .rotate([0, 0, 1], deg2rad(20))
        .rotate([1, 0, 0], deg2rad(20))
        .rotate([0, 1, 0], deg2rad(deg*3))
        .scale(1.5, -1.5, 1.5)
        .translate(6, 6, 0)
        .project(50, 640, 480, 640, 480);
    
    const id = ctx.createImageData(640, 480);

    for (const face of teapot.faces) {
        const verticies = [new Vec4(face[0].array), new Vec4(face[1].array), new Vec4(face[2].array)]
        for (const vertex of verticies) {
            vertex.transform(transform);
        }
        
        drawTriangleFilled(id, verticies[0], verticies[1], verticies[2], colorHash(verticies[0], verticies[1], verticies[2]));
    }

    ctx.putImageData(id, 0, 0);
    deg += 1;
}, 1000/10)
