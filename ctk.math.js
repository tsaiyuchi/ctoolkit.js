/*
Create: 201012221808
Last Update: 201012221808
Creator: Yuchi
Intro: Math namespace
Reference: 

*/




if (!window["ctkjs"]) {
    window["ctkjs"] = {};
}


ctkjs.math = function (nsroot) {

    //if (nsroot.math) { return nsroot.math; }
    nsroot.math = {};
    var nstemp = nsroot.math;




    /**===YcVector===*/
    nstemp.YcVector = function (data) {
        if (data) {
            this.data = data;
            if (data["data"]) { this.data = data.data; }
        }
    };
    nstemp.YcVector.yachis = "math.YcVector";
    nstemp.YcVector.prototype.yachis = nstemp.YcVector.yachis;
    nstemp.YcVector.prototype.data = null;

    /**
    * Create YcVector that all elements are zero
    * @param {int} n: length of elements.
    * @return {YcVector}
    */
    nstemp.YcVector.fromZero = function (n) {
        var rs = [];
        for (var i = 0; i < n; i++) { rs.push(0); }
        return new nstemp.YcVector(rs);
    };

    /**
    * Create YcVector that all elements are number from param(val)
    * @param {int} n: length of elements.
    * @param {float} val: value of all elements.
    * @return {YcVector}
    */
    nstemp.YcVector.fromSingleNum = function (n, val) {
        var rs = [];
        for (var i = 0; i < n; i++) { rs.push(val); }
        return new nstemp.YcVector(rs); ;
    };

    nstemp.YcVector.add = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }
        if (left.length != right.length) { throw ("The vectors cannot operate, their count of elements is different"); }
        var data = [];
        for (var i = 0; i < left.length; i++) {
            data.push(left[i] + right[i]);
        }
        return new nstemp.YcVector(data);
    };
    nstemp.YcVector.prototype.add = function (right) { return nstemp.YcVector.add(this, right); };

    nstemp.YcVector.subtract = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }
        if (left.length != right.length) { throw ("The vectors cannot operate, their count of elements is different"); }
        var data = [];
        for (var i = 0; i < left.length; i++) {
            data.push(left[i] - right[i]);
        }
        return new nstemp.YcVector(data);
    };
    nstemp.YcVector.prototype.subtract = function (right) { return nstemp.YcVector.subtract(this, right); };

    nstemp.YcVector.multiply = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }
        if (left.length != right.length) { throw ("The vectors cannot operate, their count of elements is different"); }

        var data = [];
        for (var i = 0; i < left.length; i++) {
            data.push(left[i] * right[i]);
        }
        return new nstemp.YcVector(data);
    };
    nstemp.YcVector.prototype.multiply = function (right) {
        return nstemp.YcVector.multiply(this, right);
    };
    nstemp.YcVector.mulNum = function (vec, num) {
        if (vec["data"]) { vec = vec.data; }
        var data = [];
        for (var i = 0; i < vec.length; i++) {
            data.push(vec[i] * num);
        }
        return new nstemp.YcVector(data);
    };
    nstemp.YcVector.prototype.mulNum = function (num) { return nstemp.YcVector.mulNum(this, num); };

    nstemp.YcVector.divide = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }
        if (left.length != right.length) { throw ("The vectors cannot operate, their count of elements is different"); }

        var data = [];
        for (var i = 0; i < left.length; i++) {
            data.push(left[i] / right[i]);
        }
        return new nstemp.YcVector(data);
    };
    nstemp.YcVector.prototype.divide = function (right) { return nstemp.YcVector.divide(this, right); };

    nstemp.YcVector.divideNum = function (vec, num) {
        if (vec["data"]) { vec = vec.data; }
        var data = [];
        for (var i = 0; i < vec.length; i++) {
            data.push(vec[i] / num);
        }
        return new nstemp.YcVector(data);
    };
    nstemp.YcVector.prototype.divideNum = function (num) { return nstemp.YcVector.divideNum(this, num); };

    nstemp.YcVector.dot = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }
        if (left.length != right.length) { throw ("The vectors cannot operate, their count of elements is different"); }
        var val = 0;
        for (var i = 0; i < left.length; i++) {
            val += left[i] * right[i];
        }
        return val;
    };
    nstemp.YcVector.prototype.dot = function (right) {
        return nstemp.YcVector.dot(this, right);
    };

    nstemp.YcVector.cross = function (left, right) {
        /*Only implement Vector3.*/
        if (left["data"]) { left = left.data; }
        if (left.length == 3) {
            return nstemp.YcVec3.cross(left, right);
        } else { throw ("No implement cross on this dimensions"); }
    };
    nstemp.YcVector.prototype.cross = function (right) { return nstemp.YcVector.cross(this, right); };

    nstemp.YcVector.toNormalize = function (vec) {
        this.data = data;
        if (vec["data"]) { vec = vec.data; }

        var len = Math.sqrt(nstemp.YcVector.dot(vec, vec));
        var data = [];

        for (var i = 0; i < vec.length; i++) {
            data.push(vec[i] * (1.0 / len));
        }

        return new nstemp.YcVector(data);
    };
    nstemp.YcVector.prototype.toNormalize = function () { return nstemp.YcVector.toNormalize(this); };

    nstemp.YcVector.magnitude = function (vec) {
        return Math.sqrt(nstemp.YcVector.dot(vec, vec));
    };
    nstemp.YcVector.prototype.magnitude = function () { return nstemp.YcVector.magnitude(this.data); };

    nstemp.YcVector.distance = function (vec1, vec2) {
        return nstemp.YcVector.subtract(vec2, vec1).magnitude();
    };
    nstemp.YcVector.prototype.distance = function (vec) { return nstemp.YcVector.distance(this, vec); };

    /**量度(大小)平方*/
    nstemp.YcVector.squareMagnitude = function (vec) {
        return nstemp.YcVector.dot(vec, vec);
    };
    nstemp.YcVector.prototype.squareMagnitude = function () { return nstemp.YcVector.dot(this, this); };

    /**距離平方*/
    nstemp.YcVector.squareDistance = function (left, right) {
        return nstemp.YcVector.subtract(left, right).squareMagnitude();
    };
    nstemp.YcVector.prototype.squareDistance = function (right) { return nstemp.YcVector.squareDistance(this, right); };


    //===YcVec3===
    nstemp.YcVec3 = function (data) {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };

    for (var loop in nstemp.YcVector) {
        nstemp.YcVec3[loop] = nstemp.YcVector[loop];
    }
    for (var loop in nstemp.YcVector.prototype) {
        nstemp.YcVec3.prototype[loop] = nstemp.YcVector.prototype[loop];
    }

    nstemp.YcVec3.yachis = "math.YcVec3";
    nstemp.YcVec3.prototype.yachis = "math.YcVec3";

    nstemp.YcVec3.cross = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }
        if (left.length < 3) { throw ("Vector length must be greater than 3"); }
        if (left.length != right.length) { throw ("cross(): The vectors cannot operate, their count of elements is different"); }


        // temps needed in case left or right is this.
        var a = (left[1] * right[2]) - (left[2] * right[1]);
        var b = (left[2] * right[0]) - (left[0] * right[2]);
        var c = (left[0] * right[1]) - (left[1] * right[0]);
        return new nstemp.YcVec3([a, b, c]);
    };



    /*===YcQuat===
    [0] = x, [1] = y, [2] = z, [3] = w,
    */
    nstemp.YcQuat = function (data) {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };

    nstemp.YcQuat.yachis = "math.YcQuat";
    nstemp.YcQuat.prototype.yachis = nstemp.YcQuat.yachis;
    nstemp.YcQuat.prototype.data = null;

    nstemp.YcQuat.fromRadianAxis = function (radian, axis) {
        //first is set to property for no change params
        if (axis["data"]) { axis = axis.data; }
        var qx = axis[0];
        var qy = axis[1];
        var qz = axis[2];


        //Required: Normalize to unit length of axis
        var i_length = 1.0 / Math.sqrt(qx * qx + qy * qy + qz * qz);
        qx = qx * i_length;
        qy = qy * i_length;
        qz = qz * i_length;

        var helf = radian * 0.5;

        var qw = Math.cos(helf);

        var sin_theta_over_two = Math.sin(helf);
        qx = qx * sin_theta_over_two;
        qy = qy * sin_theta_over_two;
        qz = qz * sin_theta_over_two;

        return new nstemp.YcQuat([qx, qy, qz, qw]);
    };
    nstemp.YcQuat.fromQuatElements = function (qx, qy, qz, qw) {
        return new nstemp.YcQuat([qx, qy, qz, qw]);
    };


    nstemp.YcQuat.inverse = function (quat) {
        if (quat["data"]) { quat = quat.data; }
        var d = 1.0 / (quat[0] * quat[0] + quat[1] * quat[1] + quat[2] * quat[2] + quat[3] * quat[3]);
        return new nstemp.YcQuat([quat[0] * d, quat[1] * d, quat[2] * d, quat[3] * d]);
    };
    nstemp.YcQuat.prototype.inverse = function () { return nstemp.YcQuat.inverse(this); };

    nstemp.YcQuat.slerp = function (qa, qb, t) {
        if (qa["data"]) { qa = qa.data; }
        if (qb["data"]) { qb = qb.data; }

        // quaternion to return
        var qm = [0, 0, 0, 0];
        // Calculate angle between them.
        var cosHalfTheta = qa[3] * qb[3] + qa[0] * qb[0] + qa[1] * qb[1] + qa[2] * qb[2];
        // if qa=qb or qa=-qb then theta = 0 and we can return qa


        if (Math.abs(cosHalfTheta) >= 1.0) {
            qm[3] = qa[3]; qm[0] = qa[0]; qm[1] = qa[1]; qm[2] = qa[2];
            return new nstemp.YcQuat(qm);
        }

        // Calculate temporary values.
        var halfTheta = Math.acos(cosHalfTheta);
        var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
        // if theta = 180 degrees then result is not fully defined
        // we could rotate around any axis normal to qa or qb
        if (Math.abs(sinHalfTheta) < 0.001) { // fabs is floating point absolute
            qm[3] = (qa[3] * 0.5 + qb[3] * 0.5);
            qm[0] = (qa[0] * 0.5 + qb[0] * 0.5);
            qm[1] = (qa[1] * 0.5 + qb[1] * 0.5);
            qm[2] = (qa[2] * 0.5 + qb[2] * 0.5);
            return new nstemp.YcQuat(qm);
        }
        var ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta;
        var ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        //calculate Quaternion.
        qm[3] = (qa[3] * ratioA + qb[3] * ratioB);
        qm[0] = (qa[0] * ratioA + qb[0] * ratioB);
        qm[1] = (qa[1] * ratioA + qb[1] * ratioB);
        qm[2] = (qa[2] * ratioA + qb[2] * ratioB);
        return new nstemp.YcQuat(qm);

    };


    nstemp.YcQuat.getWXYZ = function (quat) {
        if (quat["data"]) { quat = quat.data; }
        return {
            x: quat[0],
            y: quat[1],
            z: quat[2],
            w: quat[3]
        };
    };
    nstemp.YcQuat.prototype.getWXYZ = function () { nstemp.YcQuat.getWXYZ(this); };


    nstemp.YcQuat.getYaw = function (quat) {
        var q = nstemp.YcQuat.getWXYZ(quat);
        return Math.asin(-2 * (q.x * q.z - q.w * q.y));
    };
    nstemp.YcQuat.prototype.getYaw = function () { return nstemp.YcQuat.getYaw(this); };

    nstemp.YcQuat.getPitch = function (quat) {
        var q = nstemp.YcQuat.getWXYZ(quat);
        return Math.atan2(2 * (q.y * q.z + q.w * q.x), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z);
    };
    nstemp.YcQuat.prototype.getPitch = function () { return nstemp.YcQuat.getPitch(this); };


    nstemp.YcQuat.getRoll = function (quat) {
        var q = nstemp.YcQuat.getWXYZ(quat);
        return Math.atan2(2 * (q.x * q.y + q.w * q.z), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z);
    };
    nstemp.YcQuat.prototype.getRoll = function () { return nstemp.YcQuat.getRoll(this); };

    nstemp.YcQuat.toYawPitchRoll = function (quat) {
        var q = nstemp.YcQuat.getWXYZ(quat);
        return {
            yaw: Math.asin(-2 * (q.x * q.z - q.w * q.y)),
            pitch: Math.atan2(2 * (q.y * q.z + q.w * q.x), q.w * q.w - q.x * q.x - q.y * q.y + q.z * q.z),
            roll: Math.atan2(2 * (q.x * q.y + q.w * q.z), q.w * q.w + q.x * q.x - q.y * q.y - q.z * q.z)
        };
    };
    nstemp.YcQuat.prototype.toYawPitchRoll = function () { return nstemp.YcQuat.toYawPitchRoll(this); };


    /**參考用*/
    nstemp.YcQuat.prototype.toMat3x3 = function () {
        var qx = this.data[0];
        var qy = this.data[1];
        var qz = this.data[2];
        var qw = this.data[3];
        return new nstemp.YcMatrix([
                        [1 - 2 * qy * qy - 2 * qz * qz, 2 * qx * qy - 2 * qz * qw, 2 * qx * qz + 2 * qy * qw],
                        [2 * qx * qy + 2 * qz * qw, 1 - 2 * qx * qx - 2 * qz * qz, 2 * qy * qz - 2 * qx * qw],
                        [2 * qx * qz - 2 * qy * qw, 2 * qy * qz + 2 * qx * qw, 1 - 2 * qx * qx - 2 * qy * qy]
	                ]);
    };




    //===YcMatrix===
    nstemp.YcMatrix = function (data) {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };
    nstemp.YcMatrix.yachis = "math.YcMatrix";
    nstemp.YcMatrix.prototype.yachis = nstemp.YcMatrix.yachis;
    nstemp.YcMatrix.prototype.data = null;

    nstemp.YcMatrix.fromZero = function (m, n) {
        var rs = [];
        if (!n) { n = m; }
        for (var i = 0; i < m; i++) {
            var row = [];
            for (var j = 0; j < n; j++) {
                row.push(0);
            }
            rs.push(row);
        }
        return rs;
    };

    nstemp.YcMatrix.fromIdentity = function (m, n) {
        var data = [];
        if (!n) { n = m; }
        for (var i = 0; i < m; i++) {
            var row = [];
            for (var j = 0; j < n; j++) {
                if (i == j) { row.push(1); }
                else { row.push(0); }
            }
            data.push(row);
        }
        return new nstemp.YcMatrix(data);
    };

    nstemp.YcMatrix.fromQuatTo4x4 = function (quat) {
        if (quat["data"]) { quat = quat.data; }
        var qx = quat[0]; var qy = quat[1]; var qz = quat[2]; var qw = quat[3];
        return new nstemp.YcMatrix([
                        [1 - 2 * qy * qy - 2 * qz * qz, 2 * qx * qy - 2 * qz * qw, 2 * qx * qz + 2 * qy * qw, 0],
                        [2 * qx * qy + 2 * qz * qw, 1 - 2 * qx * qx - 2 * qz * qz, 2 * qy * qz - 2 * qx * qw, 0],
                        [2 * qx * qz - 2 * qy * qw, 2 * qy * qz + 2 * qx * qw, 1 - 2 * qx * qx - 2 * qy * qy, 0],
                        [0, 0, 0, 1]
	                ]);
    };
    nstemp.YcMatrix.fromQuatTo3x3 = function (quat) {
        if (quat["data"]) { quat = quat.data; }
        var qx = quat[0]; var qy = quat[1]; var qz = quat[2]; var qw = quat[3];
        return new nstemp.YcMatrix([
                        [1 - 2 * qy * qy - 2 * qz * qz, 2 * qx * qy - 2 * qz * qw, 2 * qx * qz + 2 * qy * qw],
                        [2 * qx * qy + 2 * qz * qw, 1 - 2 * qx * qx - 2 * qz * qz, 2 * qy * qz - 2 * qx * qw],
                        [2 * qx * qz - 2 * qy * qw, 2 * qy * qz + 2 * qx * qw, 1 - 2 * qx * qx - 2 * qy * qy]
	                ]);
    };

    nstemp.YcMatrix.transpose = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }
        var data = [];

        for (var j = 0; j < matrix[0].length; j++) {
            var rowAry = [];
            for (var i = 0; i < matrix.length; i++) {
                rowAry.push(matrix[i][j]);
            }
            data.push(rowAry);
        }
        return new nstemp.YcMatrix(data);
    };
    nstemp.YcMatrix.prototype.transpose = function () {
        return nstemp.YcMatrix.transpose(this);
    };
    nstemp.YcMatrix.multiply = function (leftMat, rightMat) {
        if (leftMat["data"]) { leftMat = leftMat.data; }
        if (rightMat["data"]) { rightMat = rightMat.data; }
        if (leftMat[0].length != rightMat.length) { throw ("Cannot multiply (check length of dimension)"); }


        var data = [];
        for (var i = 0; i < leftMat.length; i++) {
            var rowAry = [];
            for (var j = 0; j < rightMat[0].length; j++) {
                var sum = 0;
                for (var k = 0; k < leftMat[0].length; k++) {
                    sum += leftMat[i][k] * rightMat[k][j];
                }
                rowAry.push(sum);
            }
            data.push(rowAry);
        }

        return new nstemp.YcMatrix(data);
    };
    nstemp.YcMatrix.prototype.multiply = function (right) { return nstemp.YcMatrix.multiply(this, right); };

    nstemp.YcMatrix.mulVecRx1 = function (matrix, vector) {
        if (matrix["data"]) { matrix = matrix.data; }
        if (vector["data"]) { vector = vector.data; }
        if (matrix[0].length != vector.length) { throw ("mulVecRx1(): Cannot multiply, check length of dimension"); }


        var data = [];
        for (var i = 0; i < matrix.length; i++) {
            var sum = 0;
            for (var j = 0; j < matrix[i].length; j++) {
                sum += matrix[i][j] * vector[j];
            }
            data.push(sum);
        }

        return new nstemp.YcVector(data);
    };

    nstemp.YcMatrix.mulQuat = function (leftMat, rightQuat) {

        rightQuat = new nstemp.YcQuat(rightQuat);

        if (leftMat["data"]) { leftMat = leftMat.data; }


        switch (leftMat.length) {
            case 3:
                return nstemp.YcMatrix.multiply(leftMat, nstemp.YcMatrix.fromQuatTo3x3(rightQuat));
                break;
            case 4:
                return nstemp.YcMatrix.multiply(leftMat, nstemp.YcMatrix.fromQuatTo4x4(rightQuat));
                break;
        }
        throw ("Cannot multiply, must be 3x3 or 4x4 matrix.");
    };
    nstemp.YcMatrix.prototype.mulQuat = function (rightQuat) { return nstemp.YcMatrix.mulQuat(this, rightQuat); };

    nstemp.YcMatrix.minorMatrix = function (matrix, ai, aj) {
        if (matrix["data"]) { matrix = matrix.data; }
        var rsm = [];
        for (var i = 0; i < matrix.length; i++) {
            if (i == ai) { continue; }
            var row = [];
            for (var j = 0; j < matrix[i].length; j++) {
                if (j == aj) { continue; }
                row.push(matrix[i][j]);
            }
            rsm.push(row);
        }

        return new nstemp.YcMatrix(rsm);
    };
    nstemp.YcMatrix.minor = function (matrix, ai, aj) {
        var minorMat = nstemp.YcMatrix.minorMatrix(matrix, ai, aj);
        if ((ai + aj) % 2 == 0) { return minorMat.determinant(); }
        else { return -1 * minorMat.determinant(); }
    };


    /**the future may have LU decompose */
    nstemp.YcMatrix.determinant = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }

        if (matrix.length != matrix[0].length) {
            throw ("determinant(): the determinant cannot use in on Non-Square matrix.");
        }
        switch (matrix.length) {
            case 2:
                return nstemp.YcMat2x2.determinant(matrix);
            case 3:
                return nstemp.YcMat3x3.determinant(matrix);
        }

        var sum = 0;
        for (var j = 0; j < matrix[0].length; j++) {
            sum += matrix[0][j] * nstemp.YcMatrix.minor(matrix, 0, j);
        }
        return sum;
    };
    nstemp.YcMatrix.prototype.determinant = function () { return nstemp.YcMatrix.determinant(this); };

    nstemp.YcMatrix.inverse = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }

        if (matrix.length != matrix[0].length) {
            throw ("inverse(): its not inverse at m != n");
        }
        switch (matrix.length) {
            case 2:
                return nstemp.YcMat2x2.inverse(matrix);
            case 3:
                return nstemp.YcMat3x3.inverse(matrix);
            case 4:
                return nstemp.YcMat4x4.inverse(matrix);
        }

        throw ("No implement inverse on the dimensions of matrix.");
    };
    nstemp.YcMatrix.prototype.inverse = function () { return nstemp.YcMatrix.inverse(this); };



    nstemp.YcMatrix.getColumn = function (matrix, idx) {

        if (!matrix) { throw ("getColumn(): matrix is undefine"); }
        if (matrix["data"]) { matrix = matrix.data; }
        if (matrix[0].length <= idx) { throw ("getColumn(): over length"); }

        var rs = [];
        for (var i = 0; i < matrix.length; i++) {
            rs.push(matrix[i][idx]);
        }

        return new nstemp.YcVector(rs);
    };
    nstemp.YcMatrix.prototype.getColumn = function (idx) { return nstemp.YcMatrix.getColumn(this, idx); };

    nstemp.YcMatrix.setColumn = function (matrix, idx, vals) {
        if (matrix["data"]) { matrix = matrix.data; }
        if (vals["data"]) { vals = vals.data; }
        if (matrix[0].length <= idx) { throw ("setColumn(): over length"); }
        if (matrix.length < vals.length) { throw ("setColumn(): over count"); }
        for (var i = 0; i < matrix.length; i++) {
            matrix[i][idx] = vals[i];
        }
    };
    nstemp.YcMatrix.prototype.setColumn = function (idx, vals) { nstemp.YcMatrix.setColumn(this.data, idx, vals); };

    nstemp.YcMatrix.removeColumn = function (matrix, idx) {
        if (matrix["data"]) { matrix = matrix.data; }
        for (var i = 0; i < matrix.length; i++) {
            matrix[i].splice(idx, 1);
        }
    };
    nstemp.YcMatrix.prototype.removeColumn = function (idx) { nstemp.YcMatrix.removeColumn(this, idx); };

    nstemp.YcMatrix.getRow = function (matrix, idx) {
        if (matrix["data"]) { matrix = matrix.data; }
        if (matrix.length <= idx) { throw ("getRow(): over length"); }
        var rs = [];
        for (var i = 0; i < matrix[0].length; i++) {
            rs.push(matrix[idx][i]);
        }
        return rs;
    };
    nstemp.YcMatrix.prototype.getRow = function (idx) { return nstemp.YcMatrix.getRow(this, idx); };

    nstemp.YcMatrix.setRow = function (matrix, idx, vals) {
        if (matrix["data"]) { matrix = matrix.data; }
        if (vals["data"]) { vals = vals.data; }
        if (matrix.length <= idx) { throw ("setRow(): over length"); }
        if (matrix[idx].length < vals.length) { throw ("setRow(): over count"); }
        for (var i = 0; i < matrix[idx].length; i++) {
            matrix[idx][i] = vals[i];
        }
    };
    nstemp.YcMatrix.prototype.setRow = function (idx, vals) { nstemp.YcMatrix.setRow(this.data, idx, vals); };

    nstemp.YcMatrix.removeRow = function (matrix, idx) {
        if (matrix["data"]) { matrix = matrix.data; }
        matrix.splice(idx, 1);
    };
    nstemp.YcMatrix.prototype.removeRow = function (idx) { nstemp.YcMatrix.removeRow(this, idx); };

    nstemp.YcMatrix.isEqualVal = function (src, comp) {
        if (src["data"]) { src = src.data; }
        if (comp["data"]) { comp = comp.data; }
        for (var row in src) {
            for (var col in src[row]) {
                if (src[row][col] != comp[row][col]) { return false; }
            }
        }
        return true;
    };
    nstemp.YcMatrix.prototype.isEqualVal = function (comp) { return nstemp.YcMatrix.isEqualVal(this, comp); };

    nstemp.YcMatrix.toArray = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }
        var rs = [];
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[0].length; j++) {
                rs.push(matrix[i][j]);
            }
        }
        return rs;
    };
    nstemp.YcMatrix.prototype.toArray = function () { return nstemp.YcMatrix.toArray(this); };

    nstemp.YcMatrix.clone = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }
        var rsMat = [];
        for (var i = 0; i < matrix.length; i++) {
            var row = [];
            for (var j = 0; j < matrix[i].length; j++) {
                row.push(matrix[i][j]);
            }
            rsMat.push(row);
        }
        return new nstemp.YcMatrix(rsMat);
    };
    nstemp.YcMatrix.prototype.clone = function () { return nstemp.YcMatrix.clone(this); };



    //===YcMat2x2===
    nstemp.YcMat2x2 = function () {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };
    for (var loop in nstemp.YcMatrix) {
        nstemp.YcMat2x2[loop] = nstemp.YcMatrix[loop];
    }
    for (var loop in nstemp.YcMatrix.prototype) {
        nstemp.YcMat2x2.prototype[loop] = nstemp.YcMatrix.prototype[loop];
    }
    nstemp.YcMat2x2.prototype.yachis = "math.YcMat2x2";

    nstemp.YcMat2x2.determinant = function (matrix) {
        if (matrix["data"]) { matrix = matrix["data"]; }
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    };
    nstemp.YcMat2x2.inverse = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }

        var d = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        if (d == 0) { return null; }

        d = 1.0 / d;
        var invmat = new nstemp.YcMatrix.fromIdentity(2);
        invmat.data[0][0] = matrix[1][1] * d;
        invmat.data[1][1] = matrix[0][0] * d;
        invmat.data[0][1] = -matrix[0][1] * d;
        invmat.data[1][0] = -matrix[1][0] * d;
        return invmat;
    };

    //===YcMat3x3===
    nstemp.YcMat3x3 = function (data) {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };
    for (var loop in nstemp.YcMatrix) {
        nstemp.YcMat3x3[loop] = nstemp.YcMatrix[loop];
    }
    for (var loop in nstemp.YcMatrix.prototype) {
        nstemp.YcMat3x3.prototype[loop] = nstemp.YcMatrix.prototype[loop];
    }
    nstemp.YcMat3x3.prototype.yachis = "math.YcMat3x3";

    nstemp.YcMat3x3.determinant = function (matrix) {
        if (matrix["data"]) { matrix = matrix["data"]; }
        return matrix[0][0] * matrix[1][1] * matrix[2][2]
            + matrix[0][1] * matrix[1][2] * matrix[2][0]
            + matrix[0][2] * matrix[1][0] * matrix[2][1]
            - matrix[0][2] * matrix[1][1] * matrix[2][0]
            - matrix[0][1] * matrix[1][0] * matrix[2][2]
            - matrix[0][0] * matrix[1][2] * matrix[2][1];
    };

    nstemp.YcMat3x3.inverse = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }

        var b00, b01, b02, b10, b11, b12, b20, b21, b22;

        b00 = matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]; b01 = matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]; b02 = matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1];
        b10 = matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]; b11 = matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]; b12 = matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2];
        b20 = matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]; b21 = matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1]; b22 = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];


        var d = b00 * matrix[0][0] + b01 * matrix[1][0] + b02 * matrix[2][0];

        if (d == 0.0)		//singular?
        {
            //dest.id();
            return null;
        }

        d = 1.0 / d;

        //only do assignment at the end, in case dest == this:
        var dest = nstemp.YcMatrix.fromIdentity(3);

        dest.data[0][0] = b00 * d; dest.data[0][1] = b01 * d; dest.data[0][2] = b02 * d;
        dest.data[1][0] = b10 * d; dest.data[1][1] = b11 * d; dest.data[1][2] = b12 * d;
        dest.data[2][0] = b20 * d; dest.data[2][1] = b21 * d; dest.data[2][2] = b22 * d;

        return dest;
    };


    //===YcMat4x4===
    nstemp.YcMat4x4 = function () {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };
    for (var loop in nstemp.YcMatrix) {
        nstemp.YcMat4x4[loop] = nstemp.YcMatrix[loop];
    }
    for (var loop in nstemp.YcMatrix.prototype) {
        nstemp.YcMat4x4.prototype[loop] = nstemp.YcMatrix.prototype[loop];
    }
    nstemp.YcMat4x4.yachis = "math.YcMat4x4";
    nstemp.YcMat4x4.prototype.yachis = nstemp.YcMat4x4.yachis;

    nstemp.YcMat4x4.inverse = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }
        var a0 = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        var a1 = matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0];
        var a2 = matrix[0][0] * matrix[1][3] - matrix[0][3] * matrix[1][0];
        var a3 = matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1];
        var a4 = matrix[0][1] * matrix[1][3] - matrix[0][3] * matrix[1][1];
        var a5 = matrix[0][2] * matrix[1][3] - matrix[0][3] * matrix[1][2];
        var b0 = matrix[2][0] * matrix[3][1] - matrix[2][1] * matrix[3][0];
        var b1 = matrix[2][0] * matrix[3][2] - matrix[2][2] * matrix[3][0];
        var b2 = matrix[2][0] * matrix[3][3] - matrix[2][3] * matrix[3][0];
        var b3 = matrix[2][1] * matrix[3][2] - matrix[2][2] * matrix[3][1];
        var b4 = matrix[2][1] * matrix[3][3] - matrix[2][3] * matrix[3][1];
        var b5 = matrix[2][2] * matrix[3][3] - matrix[2][3] * matrix[3][2];

        var det = a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0;
        if (det == 0)   //if (Math<Real>::FAbs(det) > epsilon)
        { return null; }

        var invmat = new nstemp.YcMatrix.fromIdentity(4);

        invmat.data[0][0] = +matrix[1][1] * b5 - matrix[1][2] * b4 + matrix[1][3] * b3;
        invmat.data[1][0] = -matrix[1][0] * b5 + matrix[1][2] * b2 - matrix[1][3] * b1;
        invmat.data[2][0] = +matrix[1][0] * b4 - matrix[1][1] * b2 + matrix[1][3] * b0;
        invmat.data[3][0] = -matrix[1][0] * b3 + matrix[1][1] * b1 - matrix[1][2] * b0;
        invmat.data[0][1] = -matrix[0][1] * b5 + matrix[0][2] * b4 - matrix[0][3] * b3;
        invmat.data[1][1] = +matrix[0][0] * b5 - matrix[0][2] * b2 + matrix[0][3] * b1;
        invmat.data[2][1] = -matrix[0][0] * b4 + matrix[0][1] * b2 - matrix[0][3] * b0;
        invmat.data[3][1] = +matrix[0][0] * b3 - matrix[0][1] * b1 + matrix[0][2] * b0;
        invmat.data[0][2] = +matrix[3][1] * a5 - matrix[3][2] * a4 + matrix[3][3] * a3;
        invmat.data[1][2] = -matrix[3][0] * a5 + matrix[3][2] * a2 - matrix[3][3] * a1;
        invmat.data[2][2] = +matrix[3][0] * a4 - matrix[3][1] * a2 + matrix[3][3] * a0;
        invmat.data[3][2] = -matrix[3][0] * a3 + matrix[3][1] * a1 - matrix[3][2] * a0;
        invmat.data[0][3] = -matrix[2][1] * a5 + matrix[2][2] * a4 - matrix[2][3] * a3;
        invmat.data[1][3] = +matrix[2][0] * a5 - matrix[2][2] * a2 + matrix[2][3] * a1;
        invmat.data[2][3] = -matrix[2][0] * a4 + matrix[2][1] * a2 - matrix[2][3] * a0;
        invmat.data[3][3] = +matrix[2][0] * a3 - matrix[2][1] * a1 + matrix[2][2] * a0;

        var invDet = 1.0 / det;
        invmat.data[0][0] *= invDet;
        invmat.data[0][1] *= invDet;
        invmat.data[0][2] *= invDet;
        invmat.data[0][3] *= invDet;
        invmat.data[1][0] *= invDet;
        invmat.data[1][1] *= invDet;
        invmat.data[1][2] *= invDet;
        invmat.data[1][3] *= invDet;
        invmat.data[2][0] *= invDet;
        invmat.data[2][1] *= invDet;
        invmat.data[2][2] *= invDet;
        invmat.data[2][3] *= invDet;
        invmat.data[3][0] *= invDet;
        invmat.data[3][1] *= invDet;
        invmat.data[3][2] *= invDet;
        invmat.data[3][3] *= invDet;

        return invmat;
    };









    /**===============Yc gl==============*/






    /**===YcglMat2x2===*/
    nstemp.YcglMat2x2 = function (data) {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };
    nstemp.YcglMat2x2.yachis = "math.YcglMat2x2";
    nstemp.YcglMat2x2.prototype.yachis = nstemp.YcglMat2x2.yachis;
    nstemp.YcglMat2x2.prototype.data = null;

    nstemp.YcglMat2x2.fromZero = function () { return [0, 0, 0, 0]; };
    nstemp.YcglMat2x2.fromIdentity = function () { return [1, 0, 0, 1]; };


    nstemp.YcglMat2x2.transpose = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        return new nstemp.YcglMat2x2([
            mat[0], mat[2],
            mat[1], mat[3]
        ]);
    };

    nstemp.YcglMat2x2.multiply = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }

        return new nstemp.YcglMat2x2([
            left[0] * right[0] + left[2] * right[1],
            left[1] * right[0] + left[3] * right[1],

            left[0] * right[2] + left[2] * right[3],
            left[1] * right[2] + left[3] * right[3],
        ]);
    };
    nstemp.YcglMat2x2.prototype.multiply = function (right) { return nstemp.YcglMat2x2.multiply(this, right); };

    nstemp.YcglMat2x2.to2Dim = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        return [
            [mat[0], mat[2]],
            [mat[1], mat[3]]
        ];
    };
    nstemp.YcglMat2x2.prototype.to2Dim = function () { return nstemp.YcglMat2x2.to2Dim(this); };


    /**===YcglMat3x3===*/
    nstemp.YcglMat3x3 = function (data) {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };
    nstemp.YcglMat3x3.yachis = "math.YcglMat3x3";
    nstemp.YcglMat3x3.prototype.yachis = nstemp.YcglMat3x3.yachis;
    nstemp.YcglMat3x3.prototype.data = null;

    nstemp.YcglMat3x3.fromZero = function () { return new nstemp.YcglMat3x3([0, 0, 0, 0, 0, 0, 0, 0, 0]); };
    nstemp.YcglMat3x3.fromIdentity = function () { return new nstemp.YcglMat3x3([1, 0, 0, 0, 1, 0, 0, 0, 1]); };


    nstemp.YcglMat3x3.fromQuat = function (quat) {
        if (quat["data"]) { quat = quat.data; }
        var qx = quat[0]; var qy = quat[1]; var qz = quat[2]; var qw = quat[3];
        return new nstemp.YcglMat3x3([
                        1 - 2 * qy * qy - 2 * qz * qz, 2 * qx * qy + 2 * qz * qw, 2 * qx * qz - 2 * qy * qw,
                         2 * qx * qy - 2 * qz * qw, 1 - 2 * qx * qx - 2 * qz * qz, 2 * qy * qz + 2 * qx * qw,
                          2 * qx * qz + 2 * qy * qw, 2 * qy * qz - 2 * qx * qw, 1 - 2 * qx * qx - 2 * qy * qy
	                ]);
    };

    nstemp.YcglMat3x3.fromYawPitchRoll = function (yaw, pitch, roll) {
        var rot = nstemp.YcglMat3x3.fromQuat(nstemp.YcQuat.fromRadianAxis(roll, [0, 0, 1]));
        rot = rot.mulQuat(nstemp.YcQuat.fromRadianAxis(pitch, [1, 0, 0]));
        rot = rot.mulQuat(nstemp.YcQuat.fromRadianAxis(yaw, [0, 1, 0]));
        return new nstemp.YcglMat3x3(rot);
    };

    nstemp.YcglMat3x3.fromYawPitchRollOfMatrix = function (mat, yaw, pitch, roll) {
        mat = new nstemp.YcglMat3x3(mat);
        var rot = nstemp.YcglMat3x3.fromQuat(nstemp.YcQuat.fromRadianAxis(roll, mat.getColumn(2)));
        rot = rot.mulQuat(nstemp.YcQuat.fromRadianAxis(pitch, mat.getColumn(0)));
        rot = rot.mulQuat(nstemp.YcQuat.fromRadianAxis(yaw, mat.getColumn(1)));

        return new nstemp.YcglMat3x3(rot);
    };

    nstemp.YcglMat3x3.fromForwardUp = function (forward, up) {
        forward = new nstemp.YcVector(forward).toNormalize();
        up = new nstemp.YcVector(up).toNormalize();
        var left = forward.cross(up);

        return new nstemp.YcglMat3x3([
            left.data[0], left.data[1], left.data[2],
            up.data[0], up.data[1], up.data[2],
            -forward.data[0], -forward.data[1], -forward.data[2],
        ]);
    };


    nstemp.YcglMat3x3.transpose = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        return new nstemp.YcglMat3x3([
            mat[0], mat[3], mat[6],
            mat[1], mat[4], mat[7],
            mat[2], mat[5], mat[8]
        ]);
    };

    nstemp.YcglMat3x3.prototype.transpose = function () { return nstemp.YcglMat3x3.transpose(this); };



    nstemp.YcglMat3x3.multiply = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }

        return new nstemp.YcglMat3x3([
            left[0] * right[0] + left[3] * right[1] + left[6] * right[2],
            left[1] * right[0] + left[4] * right[1] + left[7] * right[2],
            left[2] * right[0] + left[5] * right[1] + left[8] * right[2],

            left[0] * right[3] + left[3] * right[4] + left[6] * right[5],
            left[1] * right[3] + left[4] * right[4] + left[7] * right[5],
            left[2] * right[3] + left[5] * right[4] + left[8] * right[5],

            left[0] * right[6] + left[3] * right[7] + left[6] * right[8],
            left[1] * right[6] + left[4] * right[7] + left[7] * right[8],
            left[2] * right[6] + left[5] * right[7] + left[8] * right[8]
        ]);
    };
    nstemp.YcglMat3x3.prototype.multiply = function (right) { return nstemp.YcglMat3x3.multiply(this, right); };


    nstemp.YcglMat3x3.mulQuat = function (mat, quat) {
        return nstemp.YcglMat3x3.multiply(mat, nstemp.YcglMat3x3.fromQuat(quat));
    };
    nstemp.YcglMat3x3.prototype.mulQuat = function (quat) { return nstemp.YcglMat3x3.mulQuat(this, quat); };

    nstemp.YcglMat3x3.mulVec = function (leftMat, rightVec) {
        if (leftMat["data"]) { leftMat = leftMat.data; }
        if (rightVec["data"]) { rightVec = rightVec.data; }

        return new nstemp.YcVector([
            leftMat[0] * rightVec[0] + leftMat[3] * rightVec[1] + leftMat[6] * rightVec[2],
            leftMat[1] * rightVec[0] + leftMat[4] * rightVec[1] + leftMat[7] * rightVec[2],
            leftMat[2] * rightVec[0] + leftMat[5] * rightVec[1] + leftMat[8] * rightVec[2]
        ]);
    };
    nstemp.YcglMat3x3.prototype.mulVec = function (rightVec) { nstemp.YcglMat3x3.mulVec(this, rightVec); };




    nstemp.YcglMat3x3.determinant = function (matrix) {
        if (matrix["data"]) { matrix = matrix["data"]; }
        return matrix[0] * matrix[4] * matrix[8]
            + matrix[3] * matrix[7] * matrix[2]
            + matrix[6] * matrix[1] * matrix[5]
            - matrix[6] * matrix[4] * matrix[2]
            - matrix[3] * matrix[1] * matrix[8]
            - matrix[0] * matrix[7] * matrix[5];
    };
    nstemp.YcglMat3x3.prototype.determinant = function () { return nstemp.YcglMat3x3.determinant(this); };

    nstemp.YcglMat3x3.inverse = function (mat) {
        if (mat["data"]) { mat = mat.data; }

        var b00, b01, b02, b10, b11, b12, b20, b21, b22;

        b00 = mat[4] * mat[8] - mat[7] * mat[5]; b01 = mat[6] * mat[5] - mat[3] * mat[8]; b02 = mat[3] * mat[7] - mat[6] * mat[4];
        b10 = mat[7] * mat[2] - mat[1] * mat[8]; b11 = mat[0] * mat[8] - mat[6] * mat[2]; b12 = mat[6] * mat[1] - mat[0] * mat[7];
        b20 = mat[1] * mat[5] - mat[4] * mat[2]; b21 = mat[3] * mat[2] - mat[0] * mat[5]; b22 = mat[0] * mat[4] - mat[3] * mat[1];


        var d = b00 * mat[0] + b01 * mat[1] + b02 * mat[2];

        if (d == 0.0)		//singular?
        {
            //dest.id();
            return null;
        }

        d = 1.0 / d;

        //only do assignment at the end, in case dest == this:
        return [
            b00 * d, b10 * d, b20 * d,
            b01 * d, b11 * d, b21 * d,
            b02 * d, b12 * d, b22 * d,
        ];
    };
    nstemp.YcglMat3x3.prototype.inverse = function () { return nstemp.YcglMat3x3.inverse(this); };


    nstemp.YcglMat3x3.loadNormalize = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        var d0 = 1.0 / nstemp.YcVector.magnitude([mat[0], mat[1], mat[2]]);
        var d1 = 1.0 / nstemp.YcVector.magnitude([mat[3], mat[4], mat[5]]);
        var d2 = 1.0 / nstemp.YcVector.magnitude([mat[6], mat[7], mat[8]]);
        mat[0] *= d0; mat[1] *= d0; mat[2] * d0;
        mat[3] *= d1; mat[4] *= d1; mat[5] * d1;
        mat[6] *= d2; mat[7] *= d2; mat[8] * d2;
    };
    nstemp.YcglMat3x3.prototype.loadNormalize = function () { nstemp.YcglMat3x3.loadNormalize(this); };


    nstemp.YcglMat3x3.getColumn = function (mat, idx) {
        if (mat["data"]) { mat = mat.data; }
        var shift = idx * 3;
        return new nstemp.YcVector([mat[shift], mat[shift + 1], mat[shift + 2]]);
    };
    nstemp.YcglMat3x3.prototype.getColumn = function (idx) { return nstemp.YcglMat3x3.getColumn(this, idx); };
    nstemp.YcglMat3x3.getRow = function (mat, idx) {
        if (mat["data"]) { mat = mat.data; }
        return new nstemp.YcVector([mat[idx], mat[idx + 3], mat[idx + 6]]);
    };
    nstemp.YcglMat3x3.prototype.getRow = function (idx) { nstemp.YcglMat3x3.getRow(this, idx); };



    nstemp.YcglMat3x3.to2Dim = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        return [
            [mat[0], mat[3], mat[6]],
            [mat[1], mat[4], mat[7]],
            [mat[2], mat[5], mat[8]]
        ];
    };
    nstemp.YcglMat3x3.prototype.to2Dim = function () { return nstemp.YcglMat3x3.to2Dim(this); };

    nstemp.YcglMat3x3.toQuat = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        var w = Math.sqrt(1.0 + mat[0] + mat[4] + mat[8]) / 2.0;
        var w4 = (4.0 * w);
        var x = (mat[5] - mat[7]) / w4;
        var y = (mat[6] - mat[2]) / w4;
        var z = (mat[1] - mat[3]) / w4;
        return new nstemp.YcQuat([x, y, z, w]);
    };
    nstemp.YcglMat3x3.prototype.toQuat = function () { return nstemp.YcglMat3x3.toQuat(this); };

    nstemp.YcglMat3x3.toYawPitchRoll = function (mat) {
        if (mat["data"]) { mat = mat.data; }


        //        var ypr = {};
        //        ypr.yaw =  mat[1] / mat[0]
    };
    nstemp.YcglMat3x3.prototype.toYawPitchRoll = function () { nstemp.YcglMat3x3.toYawPitchRoll(this); };


    /**===YcglMat4x4===*/
    nstemp.YcglMat4x4 = function (data) {
        this.data = data;
        if (data && data["data"]) { this.data = data.data; }
    };
    nstemp.YcglMat4x4.yachis = "math.YcglMat4x4";
    nstemp.YcglMat4x4.prototype.yachis = nstemp.YcglMat4x4.yachis;
    nstemp.YcglMat4x4.prototype.data = null;


    nstemp.YcglMat4x4.fromZero = function () { return nstemp.YcglMat4x4([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); };
    nstemp.YcglMat4x4.fromIdentity = function () { return new nstemp.YcglMat4x4([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]); };

    nstemp.YcglMat4x4.fromQuat = function (quat) {
        if (quat["data"]) { quat = quat.data; }
        var qx = quat[0]; var qy = quat[1]; var qz = quat[2]; var qw = quat[3];
        return new nstemp.YcglMat4x4([
                        1 - 2 * qy * qy - 2 * qz * qz, 2 * qx * qy + 2 * qz * qw, 2 * qx * qz - 2 * qy * qw, 0,
                         2 * qx * qy - 2 * qz * qw, 1 - 2 * qx * qx - 2 * qz * qz, 2 * qy * qz + 2 * qx * qw, 0,
                          2 * qx * qz + 2 * qy * qw, 2 * qy * qz - 2 * qx * qw, 1 - 2 * qx * qx - 2 * qy * qy, 0,
                          0, 0, 0, 1
	                ]);
    };

    nstemp.YcglMat4x4.fromForwardUp = function (forward, up) {
        forward = new nstemp.YcVector(dire).toNormalize();
        up = new nstemp.YcVector(up).toNormalize();
        var left = forward.cross(up);
        return new nstemp.YcglMat4x4([
            left[0], left[1], left[2], 0,
            up[0], up[1], up[2], 0,
            -forward[0], -forward[1], -forward[2], 0,
            0, 0, 0, 1
        ]);
    };




    nstemp.YcglMat4x4.transpose = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        return new nstemp.YcglMat4x4([
            mat[0], mat[4], mat[8], mat[12],
            mat[1], mat[5], mat[9], mat[13],
            mat[2], mat[6], mat[10], mat[14],
            mat[3], mat[7], mat[11], mat[15]
        ]);
    };
    nstemp.YcglMat4x4.prototype.transpose = function () { return nstemp.YcglMat4x4.transpose(this); };

    nstemp.YcglMat4x4.multiply = function (left, right) {
        if (left["data"]) { left = left.data; }
        if (right["data"]) { right = right.data; }

        return new nstemp.YcglMat4x4([
            left[0] * right[0] + left[4] * right[1] + left[8] * right[2] + left[12] * right[3],
            left[1] * right[0] + left[5] * right[1] + left[9] * right[2] + left[13] * right[3],
            left[2] * right[0] + left[6] * right[1] + left[10] * right[2] + left[14] * right[3],
            left[3] * right[0] + left[7] * right[1] + left[11] * right[2] + left[15] * right[3],

            left[0] * right[4] + left[4] * right[5] + left[8] * right[6] + left[12] * right[7],
            left[1] * right[4] + left[5] * right[5] + left[9] * right[6] + left[13] * right[7],
            left[2] * right[4] + left[6] * right[5] + left[10] * right[6] + left[14] * right[7],
            left[3] * right[4] + left[7] * right[5] + left[11] * right[6] + left[15] * right[7],

            left[0] * right[8] + left[4] * right[9] + left[8] * right[10] + left[12] * right[11],
            left[1] * right[8] + left[5] * right[9] + left[9] * right[10] + left[13] * right[11],
            left[2] * right[8] + left[6] * right[9] + left[10] * right[10] + left[14] * right[11],
            left[3] * right[8] + left[7] * right[9] + left[11] * right[10] + left[15] * right[11],

            left[0] * right[12] + left[4] * right[13] + left[8] * right[14] + left[12] * right[15],
            left[1] * right[12] + left[5] * right[13] + left[9] * right[14] + left[13] * right[15],
            left[2] * right[12] + left[6] * right[13] + left[10] * right[14] + left[14] * right[15],
            left[3] * right[12] + left[7] * right[13] + left[11] * right[14] + left[15] * right[15]
        ]);
    };
    nstemp.YcglMat4x4.prototype.multiply = function (right) { return nstemp.YcglMat4x4.multiply(this, right); };


    nstemp.YcglMat4x4.mulQuat = function (mat, quat) {
        return nstemp.YcglMat4x4.multiply(mat, nstemp.YcglMat4x4.fromQuat(quat));
    };
    nstemp.YcglMat4x4.prototype.mulQuat = function (quat) { return nstemp.YcglMat4x4.mulQuat(this, quat); };

    nstemp.YcglMat4x4.mulVec = function (leftMat, rightVec) {
        if (leftMat["data"]) { leftMat = leftMat.data; }
        if (rightVec["data"]) { rightVec = rightVec.data; }

        return new nstemp.YcVector([
            leftMat[0] * rightVec[0] + leftMat[4] * rightVec[1] + leftMat[8] * rightVec[2] + leftMat[12] * rightVec[3],
            leftMat[1] * rightVec[0] + leftMat[5] * rightVec[1] + leftMat[9] * rightVec[2] + leftMat[13] * rightVec[3],
            leftMat[2] * rightVec[0] + leftMat[6] * rightVec[1] + leftMat[10] * rightVec[2] + leftMat[14] * rightVec[3],
            leftMat[3] * rightVec[0] + leftMat[7] * rightVec[1] + leftMat[11] * rightVec[2] + leftMat[15] * rightVec[3]
        ]);
    };
    nstemp.YcglMat4x4.prototype.mulVec = function (rightVec) { nstemp.YcglMat4x4.mulVec(this, rightVec); };




    nstemp.YcglMat4x4.determinant = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        return mat[12] * mat[9] * mat[6] * mat[3] - mat[8] * mat[13] * mat[6] * mat[3] -
            mat[12] * mat[5] * mat[10] * mat[3] + mat[4] * mat[13] * mat[10] * mat[3] +
            mat[8] * mat[5] * mat[14] * mat[3] - mat[4] * mat[9] * mat[14] * mat[3] -
            mat[12] * mat[9] * mat[2] * mat[7] + mat[8] * mat[13] * mat[2] * mat[7] +
            mat[12] * mat[1] * mat[10] * mat[7] - mat[0] * mat[13] * mat[10] * mat[7] -
            mat[8] * mat[1] * mat[14] * mat[7] + mat[0] * mat[9] * mat[14] * mat[7] +
            mat[12] * mat[5] * mat[2] * mat[11] - mat[4] * mat[13] * mat[2] * mat[11] -
            mat[12] * mat[1] * mat[6] * mat[11] + mat[0] * mat[13] * mat[6] * mat[11] +
            mat[4] * mat[1] * mat[14] * mat[11] - mat[0] * mat[5] * mat[14] * mat[11] -
            mat[8] * mat[5] * mat[2] * mat[15] + mat[4] * mat[9] * mat[2] * mat[15] +
            mat[8] * mat[1] * mat[6] * mat[15] - mat[0] * mat[9] * mat[6] * mat[15] -
            mat[4] * mat[1] * mat[10] * mat[15] + mat[0] * mat[5] * mat[10] * mat[15];
    };
    nstemp.YcglMat4x4.prototype.determinant = function () { return nstemp.YcglMat4x4.determinant(this); };


    nstemp.YcglMat4x4.inverse = function (matrix) {
        if (matrix["data"]) { matrix = matrix.data; }
        var a0 = matrix[0] * matrix[5] - matrix[4] * matrix[1];
        var a1 = matrix[0] * matrix[9] - matrix[8] * matrix[1];
        var a2 = matrix[0] * matrix[13] - matrix[12] * matrix[1];
        var a3 = matrix[4] * matrix[9] - matrix[8] * matrix[5];
        var a4 = matrix[4] * matrix[13] - matrix[12] * matrix[5];
        var a5 = matrix[8] * matrix[13] - matrix[12] * matrix[9];
        var b0 = matrix[2] * matrix[7] - matrix[6] * matrix[3];
        var b1 = matrix[2] * matrix[11] - matrix[10] * matrix[3];
        var b2 = matrix[2] * matrix[15] - matrix[14] * matrix[3];
        var b3 = matrix[6] * matrix[11] - matrix[10] * matrix[7];
        var b4 = matrix[6] * matrix[15] - matrix[14] * matrix[7];
        var b5 = matrix[10] * matrix[15] - matrix[14] * matrix[11];

        var det = a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0;
        if (det == 0)   //if (Math<Real>::FAbs(det) > epsilon)
        { return null; }

        var invmat = nstemp.YcglMat4x4.fromIdentity();

        invmat.data[0] = +matrix[5] * b5 - matrix[9] * b4 + matrix[13] * b3;

        invmat.data[1] = -matrix[1] * b5 + matrix[9] * b2 - matrix[13] * b1;
        invmat.data[2] = +matrix[1] * b4 - matrix[5] * b2 + matrix[13] * b0;
        invmat.data[3] = -matrix[1] * b3 + matrix[5] * b1 - matrix[9] * b0;
        invmat.data[4] = -matrix[4] * b5 + matrix[8] * b4 - matrix[12] * b3;
        invmat.data[5] = +matrix[0] * b5 - matrix[8] * b2 + matrix[12] * b1;
        invmat.data[6] = -matrix[0] * b4 + matrix[4] * b2 - matrix[12] * b0;
        invmat.data[7] = +matrix[0] * b3 - matrix[4] * b1 + matrix[8] * b0;
        invmat.data[8] = +matrix[7] * a5 - matrix[11] * a4 + matrix[15] * a3;
        invmat.data[9] = -matrix[3] * a5 + matrix[11] * a2 - matrix[15] * a1;
        invmat.data[10] = +matrix[3] * a4 - matrix[7] * a2 + matrix[15] * a0;
        invmat.data[11] = -matrix[3] * a3 + matrix[7] * a1 - matrix[11] * a0;
        invmat.data[12] = -matrix[6] * a5 + matrix[10] * a4 - matrix[14] * a3;
        invmat.data[13] = +matrix[2] * a5 - matrix[10] * a2 + matrix[14] * a1;
        invmat.data[14] = -matrix[2] * a4 + matrix[6] * a2 - matrix[14] * a0;
        invmat.data[15] = +matrix[2] * a3 - matrix[6] * a1 + matrix[10] * a0;

        var invDet = 1.0 / det;
        invmat.data[0] *= invDet;
        invmat.data[4] *= invDet;
        invmat.data[8] *= invDet;
        invmat.data[12] *= invDet;
        invmat.data[1] *= invDet;
        invmat.data[5] *= invDet;
        invmat.data[9] *= invDet;
        invmat.data[13] *= invDet;
        invmat.data[2] *= invDet;
        invmat.data[6] *= invDet;
        invmat.data[10] *= invDet;
        invmat.data[14] *= invDet;
        invmat.data[3] *= invDet;
        invmat.data[7] *= invDet;
        invmat.data[11] *= invDet;
        invmat.data[15] *= invDet;

        return invmat;
    };
    nstemp.YcglMat4x4.prototype.inverse = function () { return nstemp.YcglMat4x4.inverse(this); };





    nstemp.YcglMat4x4.getColumn = function (mat, idx) {
        if (mat["data"]) { mat = mat.data; }
        var shift = idx * 4;
        return new nstemp.YcVector([mat[shift], mat[shift + 1], mat[shift + 2], mat[shift + 3]]);
    };
    nstemp.YcglMat4x4.prototype.getColumn = function (idx) { return nstemp.YcglMat4x4.getColumn(this, idx); };
    nstemp.YcglMat4x4.getRow = function (mat, idx) {
        if (mat["data"]) { mat = mat.data; }
        return new nstemp.YcVector([mat[idx], mat[idx + 4], mat[idx + 8], mat[idx + 12]]);
    };
    nstemp.YcglMat4x4.prototype.getRow = function (idx) { nstemp.YcglMat4x4.getRow(this, idx); };

    nstemp.YcglMat4x4.to2Dim = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        return [
            [mat[0], mat[4], mat[8], mat[12]],
            [mat[1], mat[5], mat[9], mat[13]],
            [mat[2], mat[6], mat[10], mat[14]],
            [mat[3], mat[7], mat[11], mat[15]]
        ];
    };
    nstemp.YcglMat4x4.prototype.to2Dim = function () { return nstemp.YcglMat4x4.to2Dim(this); };

    nstemp.YcglMat4x4.toQuat = function (mat) {
        if (mat["data"]) { mat = mat.data; }
        var w = Math.sqrt(1.0 + mat[0] + mat[5] + mat[10]) / 2.0;
        var w4 = (4.0 * w);
        var x = (mat[6] - mat[9]) / w4;
        var y = (mat[8] - mat[2]) / w4;
        var z = (mat[1] - mat[4]) / w4;
        return new nstemp.YcQuat([x, y, z, w]);
    };
    nstemp.YcglMat4x4.prototype.toQuat = function () { return nstemp.YcglMat4x4.toQuat(this); };



    return nstemp;
} (window["yachis"]);
