/**
Create: 201101072006
Last Update: 201101072006
Creator: Yuchi
Intro: draw for webgl
Reference: yachis.math, yachis.webgl

if you has reference yachis.js then you must move it before this.


method:
initial: initialize any properties.
load: may create buffer, texture and so on...
update: update state or others...
render: render model / object.
dispose: free any resource.
glRender: a convenient use.

*/


if (!window["ctkjs"]) {
    window["ctkjs"] = {};
}

if (!ctkjs["webgl"]) {
    var error = "webgl.draw{}: Must refer to yachis.webgl";
    if (ctkjs["errorPush"]) { nstemp.errorPush(error); }
    throw (error);
}



ctkjs.webgl.draw = (function (nsroot) {
    var nstemp = nsroot;


    /*Must be refer from math.*/
    if (!nstemp["math"]) {
        var error = "webgl.draw{}: Must refer to yachis.math";
        if (nstemp["errorPush"]) { nstemp.errorPush(error); }
        eval("return error;");
    }
    var nsmath = nstemp["math"];


    /*for IntelliSense.
    the IntelliSense unknown where yachis.webgl.
    we need it to know.
    if yachis.webgl is not exist, then here will not reach.
    so, the following "if" are always false.
    */
    if (!nstemp["webgl"]) { nstemp.webgl = {}; }
    var nsgl = nstemp.webgl;



    /*create namespace*/
    nsgl.draw = {};
    nstemp = nsgl.draw;






    /**===YcDrawModel===*/
    nstemp.YcDrawModel = function () {
    };
    nstemp.YcDrawModel.yachis = "webgl.draw.YcDrawModel";
    nstemp.YcDrawModel.prototype.yachis = nstemp.YcDrawModel.yachis;
    nstemp.YcDrawModel.prototype.gl = null;
    nstemp.YcDrawModel.prototype.currState = null; //new nsgl.YcState3D();
    nstemp.YcDrawModel.prototype.shaderState = null;
    nstemp.YcDrawModel.prototype.vertexIndexBuffer = null;
    nstemp.YcDrawModel.prototype.shaderProgram = null;
    nstemp.YcDrawModel.prototype.initial = function () { };
    nstemp.YcDrawModel.prototype.load = function () { };
    nstemp.YcDrawModel.prototype.update = function () { };
    nstemp.YcDrawModel.prototype.render = function () { };
    nstemp.YcDrawModel.prototype.dispose = function () { };
    nstemp.YcDrawModel.prototype.glRender = function (gl, infoData) { };



    /**===YcDrawSpaceAxes===*/
    nstemp.YcDrawSpaceAxes = function () {

        this.shaderState = new nsgl.YcBasicShaderState();
        this.shaderState.enableLight = false;
        this.shaderState.enableTexture = false;
        this.shaderState.enableVertexColor = true;

        this.currState = new nsgl.YcState3D();
    };
    for (var loop in nstemp.YcDrawModel) {
        nstemp.YcDrawSpaceAxes[loop] = nstemp.YcDrawModel[loop];
    }
    for (var loop in nstemp.YcDrawModel.prototype) {
        nstemp.YcDrawSpaceAxes.prototype[loop] = nstemp.YcDrawModel.prototype[loop];
    }

    nstemp.YcDrawSpaceAxes.yachis = "webgl.draw.YcDrawSpaceAxes";
    nstemp.YcDrawSpaceAxes.prototype.yachis = nstemp.YcDrawSpaceAxes.yachis;

    nstemp.YcDrawSpaceAxes.prototype.axisLength = 100;


    nstemp.YcDrawSpaceAxes.generatePositionBuffer = function (gl, axisLen) {
        //Load vertexPositionBuffer
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        var vertices = [
                    0.0, 0.0, 0.0,
                    1.0, 0.0, 0.0, //x
                    0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, //y
                    0.0, 0.0, 0.0,
                    0.0, 0.0, 1.0, //z
                ];

        for (var i = 0; i < vertices.length; i++) { vertices[i] *= axisLen; }

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        rsBuffer.itemSize = 3;
        rsBuffer.numItems = 6;
        return rsBuffer;
    };
    nstemp.YcDrawSpaceAxes.generateColorBuffer = function (gl) {
        //Load vertexColorBuffer
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        var colors = [
        //x-axis = red
                    1.0, 0.0, 0.0, 1.0,
                    1.0, 0.0, 0.0, 1.0,
        //y-axis = greed
                    0.0, 1.0, 0.0, 1.0,
                    0.0, 1.0, 0.0, 1.0,
        //z-axis = blue
                    0.0, 0.0, 1.0, 1.0,
                    0.0, 0.0, 1.0, 1.0,
                ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        rsBuffer.itemSize = 4;
        rsBuffer.numItems = 6;
        return rsBuffer;
    };
    nstemp.YcDrawSpaceAxes.generateIndexBuffer = function (gl) {
        //Load vertex Index Buffer
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rsBuffer);
        var indices = [
              0, 1, 2, 3, 4, 5, 6
            ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
        rsBuffer.itemSize = 1;
        rsBuffer.numItems = 6;
        return rsBuffer;
    };

    nstemp.YcDrawSpaceAxes.prototype.load = function () {
        this.vertexPositionBuffer = nstemp.YcDrawSpaceAxes.generatePositionBuffer(this.gl, this.axisLength);
        this.vertexColorBuffer = nstemp.YcDrawSpaceAxes.generateColorBuffer(this.gl);
        this.vertexIndexBuffer = nstemp.YcDrawSpaceAxes.generateIndexBuffer(this.gl);


        this.shaderState.vertexPositionBuffer = this.vertexPositionBuffer;
        this.shaderState.vertexColorBuffer = this.vertexColorBuffer;
        this.shaderState["vertexUvCoordBuffer"] = this.shaderState["vertexPositionBuffer"];
        this.shaderState["vertexNormalBuffer"] = this.shaderState["vertexPositionBuffer"];

    };
    nstemp.YcDrawSpaceAxes.prototype.render = function (gl) {
        //gl = this.gl;
        this.shaderState["model"] = nsgl.flatten(this.currState.getTransformed());
        this.shaderState["view"] = view;
        this.shaderState["projection"] = projection;


        var shaderProgram = nsgl.YcBasicShaderProgram.fromStatic(this.gl);
        nsgl.YcBasicShaderProgram.glUseProgram(gl, shaderProgram.glShaderProgram, this.shaderState);


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        gl.drawElements(gl.LINES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    };
    nstemp.YcDrawSpaceAxes.prototype.glRender = function (gl, infoData) {
        this.gl = gl;
        if (!this.vertexPositionBuffer) { this.load(); }

        this.shaderState["model"] = this.currState.getTransformed();
        this.shaderState["view"] = infoData.view;
        this.shaderState["projection"] = infoData.projection;


        var shaderProgram = nsgl.YcBasicShaderProgram.fromStatic(this.gl);
        nsgl.YcBasicShaderProgram.glUseProgram(gl, shaderProgram.glShaderProgram, this.shaderState);


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        gl.drawElements(gl.LINES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);

    };





    /**===YcDrawCube===*/
    nstemp.YcDrawCube = function () {

        this.shaderState = new nsgl.YcBasicShaderState();
        this.shaderState.enableLight = true;
        this.shaderState.enableTexture = true;
        this.shaderState.enableVertexColor = false;



        this.currState = new nsgl.YcState3D();
    };
    for (var loop in nstemp.YcDrawModel) {
        nstemp.YcDrawCube[loop] = nstemp.YcDrawModel[loop];
    }
    for (var loop in nstemp.YcDrawModel.prototype) {
        nstemp.YcDrawCube.prototype[loop] = nstemp.YcDrawModel.prototype[loop];
    }


    nstemp.YcDrawCube.yachis = "webgl.draw.YcDrawCube";
    nstemp.YcDrawCube.prototype.yachis = nstemp.YcDrawCube.yachis;

    nstemp.YcDrawCube.generatePositionBuffer = function (gl) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        vertices = [
              -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, /**Front face*/
              -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, /**Back face*/
              -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, /**Top face*/
              -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, /**Bottom face*/
               1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, /**Right face*/
              -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, /**Left face*/
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        rsBuffer.itemSize = 3;
        rsBuffer.numItems = 24;
        return rsBuffer;
    };
    nstemp.YcDrawCube.generateUvCoordBuffer = function (gl) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);

        textureCoords = [
                0.25, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25, 0.25, /**Front face*/
                0.5, 1.0, 0.5, 0.75, 0.25, 0.75, 0.25, 1.0, /**Back face*/
                0.25, 0.0, 0.25, 0.25, 0.5, 0.25, 0.5, 0.0, /**Top face*/
                0.25, 0.75, 0.5, 0.75, 0.5, 0.5, 0.25, 0.5, /**Bottom face*/
                0.75, 0.5, 0.75, 0.25, 0.5, 0.25, 0.5, 0.5, /**Right face*/
                0.0, 0.5, 0.25, 0.5, 0.25, 0.25, 0.0, 0.25, /**Left face*/
            ];

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        rsBuffer.itemSize = 2;
        rsBuffer.numItems = 24;
        return rsBuffer;
    };

    nstemp.YcDrawCube.generateIndexBuffer = function (gl) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rsBuffer);
        var cubeVertexIndices = [
              0, 1, 2, 0, 2, 3,    /**Front face*/
              4, 5, 6, 4, 6, 7,    /**Back face*/
              8, 9, 10, 8, 10, 11,  /**Top face*/
              12, 13, 14, 12, 14, 15, /**Bottom face*/
              16, 17, 18, 16, 18, 19, /**Right face*/
              20, 21, 22, 20, 22, 23  /**Left face*/
            ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        rsBuffer.itemSize = 1;
        rsBuffer.numItems = 36;

        return rsBuffer;
    };
    nstemp.YcDrawCube.generateColorBuffer = function (gl) {
        //Load vertexColorBuffer
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        var colors = [
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
                1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        rsBuffer.itemSize = 4;
        rsBuffer.numItems = 24;
        return rsBuffer;
    };
    nstemp.YcDrawCube.generateNormalBuffer = function (gl) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        var vertexNormals = [
                   0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, /**Front face*/
                   0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, /**Back face*/0.0, 0.0, -1.0,
                   0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, /**Top face*/
                   0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, /**Bottom face*/
                   1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, /**Right face*/
                  -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, /**Left face*/
                ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
        rsBuffer.itemSize = 3;
        rsBuffer.numItems = 24;
        return rsBuffer;
    };
    nstemp.YcDrawCube.prototype.load = function () {
        if (this.shaderState.vertexPositionBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexPositionBuffer);
        }
        this.shaderState.vertexPositionBuffer = nstemp.YcDrawCube.generatePositionBuffer(this.gl);

        if (this.shaderState.vertexColorBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexColorBuffer);
        }
        this.shaderState.vertexColorBuffer = nstemp.YcDrawCube.generateColorBuffer(this.gl);

        if (this.shaderState.vertexUvCoordBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexUvCoordBuffer);
        }
        this.shaderState.vertexUvCoordBuffer = nstemp.YcDrawCube.generateUvCoordBuffer(this.gl);

        if (this.shaderState.vertexNormalBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexNormalBuffer);
        }
        this.shaderState.vertexNormalBuffer = nstemp.YcDrawCube.generateNormalBuffer(this.gl);

        if (this.vertexIndexBuffer) {
            this.gl.deleteProgram(this.vertexIndexBuffer);
        }
        this.vertexIndexBuffer = nstemp.YcDrawCube.generateIndexBuffer(this.gl);


    };

    nstemp.YcDrawCube.prototype.glRender = function (gl, infoData) {
        this.gl = gl;
        if (!this.vertexIndexBuffer) { this.load(); }





        this.shaderState["model"] = this.currState.getTransformed();
        this.shaderState["view"] = infoData.view;
        this.shaderState["projection"] = infoData.projection;

        this.shaderState.normal.set(new nsmath.YcglMat4x4(this.shaderState.model).inverse().transpose().data);
        this.shaderState.texture = infoData.texture;
        this.shaderState.eyePosition = infoData.eyePosition;


        var shaderProgram = nsgl.YcBasicShaderProgram.fromStatic(this.gl);
        nsgl.YcBasicShaderProgram.glUseProgram(gl, shaderProgram.glShaderProgram, this.shaderState);


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    };


    /**===YcDrawRectangle===*/
    nstemp.YcDrawRectangle = function () {

        this.shaderState = new nsgl.YcBasicShaderState();
        this.shaderState.enableLight = true;
        this.shaderState.enableTexture = true;
        this.shaderState.enableVertexColor = false;


        this.currState = new nsgl.YcState3D();
    };
    for (var loop in nstemp.YcDrawModel) {
        nstemp.YcDrawRectangle[loop] = nstemp.YcDrawModel[loop];
    }
    for (var loop in nstemp.YcDrawModel.prototype) {
        nstemp.YcDrawRectangle.prototype[loop] = nstemp.YcDrawModel.prototype[loop];
    }

    nstemp.YcDrawRectangle.yachis = "webgl.draw.YcDrawRectangle";
    nstemp.YcDrawRectangle.prototype.yachis = nstemp.YcDrawRectangle.yachis;

    nstemp.YcDrawRectangle.prototype.textureRepeat = [1, 1];

    nstemp.YcDrawRectangle.generatePositionBuffer = function (gl) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        vertices = [
              -1.0, 0.0, -1.0,
              1.0, 0.0, -1.0,
              -1.0, 0.0, 1.0,
              1.0, 0.0, 1.0
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        rsBuffer.itemSize = 3;
        rsBuffer.numItems = 12;
        return rsBuffer;
    };
    nstemp.YcDrawRectangle.generateUvCoordBuffer = function (gl, textureRepeat) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);


        var textureCoords = [];
        if (textureRepeat) {
            textureCoords = [
                0, 0,
                textureRepeat[0], 0,
                0, textureRepeat[1],
                textureRepeat[0], textureRepeat[1]
                ];   
        } else {
            textureCoords = [
                0, 0,
                1, 0,
                0, 1,
                1, 1
                ];
        }


        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        rsBuffer.itemSize = 2;
        rsBuffer.numItems = 8;
        return rsBuffer;
    };

    nstemp.YcDrawRectangle.generateIndexBuffer = function (gl) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, rsBuffer);
        var cubeVertexIndices = [
            0, 3, 2, 1, 3, 0
            ];
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(cubeVertexIndices), gl.STATIC_DRAW);
        rsBuffer.itemSize = 1;
        rsBuffer.numItems = 6;

        return rsBuffer;
    };
    nstemp.YcDrawRectangle.generateColorBuffer = function (gl) {
        //Load vertexColorBuffer
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        var colors = [
            0, 0, 0, 1,
            1, 0, 0, 1,
            0, 0, 1, 1,
            1, 0, 1, 1
            ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
        rsBuffer.itemSize = 4;
        rsBuffer.numItems = 16;
        return rsBuffer;
    };
    nstemp.YcDrawRectangle.generateNormalBuffer = function (gl) {
        var rsBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, rsBuffer);
        var vertexNormals = [
              0.0, 1.0, 0.0,
              0.0, 1.0, 0.0,
              0.0, 1.0, 0.0,
              0.0, 1.0, 0.0
                ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
        rsBuffer.itemSize = 3;
        rsBuffer.numItems = 12;
        return rsBuffer;
    };

    nstemp.YcDrawRectangle.prototype.load = function () {
        if (this.shaderState.vertexPositionBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexPositionBuffer);
        }
        this.shaderState.vertexPositionBuffer = nstemp.YcDrawRectangle.generatePositionBuffer(this.gl);

        if (this.shaderState.vertexColorBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexColorBuffer);
        }
        this.shaderState.vertexColorBuffer = nstemp.YcDrawRectangle.generateColorBuffer(this.gl);

        if (this.shaderState.vertexUvCoordBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexUvCoordBuffer);
        }
        this.shaderState.vertexUvCoordBuffer = nstemp.YcDrawRectangle.generateUvCoordBuffer(this.gl, this.textureRepeat);

        if (this.shaderState.vertexNormalBuffer) {
            this.gl.deleteProgram(this.shaderState.vertexNormalBuffer);
        }
        this.shaderState.vertexNormalBuffer = nstemp.YcDrawRectangle.generateNormalBuffer(this.gl);

        if (this.vertexIndexBuffer) {
            this.gl.deleteProgram(this.vertexIndexBuffer);
        }
        this.vertexIndexBuffer = nstemp.YcDrawRectangle.generateIndexBuffer(this.gl);
    };

    nstemp.YcDrawRectangle.prototype.glRender = function (gl, infoData) {
        this.gl = gl;
        if (!this.vertexIndexBuffer) { this.load(); }


        this.shaderState["model"] = this.currState.getTransformed();
        this.shaderState["view"] = infoData.view;
        this.shaderState["projection"] = infoData.projection;

        this.shaderState.normal.set(new nsmath.YcglMat4x4(this.shaderState.model).inverse().transpose().data);
        this.shaderState.texture = infoData.texture;
        this.shaderState.eyePosition = infoData.eyePosition;


        var shaderProgram = nsgl.YcBasicShaderProgram.fromStatic(this.gl);
        nsgl.YcBasicShaderProgram.glUseProgram(gl, shaderProgram.glShaderProgram, this.shaderState);


        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        gl.drawElements(gl.TRIANGLES, this.vertexIndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
    };

    return nstemp;
})(window["yachis"]);