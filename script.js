import { Mat44, Vec4 } from "./matrix.js"
import { teapot } from "./teapot.js";

const ctx = document.querySelector("#canvas").getContext("2d");

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

let deg = 0;

setInterval(() => {
    ctx.clearRect(0, 0, 640, 480);

    /*
    const model = Mat44.identity();

    model.scale(1, 1, 1);
    model.rotate([0, 1, 0], deg2rad(deg));
    model.translate(100, 0, 0);
    
    const transform = Mat44.identity().project(100, 640, 480, 640, 480);
    transform.transform(model);
    */
    const transform = Mat44.identity()
        .rotate([0, 1, 0], deg2rad(deg))
        .rotate([0, 0, 1], deg2rad(deg*3))
        .scale(1, -1, 1)
        .translate(5.5, 5.5, 0)
        .project(50, 640, 480, 640, 480);

    for (const face of teapot.faces) {
        const verticies = [new Vec4(face[0].array), new Vec4(face[1].array), new Vec4(face[2].array)]
        for (const vertex of verticies) {
            vertex.transform(transform);
        }
        
        ctx.beginPath();
        ctx.moveTo(verticies[0].array[0], verticies[0].array[1]);
        ctx.lineTo(verticies[1].array[0], verticies[1].array[1]);
        ctx.lineTo(verticies[2].array[0], verticies[2].array[1]);
        ctx.stroke();
    }
    
    deg += 1
}, 2000/60)
