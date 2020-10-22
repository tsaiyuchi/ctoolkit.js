/*
Create: 201012221808
Last Update: 201103130002
Creator: Yuchi
Intro: WebGL namespace
Reference: yachis.math, GLGE(not now)

if you has reference yachis.js then you must move it before this.
*/


if (!window["ctkjs"]) {
    window["ctkjs"] = {};
}


ctkjs.webgl = (function (nsroot) {
    //Preprocessing 
    if (!window["yachis"]) { return; }
    if (!nsroot["math"]) {
        var error = "webgl{}: Must refer to yachis.math";
        if (nsroot["errorPush"]) { nsroot.errorPush(error); }
        throw (error);
    }
    var nsmath = nsroot["math"];

    //if (nsroot.webgl) { return nsroot.webgl; }
    nsroot.webgl = {};
    var nstemp = nsroot.webgl;




    //===Properties / Fields===
    nstemp.mMatrix = new Float32Array([1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1]);
    nstemp.mMatrixStack = [];
    nstemp.vMatrix = new Float32Array([1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1]);
    nstemp.pMatrix = new Float32Array([1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1]);




    //===Function===

    nstemp.mvPushMatrix = function () { nstemp.mMatrixStack.push(nstemp.mMatrix); };
    nstemp.mvPopMatrix = function () { nstemp.mMatrix = nstemp.mMatrixStack.pop(); };


    // gluLookAt
    nstemp.makeLookAt = function (ex, ey, ez, cx, cy, cz, ux, uy, uz) {
        var eye = new nsmath.YcVector([ex, ey, ez]);
        var center = new nsmath.YcVector([cx, cy, cz]);
        var up = new nsmath.YcVector([ux, uy, uz]);

        var mag;

        var z = eye.subtract(center).toNormalize();
        var x = up.cross(z).toNormalize();
        var y = z.cross(x).toNormalize();
        x = x.data;
        y = y.data;
        z = z.data;


        var m = [
            x[0], y[0], z[0], 0,
            x[1], y[1], z[1], 0,
            x[2], y[2], z[2], 0,
            0, 0, 0, 1
            ];

        var t = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -ex, -ey, -ez, 1
            ];



        return nsmath.YcglMat4x4.multiply(m, t).data;
    };

    nstemp.lookAt = function (ex, ey, ez, cx, cy, cz, ux, uy, uz) {
        nstemp.mMatrix = nsmath.YcglMat3x3.multiply(nstemp.makeLookAt(ex, ey, ez, cx, cy, cz, ux, uy, uz), nstemp.mMatrix).data;
    };

    // glFrustum
    nstemp.makeFrustum = function (left, right, bottom, top, znear, zfar) {
        var X = 2 * znear / (right - left);
        var Y = 2 * znear / (top - bottom);
        var A = (right + left) / (right - left);
        var B = (top + bottom) / (top - bottom);
        var C = -(zfar + znear) / (zfar - znear);
        var D = -2 * zfar * znear / (zfar - znear);

        return [
            X, 0, 0, 0,
            0, Y, 0, 0,
            A, B, C, -1,
            0, 0, D, 0
           ];
    };
    // gluPerspective
    nstemp.makePerspective = function (fovy, aspect, znear, zfar) {
        var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return nstemp.makeFrustum(xmin, xmax, ymin, ymax, znear, zfar);
    };
    nstemp.perspective = function (fovy, aspect, znear, zfar) { nstemp.pMatrix = nstemp.makePerspective(fovy, aspect, znear, zfar); };



    nstemp.unProject = function (winx, winy, winz, modelview, projection, viewport) {
        //Transformation matrices
        var m, A;
        var input = [], out;
        //Calculation for inverting a matrix, compute projection x modelview
        //and store in A[16]
        A = nsmath.YcglMat4x4.multiply(projection, modelview);
        //Now compute the inverse of matrix A
        m = A.inverse();
        if (!m) { return null; }


        //Transformation of normalized coordinates between -1 and 1
        input[0] = (winx - viewport[0]) / viewport[2] * 2.0 - 1.0;
        input[1] = (winy - viewport[1]) / viewport[3] * 2.0 - 1.0;
        input[2] = 2.0 * winz - 1.0;
        input[3] = 1.0;


        //Objects coordinates
        out = nsmath.YcglMat4x4.mulVec(m, input).data;
        if (out[3] == 0.0) { return null; }
        out[3] = 1.0 / out[3];
        return [out[0] * out[3],
            out[1] * out[3],
            out[2] * out[3]];
    };




    nstemp.flatten = function (matrix) {
        if (typeof (matrix[0]) == typeof (123)) { return matrix; }
        var rs = [];
        for (var j = 0; j < matrix[0].length; j++) {
            for (var i = 0; i < matrix.length; i++) {
                rs.push(matrix[i][j]);
            }
        }
        return rs;
    };



    //===YcState3D===
    nstemp.YcState3D = function () {
    };
    nstemp.YcState3D.prototype.scale = new Float32Array([1, 1, 1]);
    nstemp.YcState3D.prototype.position = new Float32Array([0, 0, 0]);
    nstemp.YcState3D.prototype.rotation = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]);



    nstemp.YcState3D.deserialize = function (seristr) {
        eval("var seriObj = " + decodeURIComponent(seristr));
        var reobj = new nstemp.YcState3D();
        reobj.scale.set(seriObj.scale);
        reobj.position.set(seriObj.position);
        reobj.rotation.set(seriObj.rotation);
        return reobj;
    };

    nstemp.YcState3D.serialize = function (obj) {
        var seristr = [];
        var temp = [];
        for (var i = 0; i < obj.scale.length; i++) {
            temp.push(obj.scale[i]);
        }
        seristr.push("scale : [" + temp + "]");

        temp.length = 0;
        for (var i = 0; i < obj.position.length; i++) {
            temp.push(obj.position[i]);
        }
        seristr.push("position : [" + temp + "]");

        temp.length = 0;
        for (var i = 0; i < obj.rotation.length; i++) {
            temp.push(obj.rotation[i]);
        }
        seristr.push("rotation : [" + temp + "]");

        return encodeURIComponent("{" + seristr.join(", ") + "}");
    };
    nstemp.YcState3D.prototype.serialize = function () { return nstemp.YcState3D.serialize(this); };



    nstemp.YcState3D.prototype.getTransformed = function () {
        return [
            this.rotation[0] * this.scale[0],
            this.rotation[1] * this.scale[0],
            this.rotation[2] * this.scale[0],
            0,
            this.rotation[3] * this.scale[1],
            this.rotation[4] * this.scale[1],
            this.rotation[5] * this.scale[1],
            0,
            this.rotation[6] * this.scale[2],
            this.rotation[7] * this.scale[2],
            this.rotation[8] * this.scale[2],
            0,
            this.position[0], this.position[1], this.position[2], 1
        ];
    };

    nstemp.YcState3D.prototype.rotateRadianAxis = function (radian, axis) {
        this.rotation = nsmath.YcglMat3x3.mulQuat(this.rotation, nsmath.YcQuat.fromRadianAxis(radian, axis)).data;
    };

    nstemp.YcState3D.prototype.rotateByMatrix = function (matrix, yaw, pitch, roll) {
        matrix = new nsmath.YcglMat3x3(matrix);
        rot = nsmath.YcglMat3x3.fromQuat(nsmath.YcQuat.fromRadianAxis(roll, matrix.getColumn(2)));
        rot = rot.mulQuat(nsmath.YcQuat.fromRadianAxis(pitch, matrix.getColumn(0)));
        rot = rot.mulQuat(nsmath.YcQuat.fromRadianAxis(yaw, matrix.getColumn(1)));
        this.rotation = rot.multiply(this.rotation).data;
    };

    nstemp.YcState3D.prototype.rotateByWorld = function (yaw, pitch, roll) {
        this.rotateByMatrix(nsmath.YcglMat3x3.fromIdentity(), yaw, pitch, roll);
    };
    nstemp.YcState3D.prototype.rotateByModel = function (yaw, pitch, roll) {
        this.rotateByMatrix(this.rotation, yaw, pitch, roll);
    };
    nstemp.YcState3D.prototype.rotateByWalk = function (yaw, pitch, roll) {
        var backward = nsmath.YcglMat3x3.getColumn(this.rotation, 2);
        var up = new nsmath.YcVector([0, 1, 0]);
        var left = null; // up.cross(backward).toNormalize();

        if (backward.data[0] == 0 && backward.data[2] == 0) {
            left = nsmath.YcglMat3x3.getColumn(this.rotation, 0);
        } else {
            left = up.cross(backward).toNormalize();
        }

        backward = left.cross(up).toNormalize();

        var rot = nsmath.YcglMat3x3.fromYawPitchRollOfMatrix([
            left.data[0], left.data[1], left.data[2],
            up.data[0], up.data[1], up.data[2],
            backward.data[0], backward.data[1], backward.data[2]
            ], yaw, pitch, roll);

        var rsRot = rot.multiply(this.rotation);
        if (rsRot.data[4] < 0) { return; }
        this.rotation = rsRot.data;
    };

    nstemp.YcState3D.prototype.shiftByMatrix = function (matrix, x, y, z) {
        matrix = new nsmath.YcglMat3x3(matrix);
        var pos = new nsmath.YcVector(this.position);
        pos = pos.add(matrix.getColumn(0).mulNum(x));
        pos = pos.add(matrix.getColumn(1).mulNum(y));
        pos = pos.add(matrix.getColumn(2).mulNum(z));
        this.position = pos.data;
    };
    nstemp.YcState3D.prototype.shiftByWorld = function (x, y, z) {
        this.shiftByMatrix(nsmath.YcglMat3x3.fromIdentity(), x, y, z);
    };
    nstemp.YcState3D.prototype.shiftByModel = function (x, y, z) {
        this.shiftByMatrix(this.rotation, x, y, z);
    };
    nstemp.YcState3D.prototype.shiftByWalk = function (x, y, z) {
        var forward = nsmath.YcglMat3x3.getColumn(this.rotation, 2);
        var up = new nsmath.YcVector([0, 1, 0]);
        var left = up.cross(forward).toNormalize();
        forward = left.cross(up).toNormalize();

        this.shiftByMatrix([
            left.data[0], left.data[1], left.data[2],
            up.data[0], up.data[1], up.data[2],
            forward.data[0], forward.data[1], forward.data[2]
            ], x, y, z);

    };

    nstemp.YcState3D.prototype.directTo = function (target) {
        var forward = nsmath.YcVector.subtract(this.position, target).toNormalize();
        var up = nsmath.YcglMat3x3.getColumn(this.rotation, 1);
        var left = up.cross(forward).toNormalize();
        up = forward.cross(left).toNormalize();
        this.rotation = [
            left.data[0], left.data[1], left.data[2],
            up.data[0], up.data[1], up.data[2],
            forward.data[0], forward.data[1], forward.data[2]
            ];
    };


    //===YcCamera===
    nstemp.YcCamera = function () {
    };
    nstemp.YcCamera.prototype.cameraUp = [0, 1, 0];
    nstemp.YcCamera.prototype.currState = new nstemp.YcState3D();
    nstemp.YcCamera.prototype.fovy = 45.0;
    nstemp.YcCamera.prototype.aspect = 1024 / 768.0;
    nstemp.YcCamera.prototype.zNear = 0.1;
    nstemp.YcCamera.prototype.zFar = 100;
    nstemp.YcCamera.prototype.projection = null;

    nstemp.YcCamera.prototype.resetProjection = function () {
        this.projection = nstemp.makePerspective(this.fovy, this.aspect, this.zNear, this.zFar);
        return this.projection;
    };

    nstemp.YcCamera.prototype.getView = function () {
        var state = this.currState;

        var center = new nsmath.YcVector(this.currState.position).subtract(nsmath.YcglMat3x3.getColumn(state.rotation, 2)).data;
        var up = this.cameraUp ? this.cameraUp : nsmath.YcglMat3x3.getColumn(state.rotation, 1).data;


        return nstemp.makeLookAt(this.currState.position[0]
            , this.currState.position[1]
            , this.currState.position[2]
            , center[0]
            , center[1]
            , center[2]
            , up[0]
            , up[1]
            , up[2]);

    };

    nstemp.YcCamera.prototype.getModelView = function (modelMat) {
        return nsmath.YcMatrix.multiply(this.getView(), modelMat).data;
    };

    nstemp.YcCamera.prototype.usageCtrl_1 = function (mouse, msShift, msRot, keyboard, kbShift, kbRot) {
        var shiftRate = 0.1;
        var shift = [0, 0, 0];
        var rotateRate = 0.02;
        var rotate = [0, 0, 0];

        if (keyboard.currPressedKeys[68]) { shift[0] += kbShift; }
        if (keyboard.currPressedKeys[65]) { shift[0] -= kbShift; }
        if (keyboard.currPressedKeys[83]) { shift[2] += kbShift; }
        if (keyboard.currPressedKeys[87]) { shift[2] -= kbShift; }
        if (keyboard.currPressedKeys[82]) { shift[1] += kbShift; }
        if (keyboard.currPressedKeys[70]) { shift[1] -= kbShift; }

        if (keyboard.currPressedKeys[37]) { rotate[1] += kbRot; }
        if (keyboard.currPressedKeys[39]) { rotate[1] -= kbRot; }
        if (keyboard.currPressedKeys[38]) { rotate[0] += kbRot; }
        if (keyboard.currPressedKeys[40]) { rotate[0] -= kbRot; }
        if (keyboard.currPressedKeys[33]) { rotate[2] += kbRot; }
        if (keyboard.currPressedKeys[34]) { rotate[2] -= kbRot; }


        if (mouse.currState.right && mouse.prevState.right) {
            rotate[1] -= msRot * (mouse.currState.offsetX - mouse.prevState.offsetX);
            rotate[0] -= msRot * (mouse.currState.offsetY - mouse.prevState.offsetY);
        }
        if (mouse.currState.left && mouse.prevState.left) {
            shift[0] -= msShift * (mouse.currState.offsetX - mouse.prevState.offsetX);
            shift[1] += msShift * (mouse.currState.offsetY - mouse.prevState.offsetY);
            shift[2] += msShift * (mouse.currState.wheel);
        }



        if (nsmath.YcVector.squareMagnitude(shift) != 0) {
            this.currState.shiftByWalk(shift[0], shift[1], shift[2]);
        }
        if (nsmath.YcVector.squareMagnitude(rotate) != 0) {
            this.currState.rotateByWalk(rotate[1], rotate[0], rotate[2]);
        }

        return { shift: shift, rotate: rotate };
    };





    //===YcKeyboard===
    nstemp.YcKeyboard = function () {
    };
    nstemp.YcKeyboard.prototype.currPressedKeys = [];
    nstemp.YcKeyboard.prototype.afterKeyDownEvents = [];
    nstemp.YcKeyboard.prototype.afterKeyUpEvents = [];
    nstemp.YcKeyboard.prototype.needFreeEvent = [];

    nstemp.YcKeyboard.prototype.doEvent = function (events, e) {
        for (var key in events) { events[key](this, e); }
    };
    nstemp.YcKeyboard.prototype.handleKeyDown = function (key) {
        this.currPressedKeys[key] = true;
        this.doEvent(this.afterKeyDownEvents, { key: key });
    };
    nstemp.YcKeyboard.prototype.handleKeyUp = function (key) {
        this.currPressedKeys[key] = false;
        this.doEvent(this.afterKeyUpEvents, { key: key });
    };

    nstemp.YcKeyboard.fromListenObj = function (obj) {
        var kb = new nstemp.YcKeyboard();


        var tempFuncAddEvent = function (tobj, tevent, tfunc, tcapture) {//temp function, for add event
            if (tobj["attachEvent"]) {
                tobj.attachEvent("on" + tevent, tfunc);
                mouse.needFreeEvents.push({ obj: tobj, event: "on" + tevent, func: tfunc, capture: tcapture });
            } else {//W3C browsers
                tobj.addEventListener(tevent, tfunc, tcapture);
                mouse.needFreeEvents.push({ obj: tobj, event: tevent, func: tfunc, capture: tcapture });
            }
        };

        var fkd = function (e) { e = e ? e : window.event; kb.handleKeyDown(e.keyCode); };
        var fku = function (e) { e = e ? e : window.event; kb.handleKeyUp(e.keyCode); };

        tempFuncAddEvent(obj, "keydown", fkd, false);
        tempFuncAddEvent(obj, "keyup", fku, false);

        return kb;
    };
    nstemp.YcKeyboard.prototype.free = function () {
        while (this.needFreeEvent.length > 0) {
            var fe = this.needFreeEvent.pop();
            if (fe.obj["addEventListener"]) {
                fe.obj.removeEventListener(fe.event, fe.func, false);
            } else if (obj["attachEvent"]) {
                fe.obj.detachEvent(fe.event, fe.func);
            }
        }
    };



    //===YcMouse===
    nstemp.YcMouse = function () { };
    nstemp.YcMouse.prototype.prevState = {
        x: 0, y: 0
        , offsetX: 0
        , offsetY: 0
        , left: false
        , right: false
        , center: false
        , wheel: 0
    };
    nstemp.YcMouse.prototype.currState = {
        x: 0, y: 0
        , offsetX: 0
        , offsetY: 0
        , left: false
        , right: false
        , center: false
        , wheel: 0
    };
    nstemp.YcMouse.prototype.realState = {
        x: 0, y: 0
        , offsetX: 0
        , offsetY: 0
        , left: false
        , right: false
        , center: false
        , wheel: 0
        , wheelFlag: false
    };

    nstemp.YcMouse.prototype.needFreeEvents = [];
    nstemp.YcMouse.prototype.mouseDownEvents = [];
    nstemp.YcMouse.prototype.mouseUpEvents = [];
    nstemp.YcMouse.prototype.mouseMoveEvents = [];
    nstemp.YcMouse.prototype.mouseOverEvents = [];
    nstemp.YcMouse.prototype.mouseOutEvents = [];
    nstemp.YcMouse.prototype.mouseWheelEvents = [];
    nstemp.YcMouse.prototype.doEvents = function (events, e) {
        for (var key in events) { events[key](this, e); }
    };

    nstemp.YcMouse.prototype.update = function () {
        if (this.realState.wheelFlag) {
            this.realState.wheelFlag = false;
        } else {
            this.realState.wheel = 0;
        }
        for (var key in this.currState) {
            this.prevState[key] = this.currState[key];
            this.currState[key] = this.realState[key];
        }

    };
    nstemp.YcMouse.prototype.onMouseDown = function (e) {
        e = e ? e : window.event;
        var whbtn = e["which"] ? e.which : e.button;
        var obj = e["currentTarget"] ? e.currentTarget : e.srcElement;
        var rect = obj.getBoundingClientRect();

        this.realState.x = e.clientX;
        this.realState.y = e.clientY;
        this.realState.offsetX = e.clientX - rect.left;
        this.realState.offsetY = e.clientY - rect.top;

        var storeData = {
            sender: this
            , event: e
            , rect: rect
            , x: e.clientX
            , y: e.clientY
            , offsetX: e.clientX - rect.left
            , offsetY: e.clientY - rect.top
        };

        switch (whbtn) {
            case nstemp.YcMouse.LEFT_BTN: this.realState.left = storeData; break;
            case nstemp.YcMouse.RIGHT_BTN: this.realState.right = storeData; break;
            case nstemp.YcMouse.CENTER_BTN: this.realState.center = storeData; break;
        }


        this.doEvents(this.mouseDownEvents, e);
    };
    nstemp.YcMouse.prototype.onMouseUp = function (e) {
        var whbtn = e["which"] ? e.which : e.button;
        var obj = e["currentTarget"] ? e.currentTarget : e.srcElement;
        var rect = obj.getBoundingClientRect();

        this.realState.x = e.clientX;
        this.realState.y = e.clientY;
        this.realState.offsetX = e.clientX - rect.left;
        this.realState.offsetY = e.clientY - rect.top;

        switch (whbtn) {
            case nstemp.YcMouse.LEFT_BTN: this.realState.left = null; break;
            case nstemp.YcMouse.RIGHT_BTN: this.realState.right = null; break;
            case nstemp.YcMouse.CENTER_BTN: this.realState.center = null; break;
        }
        this.doEvents(this.mouseUpEvents, e);
    };
    nstemp.YcMouse.prototype.onMouseMove = function (e) {
        var whbtn = e["which"] ? e.which : e.button;
        var obj = e["currentTarget"] ? e.currentTarget : e.srcElement;
        var rect = obj.getBoundingClientRect();

        this.realState.x = e.clientX;
        this.realState.y = e.clientY;
        this.realState.offsetX = e.clientX - rect.left;
        this.realState.offsetY = e.clientY - rect.top;

        this.doEvents(this.mouseMoveEvents, e);
    };
    nstemp.YcMouse.prototype.onMouseOver = function (e) {
        var whbtn = e["which"] ? e.which : e.button;
        var obj = e["currentTarget"] ? e.currentTarget : e.srcElement;
        var rect = obj.getBoundingClientRect();

        this.realState.x = e.clientX;
        this.realState.y = e.clientY;
        this.realState.offsetX = e.clientX - rect.left;
        this.realState.offsetY = e.clientY - rect.top;

        this.doEvents(this.mouseOverEvents, e);
    };
    nstemp.YcMouse.prototype.onMouseOut = function (e) {
        var whbtn = e["which"] ? e.which : e.button;
        var obj = e["currentTarget"] ? e.currentTarget : e.srcElement;
        var rect = obj.getBoundingClientRect();

        this.realState.x = e.clientX;
        this.realState.y = e.clientY;
        this.realState.offsetX = e.clientX - rect.left;
        this.realState.offsetY = e.clientY - rect.top;

        this.doEvents(this.mouseOutEvents, e);
    };
    nstemp.YcMouse.prototype.onMouseWheel = function (e) {
        var whbtn = e["which"] ? e.which : e.button;
        var obj = e["currentTarget"] ? e.currentTarget : e.srcElement;
        var rect = obj.getBoundingClientRect();

        this.realState.x = e.clientX;
        this.realState.y = e.clientY;
        this.realState.offsetX = e.clientX - rect.left;
        this.realState.offsetY = e.clientY - rect.top;
        this.realState.wheelFlag = true;
        if (e["wheelDelta"]) {
            this.realState.wheel = e.wheelDelta / 120;
        } else {
            this.realState.wheel = e.detail / 3;
        }

        this.doEvents(this.mouseWheelEvents, e);
    };
    nstemp.YcMouse.prototype.free = function () {
        while (this.needFreeEvents.length > 0) {
            var fe = this.needFreeEvents.pop();
            if (fe.obj["attachEvent"]) {
                fe.obj.detachEvent(fe.event, fe.func);
            }
            else {
                fe.obj.removeEventListener(fe.event, fe.func, fe.capture);
            }
        }
    };

    if (/msie/i.test(navigator.userAgent)) {
        nstemp.YcMouse.LEFT_BTN = 1;
        nstemp.YcMouse.RIGHT_BTN = 2;
        nstemp.YcMouse.CENTER_BTN = 4;
    } else {
        nstemp.YcMouse.LEFT_BTN = 1; //ie:1
        nstemp.YcMouse.RIGHT_BTN = 3; //ie:2
        nstemp.YcMouse.CENTER_BTN = 2; //ie:4
    }

    nstemp.YcMouse.fromListenObj = function (obj) {
        var mouse = new nstemp.YcMouse();

        var tempFuncAddEvent = function (tobj, tevent, tfunc, tcapture) {//temp function, for add event
            if (tobj["attachEvent"]) {
                tobj.attachEvent("on" + tevent, tfunc);
                mouse.needFreeEvents.push({ obj: tobj, event: "on" + tevent, func: tfunc, capture: tcapture });
            } else {//W3C browsers
                tobj.addEventListener(tevent, tfunc, tcapture);
                mouse.needFreeEvents.push({ obj: tobj, event: tevent, func: tfunc, capture: tcapture });
            }
        };

        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";

        var msdown = function (e) { mouse.onMouseDown(e); };
        var msup = function (e) { mouse.onMouseUp(e); };
        var msmove = function (e) { mouse.onMouseMove(e); };
        var msover = function (e) { mouse.onMouseOver(e); };
        var msout = function (e) { mouse.onMouseOut(e); };
        var mswheel = function (e) { mouse.onMouseWheel(e); };

        tempFuncAddEvent(obj, "mousedown", msdown, false);
        tempFuncAddEvent(obj, "mouseup", msup, false);
        tempFuncAddEvent(obj, "mousemove", msmove, false);
        tempFuncAddEvent(obj, "mouseover", msover, false);
        tempFuncAddEvent(obj, "mouseout", msout, false);
        tempFuncAddEvent(obj, mousewheelevt, mswheel, false);



        //document.ondragstart = function () { return false; }
        //document.onmousedown = function () { return false; }


        return mouse;
    };




    /**===YcBasicShaderState===*/
    nstemp.YcBasicShaderState = function () {
        this.model = new Float32Array(16);
        this.view = new Float32Array(16);
        this.projection = new Float32Array(16);
        this.normal = new Float32Array(16);
        this.eyePosition = [0.0, 0.0, 0.0];

        this.vertexPositionBuffer = null;
        this.vertexColorBuffer = null;
        this.vertexUvCoordBuffer = null;
        this.vertexNormalBuffer = null;

        this.texture = null;
        this.enableTexture = true;
        this.enableVertexColor = true;

        this.enableLight = false;
        this.lightDirection = [1.0, 1.0, 1.0];
        this.ambientColor = [1.0, 1.0, 1.0];
        this.ambientIntensity = 0.5;
        this.diffuseColor = [1.0, 1.0, 1.0];
        this.diffuseIntensity = 0.5;
        this.specularColor = [1.0, 1.0, 1.0];
        this.specularIntensity = 1.0;
        this.specularPower = 20.0;
    };





    /**===YcBasicShaderProgram===*/
    nstemp.YcBasicShaderProgram = function () {

        //for Intelli
        this.glShaderProgram = {
            uModel: null,
            uView: null,
            uProjection: null,
            uNormal: null,
            uEyePosition: null,

            aPosition: null,
            aColor: null,
            aUVCoord: null,
            aNormal: null,

            uSampler: null,
            uEnableTexture: null,
            uEnableVertexColor: null,

            uEnableLight: null,
            uLightDirection: null,
            uAmbientColor: null,
            uAmbientIntensity: null,
            uDiffuseColor: null,
            uDiffuseIntensity: null,
            uSpecularColor: null,
            uSpecularIntensity: null,
            uSpecularPower: null
        };

        this.shaderState = new nstemp.YcBasicShaderState();
    };
    nstemp.YcBasicShaderProgram.basicShaderProgram = null;
    nstemp.YcBasicShaderProgram.prototype.gl = null;
    nstemp.YcBasicShaderProgram.prototype.glShaderProgram = null;
    /** buffer is WebGLBuffer need itemSize property
    *   model, view, project is Float32Array (size 16)
    *   texture is WebGLTexture
    */
    nstemp.YcBasicShaderProgram.prototype.shaderState = null;

    nstemp.YcBasicShaderProgram.fromDefault = function (gl) {
        var rs = new nstemp.YcBasicShaderProgram();
        rs.gl = gl;
        rs.glShaderProgram = nstemp.YcBasicShaderProgram.generateShaderProgram(gl);
        if (typeof (rs.glShaderProgram) == typeof ("string")) { throw (rs.glShaderProgram); }

        return rs;
    };
    nstemp.YcBasicShaderProgram.fromStatic = function (gl) {
        if (!nstemp.YcBasicShaderProgram.basicShaderProgram) {
            nstemp.YcBasicShaderProgram.basicShaderProgram = nstemp.YcBasicShaderProgram.fromDefault(gl);
        }
        return nstemp.YcBasicShaderProgram.basicShaderProgram;
    };


    nstemp.YcBasicShaderProgram.generateVertexShaderString = function () {
        var vertexStr = "";

        vertexStr += "attribute vec3 aPosition;\n";
        vertexStr += "attribute vec2 aUVCoord;\n";
        vertexStr += "attribute vec4 aColor;\n";
        vertexStr += "attribute vec3 aNormal;\n";

        vertexStr += "uniform mat4 uModel;\n";
        vertexStr += "uniform mat4 uView;\n";
        vertexStr += "uniform mat4 uProjection;\n";
        vertexStr += "uniform mat4 uNormal;\n";

        vertexStr += "varying vec4 vPosition;\n";
        vertexStr += "varying vec2 vTextureCoord;\n";
        vertexStr += "varying vec4 vColor;\n";
        vertexStr += "varying vec4 vNormal;\n";

        vertexStr += "void main(void) {\n";
        vertexStr += "  vColor=aColor;\n";
        vertexStr += "  vTextureCoord=aUVCoord;\n";
        vertexStr += "  vNormal = uNormal * vec4(aNormal, 1.0);\n";
        vertexStr += "  vPosition = uModel * vec4(aPosition,1.0);\n";
        vertexStr += "  gl_Position = uProjection * uView * vPosition;\n";

        vertexStr += "}\n";

        return vertexStr;
    };

    nstemp.YcBasicShaderProgram.generateFragmentShaderString = function () {
        //Fragment Shader
        var fragStr = "#ifdef GL_ES\nprecision highp float;\n#endif\n";
        fragStr += "uniform vec3 uEyePosition;\n";
        fragStr += "uniform sampler2D uSampler;\n";
        fragStr += "uniform bool uEnableTexture;\n";
        fragStr += "uniform bool uEnableVertexColor;\n";
        //Light
        fragStr += "uniform bool uEnableLight;\n";
        fragStr += "uniform vec3 uLightDirection;\n";
        fragStr += "uniform vec3 uAmbientColor;\n";
        fragStr += "uniform float uAmbientIntensity;\n";
        fragStr += "uniform vec3 uDiffuseColor;\n";
        fragStr += "uniform float uDiffuseIntensity;\n";
        fragStr += "uniform vec3 uSpecularColor;\n";
        fragStr += "uniform float uSpecularIntensity;\n";
        fragStr += "uniform float uSpecularPower;\n";

        fragStr += "varying vec4 vPosition;\n";
        fragStr += "varying vec4 vColor;\n";
        fragStr += "varying vec2 vTextureCoord;\n";
        fragStr += "varying vec4 vNormal;\n";

        //fragStr += "float saturate(float val){return min(1.0, max(val,0.0));}\n";
        //fragStr += "vec3 saturate(vec3 val){return vec3(saturate(val.r),saturate(val.g),saturate(val.b) );}\n";
        //fragStr += "vec4 saturate(vec4 val){return vec4(saturate(val.r),saturate(val.g),saturate(val.b),saturate(val.a) );}\n";

        fragStr += "void main(void){\n";
        fragStr += "    vec4 fragmentColor = vec4(1,1,1,1);\n";
        //Vertex Color
        fragStr += "    if(uEnableVertexColor){\n";
        fragStr += "        fragmentColor *= vColor;\n";
        fragStr += "    }\n";
        //Texture
        fragStr += "    if(uEnableTexture){\n";
        fragStr += "        fragmentColor *= texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));\n";
        fragStr += "    }\n";
        //Light
        fragStr += "    if(uEnableLight){";
        //Normalize
        fragStr += "        vec3 myNormal = normalize(vNormal.xyz);\n";
        fragStr += "        vec3 myLightDir = normalize(uLightDirection);\n";
        fragStr += "        vec3 myViewDir = normalize(uEyePosition - vPosition.xyz);\n";
        //Ambient
        fragStr += "        vec4 lightWeight = vec4(uAmbientColor * uAmbientIntensity, 1.0);\n";
        //Diffuse
        fragStr += "        float diff = dot(myNormal, myLightDir);\n";
        fragStr += "        lightWeight.rgb += uDiffuseColor * max(diff,0.0) * uDiffuseIntensity;\n";
        //Specular
        fragStr += "        vec3 reflect = reflect(-myLightDir, myNormal);//normalize(myNormal * diff * 2.0 - myLightDir);\n";
        fragStr += "        float specular = pow(max(dot(myViewDir, reflect),0.0),uSpecularPower);\n";
        fragStr += "        lightWeight.rgb += uSpecularColor * specular * uSpecularIntensity;\n";
        //Light weight
        fragStr += "        fragmentColor *= lightWeight;\n";
        fragStr += "    }\n";

        fragStr += "    gl_FragColor = fragmentColor;\n";
        fragStr += "}\n";


        return fragStr;
    };
    nstemp.YcBasicShaderProgram.generateVertexShader = function (gl) {
        var vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, nstemp.YcBasicShaderProgram.generateVertexShaderString());
        gl.compileShader(vShader);
        if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
            return gl.getShaderInfoLog(vShader);
        }
        return vShader;
    };
    nstemp.YcBasicShaderProgram.generateFragmentShader = function (gl) {
        var fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, nstemp.YcBasicShaderProgram.generateFragmentShaderString());
        gl.compileShader(fShader);
        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
            return gl.getShaderInfoLog(fShader);
        }
        return fShader;
    };

    nstemp.YcBasicShaderProgram.generateShaderProgram = function (gl) {

        //if (this.glShaderProgram) { gl.deleteProgram(this.glShaderProgram); }
        var program = gl.createProgram();
        var vertexShader = nstemp.YcBasicShaderProgram.generateVertexShader(gl);
        if (typeof (vertexShader) == typeof ("string")) { return vertexShader; }
        var fragShader = nstemp.YcBasicShaderProgram.generateFragmentShader(gl);
        if (typeof (fragShader) == typeof ("string")) { return fragShader; }

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            return gl.getProgramInfoLog(program);
        }

        //gl.useProgram(this.glShaderProgram);

        nstemp.YcBasicShaderProgram.bindShaderLocation(gl, program);

        return program;
    };

    nstemp.YcBasicShaderProgram.bindShaderLocation = function (gl, program) {
        /**Get properties location of shader*/

        program.aPosition = gl.getAttribLocation(program, "aPosition");
        gl.enableVertexAttribArray(program.aPosition);

        program.aColor = gl.getAttribLocation(program, "aColor");
        gl.enableVertexAttribArray(program.aColor);

        program.aUVCoord = gl.getAttribLocation(program, "aUVCoord");
        gl.enableVertexAttribArray(program.aUVCoord);

        program.aNormal = gl.getAttribLocation(program, "aNormal");
        gl.enableVertexAttribArray(program.aNormal);


        program.uModel = gl.getUniformLocation(program, "uModel");
        program.uView = gl.getUniformLocation(program, "uView");
        program.uProjection = gl.getUniformLocation(program, "uProjection");
        program.uSampler = gl.getUniformLocation(program, "uSampler");
        program.uEnableTexture = gl.getUniformLocation(program, "uEnableTexture");
        program.uEnableVertexColor = gl.getUniformLocation(program, "uEnableVertexColor");
        program.uEyePosition = gl.getUniformLocation(program, "uEyePosition");

        program.uNormal = gl.getUniformLocation(program, "uNormal");
        /**Light*/
        program.uEnableLight = gl.getUniformLocation(program, "uEnableLight");
        program.uLightDirection = gl.getUniformLocation(program, "uLightDirection");
        program.uAmbientColor = gl.getUniformLocation(program, "uAmbientColor");
        program.uAmbientIntensity = gl.getUniformLocation(program, "uAmbientIntensity");
        program.uDiffuseColor = gl.getUniformLocation(program, "uDiffuseColor");
        program.uDiffuseIntensity = gl.getUniformLocation(program, "uDiffuseIntensity");
        program.uSpecularColor = gl.getUniformLocation(program, "uSpecularColor");
        program.uSpecularIntensity = gl.getUniformLocation(program, "uSpecularIntensity");
        program.uSpecularPower = gl.getUniformLocation(program, "uSpecularPower");

    };

    nstemp.YcBasicShaderProgram.glUseProgram = function (gl, program, programState) {
        gl.useProgram(program);


        /**MVP*/
        gl.uniformMatrix4fv(program.uModel, false, programState.model);
        gl.uniformMatrix4fv(program.uView, false, programState.view);
        gl.uniformMatrix4fv(program.uProjection, false, programState.projection);
        if (programState["normal"]) { gl.uniformMatrix4fv(program.uNormal, false, programState.normal); }
        if (programState["eyePosition"]) { gl.uniform3fv(program.uEyePosition, programState.eyePosition); }


        /**Attribute*/
        if (programState["vertexPositionBuffer"]) {
            gl.bindBuffer(gl.ARRAY_BUFFER, programState.vertexPositionBuffer);
            gl.vertexAttribPointer(program.aPosition, programState.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        if (programState["vertexColorBuffer"]) {
            gl.bindBuffer(gl.ARRAY_BUFFER, programState.vertexColorBuffer);
            gl.vertexAttribPointer(program.aColor, programState.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        if (programState["vertexUvCoordBuffer"]) {
            gl.bindBuffer(gl.ARRAY_BUFFER, programState.vertexUvCoordBuffer);
            gl.vertexAttribPointer(program.aUVCoord, programState.vertexUvCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }
        if (programState["vertexNormalBuffer"]) {
            gl.bindBuffer(gl.ARRAY_BUFFER, programState.vertexNormalBuffer);
            gl.vertexAttribPointer(program.aNormal, programState.vertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
        }



        /**Enabled*/
        gl.uniform1i(program.uEnableTexture, programState.enableTexture);
        gl.uniform1i(program.uEnableVertexColor, programState.enableVertexColor);

        if (programState.enableTexture) {
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, programState.texture);
            gl.uniform1i(program.uSampler, 0);
        }




        /**Light*/
        if (programState.enableLight) {
            gl.uniform1i(program.uEnableLight, programState.enableLight);
            gl.uniform3fv(program.uLightDirection, programState.lightDirection);
            gl.uniform3fv(program.uAmbientColor, programState.ambientColor);
            gl.uniform1f(program.uAmbientIntensity, programState.ambientIntensity);
            gl.uniform3fv(program.uDiffuseColor, programState.diffuseColor);
            gl.uniform1f(program.uDiffuseIntensity, programState.diffuseIntensity);
            gl.uniform3fv(program.uSpecularColor, programState.specularColor);
            gl.uniform1f(program.uSpecularIntensity, programState.specularIntensity);
            gl.uniform1f(program.uSpecularPower, programState.specularPower);
        }


    };

    nstemp.YcBasicShaderProgram.prototype.glUseProgram = function () {
        nstemp.YcBasicShaderProgram.glUseProgram(this.gl, this.glShaderProgram, this.shaderState);
    };


    /**Copy from learning webgl*/
    nstemp.YcBasicShaderProgram.getShader = function (gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    };




    /**YcTexture*/
    nstemp.YcTexture = function () {
    };

    nstemp.YcTexture.yachis = "webgl.YcTexture";
    nstemp.YcTexture.prototype.yachis = nstemp.YcTexture.yachis;

    nstemp.YcTexture.prototype.glTexture = null;

    nstemp.YcTexture.handleLoadedTexture = function (gl, texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        //gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        //LINEAR_MIPMAP_NEAREST, LINEAR, NEAREST
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.bindTexture(gl.TEXTURE_2D, null);
    };

    nstemp.YcTexture.fromUrl = function (gl, imgUrl) {
        var texture = gl.createTexture();
        texture.image = new Image();
        texture.image.onload = function () {
            nstemp.YcTexture.handleLoadedTexture(gl, texture);
        };
        texture.image.src = imgUrl;


        var rs = new nstemp.YcTexture();
        rs.glTexture = texture;
        return rs;
    };


    return nstemp;
})(window["yachis"]);
