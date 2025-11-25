class Mat44 {
    constructor(array) {
        /*
        array[0..3] - first row
        array[4..7] - second row
        array[8..11] - third row
        array[12..15] - fourth row
        */
        if (array.length != 16) throw new Error(`Mat44 expects 16 floats, got ${array.length}`);
        this.array = new Float32Array(array);
    }

    transform(other) {
        const A = this.array;
        const B = other.array;
        const C = new Float32Array(16);

        C[0] = A[0]*B[0] + A[1]*B[4] + A[2]*B[8] + A[3]*B[12];
        C[1] = A[0]*B[1] + A[1]*B[5] + A[2]*B[9] + A[3]*B[13];
        C[2] = A[0]*B[2] + A[1]*B[6] + A[2]*B[10] + A[3]*B[14];
        C[3] = A[0]*B[3] + A[1]*B[7] + A[2]*B[11] + A[3]*B[15];
        C[4] = A[4]*B[0] + A[5]*B[4] + A[6]*B[8] + A[7]*B[12];
        C[5] = A[4]*B[1] + A[5]*B[5] + A[6]*B[9] + A[7]*B[13];
        C[6] = A[4]*B[2] + A[5]*B[6] + A[6]*B[10] + A[7]*B[14];
        C[7] = A[4]*B[3] + A[5]*B[7] + A[6]*B[11] + A[7]*B[15];
        C[8] = A[8]*B[0] + A[9]*B[4] + A[10]*B[8] + A[11]*B[12];
        C[9] = A[8]*B[1] + A[9]*B[5] + A[10]*B[9] + A[11]*B[13];
        C[10] = A[8]*B[2] + A[9]*B[6] + A[10]*B[10] + A[11]*B[14];
        C[11] = A[8]*B[3] + A[9]*B[7] + A[10]*B[11] + A[11]*B[15];
        C[12] = A[12]*B[0] + A[13]*B[4] + A[14]*B[8] + A[15]*B[12];
        C[13] = A[12]*B[1] + A[13]*B[5] + A[14]*B[9] + A[15]*B[13];
        C[14] = A[12]*B[2] + A[13]*B[6] + A[14]*B[10] + A[15]*B[14];
        C[15] = A[12]*B[3] + A[13]*B[7] + A[14]*B[11] + A[15]*B[15];

        this.array = C;
    }
    
    scale(x, y, z) {
        this.transform(
            new Mat44([
                x, 0, 0, 0,
                0, y, 0, 0,
                0, 0, z, 0,
                0, 0, 0, 1,
            ])
        );

        return this;
    }
    
    translate(x, y, z) {
        this.transform(
            new Mat44([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                x, y, z, 1
            ])
        );
        
        return this;
    }
    
    rotate(axis, angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        
        this.transform(
            new Mat44([
                axis[0]*axis[0]*(1-c)+c, axis[0]*axis[1]*(1-c)-axis[2]*s, axis[0]*axis[2]*(1-c)+axis[1]*s, 0,
                axis[0]*axis[1]*(1-c)+axis[2]*s, axis[1]*axis[1]*(1-c)+c, axis[1]*axis[2]*(1-c)-axis[0]*s, 0,
                axis[0]*axis[2]*(1-c)+axis[1]*s, axis[1]*axis[2]*(1-c)+axis[0]*s, axis[2]*axis[2]*(1-c)+c, 0,
                0, 0, 0, 1
            ])
        );
        
        return this;
    }

    project(viewportDistance, viewportWidth, viewportHeight, screenWidth, screenHeight) {
        this.transform(
            new Mat44([
                (viewportDistance*screenWidth)/viewportWidth, 0, 0, 0,
                0, (viewportDistance*screenHeight)/viewportHeight, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ])
        );
        
        return this;
    }

    copy() {
        return new Mat44(this.array);
    }

    static identity() {
        return new Mat44([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
    }
}

class Vec4 {
    constructor(array) {
        if (array.length != 4) throw new Error(`Vec4 expects 4 floats, got ${array.length}`);
        this.array = new Float32Array(array);
    }
   
    get x() { return this.array[0]; }
    get y() { return this.array[1]; }
    get z() { return this.array[2]; }
    get w() { return this.array[3]; }

    set x(val) { this.array[0] = val; }
    set y(val) { this.array[1] = val; }
    set z(val) { this.array[2] = val; }
    set w(val) { this.array[3] = val; }

    transform(matrix) {
        const V = new Float32Array(this.array);
        const M = matrix.array;

        this.array[0] = M[0]*V[0] + M[4]*V[1] + M[8]*V[2] + M[12]*V[3];
        this.array[1] = M[1]*V[0] + M[5]*V[1] + M[9]*V[2] + M[13]*V[3];
        this.array[2] = M[2]*V[0] + M[6]*V[1] + M[10]*V[2] + M[14]*V[3];
        this.array[3] = M[3]*V[0] + M[7]*V[1] + M[11]*V[2] + M[15]*V[3];
    }
}

export { Mat44, Vec4 }