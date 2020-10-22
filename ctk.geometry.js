/*
Create: 201101181428
Last Update: 201101181428
Creator: Yuchi
Intro: WebGL namespace
Reference: yachis.math

if you has reference yachis.js then you must move it before this.
*/


if (!window["ctkjs"]) {
    window["ctkjs"] = {};
}


ctkjs.geometry = (function (nsroot) {
    //Preprocessing 

    if (!nsroot["math"]) {
        var error = "shape{}: Must refer to yachis.math";
        if (nsroot["errorPush"]) { nsroot.errorPush(error); }
        throw (error);
    }
    var nsmath = nsroot["math"];

    //if (nsroot.geometry) { return nsroot.geometry; }
    nsroot.geometry = {};
    var nstemp = nsroot.geometry;







    /**===YcRay===*/
    nstemp.YcRay = function () {
    };
    nstemp.YcRay.yachis = "geometry.YcRay";
    nstemp.YcRay.prototype.yachis = nstemp.YcRay.yachis;
    nstemp.YcRay.prototype.position = [0, 0, 0];
    nstemp.YcRay.prototype.direction = [0, 0, -1];

    nstemp.YcRay.fromPosDirect = function (pos, dire) {
        var rs = new nstemp.YcRay();
        rs.position = pos["data"] ? pos.data : pos;
        rs.direction = dire["data"] ? dire.data : dire;
        return rs;
    };
    nstemp.YcRay.fromPoint = function (start, end) {
        start = new nsmath.YcVector(start);
        end = new nsmath.YcVector(end);

        var rs = new nstemp.YcRay();
        rs.position = start.data;
        rs.direction = end.subtract(start).data;
        return rs;
    };



    nstemp.YcRay.prototype.intersectPlane = function (plane) {
        return nstemp.intersect_Ray_Plane(this, plane);
    };




    /**===YcPlane===*/
    nstemp.YcPlane = function () {
    };
    nstemp.YcPlane.yachis = "geometry.YcPlane";
    nstemp.YcPlane.prototype.yachis = nstemp.YcPlane.yachis;
    nstemp.YcPlane.prototype.normal = [0, 1, 0];
    nstemp.YcPlane.prototype.d = 0.0;

    nstemp.YcPlane.fromPoint = function (p1, p2, p3) {
        p1 = new nsmath.YcVector(p1);
        p2 = new nsmath.YcVector(p2);
        p3 = new nsmath.YcVector(p3);

        var n = p2.subtract(p1).cross(p3.subtract(p1));
        if (n.magnitude() == 0.0) { return null; }

        n = n.toNormalize();

        var rs = new nstemp.YcPlane();
        rs.normal = n.data;
        rs.d = -p1.dot(n);
        return rs;
    };
    nstemp.YcPlane.fromNormalD = function (normal, d) {
        var rs = new nstemp.YcPlane();
        rs.normal = normal;
        rs.d = d;
        return rs;
    };

    /**===YcBoxShapeDesc===*/
    nstemp.YcBoxShapeDesc = function () {
    };
    nstemp.YcBoxShapeDesc.yachis = "geometry.YcBoxShapeDesc";
    nstemp.YcBoxShapeDesc.prototype.yachis = nstemp.YcBoxShapeDesc.yachis;
    nstemp.YcBoxShapeDesc.prototype.dimension = [1, 1, 1];
    nstemp.YcBoxShapeDesc.fromDimenstion = function (x, y, z) {
        var rs = new nstemp.YcBoxShapeDesc();
        rs.dimenstion = [x, y, z];
        return rs;
    };


    /**YcRectangleShapeDesc*/
    nstemp.YcRectangleShapeDesc = function () {
    };
    nstemp.YcRectangleShapeDesc.yachis = "geometry.YcRectangleShapeDesc";
    nstemp.YcRectangleShapeDesc.prototype.yachis = nstemp.YcRectangleShapeDesc.yachis;
    nstemp.YcRectangleShapeDesc.prototype.normal = [0, 1, 0];
    nstemp.YcRectangleShapeDesc.prototype.dimension = [1, 1];
    nstemp.YcRectangleShapeDesc.fromNormalDimension = function (nx, ny, nz, x, y) {
        var rs = new nstemp.YcRectangleShapeDesc();
        rs.normal = [nx, ny, nz];
        rs.dimension = [x, y];
        return rs;
    };




    /**
    * <param ray> its YcRay
    * <param plane> its YcPlane
    */
    nstemp.intersect_Ray_Plane = function (ray, plane) {
        var t = nsmath.YcVector.dot(ray.direction, plane.normal);
        if (t == 0) { return null; }
        t = 1.0 / t;
        t = t * (plane.d - nsmath.YcVector.dot(ray.position, plane.normal));
        return nsmath.YcVector.mulNum(ray.direction, t).add(ray.position).data;
    };




    return nstemp;
})(window["yachis"]);