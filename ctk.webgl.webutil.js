/*
Create: 201103121134
Last Update: 201103121134
Creator: Yuchi
Intro: webUtil namespace
Reference: jquery-1.4.3.min.js
jquery.cookie.js

*/

if (!window["ctkjs"]) {
    window["ctkjs"] = {};
}

if (!ctkjs["webgl"]) {
    var error = "webgl.draw{}: Must refer to yachis.webgl";
    if (ctkjs["errorPush"]) { nstemp.errorPush(error); }
    throw (error);
}

ctkjs.webgl["webUtil"] = function () {
    var errorFunc = function (msg) { if (window["ctkjs"] && yachis["errorPush"]) { yachis.errorPush(msg); } };
    var nstemp = {};


    nstemp.cookiekey_webglViewpoint = "webglViewpoint";



    /*Viewpoint element {text, value, position, rotation}
    */
    nstemp.getViewpoints = function () {
        var viewpoints = [];
        var sElmt = $.cookie(nstemp.cookiekey_webglViewpoint);
        if (sElmt) {
            sElmt = sElmt.split(",");
            for (var loop in sElmt) {
                try {
                    eval("viewpoints.push(" + decodeURIComponent(sElmt[loop]) + ")");
                } catch (ex) { }
            }
        }
        return viewpoints;
    };
    nstemp.setViewpoints = function (viewpoints) {
        var elmts = [];
        for (var loopIdx = 0; loopIdx < viewpoints.length; loopIdx++) {
            var loop = viewpoints[loopIdx];

            var pos = [];
            for (var i = 0; i < loop.position.length; i++) { pos.push(loop.position[i]); }
            var rot = [];
            for (var i = 0; i < loop.rotation.length; i++) { rot.push(loop.rotation[i]); }

            elmts.push(encodeURIComponent("{ text: \"" + loop.text + "\", value:\"" + loop.value
                + "\", position: [" + pos + "], rotation: [" + rot + "]}"));
        }
        $.cookie(nstemp.cookiekey_webglViewpoint, elmts.join(","));
    };

    nstemp.clearViewpoints = function () {
        $.cookie(nstemp.cookiekey_webglViewpoint, null, { expire: -1 });
    };

    nstemp.addViewpoint = function (vp) {
        var viewpoints = nstemp.getViewpoints();
        viewpoints.push(vp);
        nstemp.setViewpoints(viewpoints);

    };
    nstemp.removeViewpointAt = function (idx) {
        var viewpoints = nstemp.getViewpoints();
        viewpoints.splice(idx, 1);
        nstemp.setViewpoints(viewpoints);
    };


    nstemp.keyboardCtrl = function(obj){
    	try{
    	var keys = obj.keys;
    	var camera = obj.camera;
    	
    	var camerapos = camera.getPosition();
    	var camerarot=camera.getRotation();
    	
    	var mat=camera.getRotMatrix();
    	var bw=GLGE.mulMat4Vec4(mat,[0,0,1,1]);
    	bw.splice(3, 1);
    	var rw=GLGE.mulMat4Vec4(mat,[1,0,0,1]);
    	rw.splice(3, 1);
	    	
    	if(keys.isKeyPressed(GLGE.KI_W)){ GLGE.subVec3(camerapos, bw); }
    	if(keys.isKeyPressed(GLGE.KI_S)){ GLGE.addVec3(camerapos, bw); }
    	if(keys.isKeyPressed(GLGE.KI_A)){ GLGE.subVec3(camerapos, rw); }
    	if(keys.isKeyPressed(GLGE.KI_D)){ GLGE.addVec3(camerapos, rw); }
    	if(keys.isKeyPressed(GLGE.KI_R)){}
    	if(keys.isKeyPressed(GLGE.KI_F)){}
    	
    	
    	}catch(ex){alert(ex);}
    };


    return nstemp;
} ();