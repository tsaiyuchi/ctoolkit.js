/*
Create: 201012211412
Last Update: 201012211412
Creator: Yuchi
Intro: Core
*/




window["ctkjs"] = (function () {
    var nstp = {};



    nstp.errorStack = [];
    nstp.errorStackMaxCount = 10;
    nstp.errorPush = function (obj) {
        nstp.errorStack.push(obj);
        if (nstp.errorStack.length > nstp.errorStackMaxCount) {
            nstp.errorStack.shift();
        }
    };
    nstp.errorPop = function () {
        return nstp.errorStack.pop();
    };
    nstp.lastError = function () {
        return nstp.errorStack[nstp.errorStack.length - 1];
    };


    /**201102041558
        
    */
    nstp.getXmlHttpRequest = function () {
        var xmlHttp;
        if (window.XMLHttpRequest) {/**code for IE7+, Firefox, Chrome, Opera, Safari*/
            xmlHttp = new XMLHttpRequest();
        } else if (window.ActiveXObject) {/**code for IE6, IE5*/
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlHttp;

        //        xmlHttp.onreadystatechange = function () {
        //            if (xmlHttp.readyState == 4 || xmlHttp.readyState == 'complete') {
        //                if (xmlHttp.status == 200) {
        //                //Success
        //                } else {
        //                //Fail
        //                }
        //            }
        //        }

        //Send
        //this.xmlHttp.open(method, targetUrl, true);
        //this.xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //this.xmlHttp.send(post string);
    };

    //201011041819
    nstp.convertStringToXml = function (strXML) {
        if (window.ActiveXObject) {
            xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(strXML);
            return xmlDoc;
        } else {
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(strXML, "text/xml");
            return xmlDoc;
        }
    };

    //201011041819
    nstp.convertXmlToString = function (xmlObject) {
        if (window.ActiveXObject) { // for IE
            return xmlObject.xml;
        } else {
            return (new XMLSerializer()).serializeToString(xmlObject);
        }
    };

    //201011051028
    nstp.getBodySize = function () {
        var width, height; //窗口的高和宽
        //取得窗口的高和宽
        if (self.innerHeight) {
            width = self.innerWidth;
            height = self.innerHeight;
        } else if (document.documentElement && document.documentElement.clientHeight) {
            width = document.documentElement.clientWidth;
            height = document.documentElement.clientHeight;
        } else if (document.body) {
            width = document.body.clientWidth;
            height = document.body.clientHeight;
        }
        return { width: width, height: height };
    };


    //201011051048
    nstp.getMousePosition = function (ev) {
        try {
            this.ev = ev || window.event;

            if (this.ev.pageX, this.ev.pageY) {
                x = this.ev.pageX;
                y = this.ev.pageY;
            } else {
                x = this.ev.clientX + document.body.scrollLeft;
                y = this.ev.clientY + document.body.scrollTop;
            }
            return { x: x, y: y };
        } catch (ex) { return { x: 0, y: 0 }; }
    };


    /*/201011051055
    that can use jQuery $(window).scrollTop()
    or $("body").scrollTop(), this body is no scrollTop at IE and FireFox.
    */
    nstp.getScroll = function () {
        var t, l, w, h;
        if (document.documentElement && document.documentElement.scrollTop) {
            t = document.documentElement.scrollTop;
            l = document.documentElement.scrollLeft;
            w = document.documentElement.scrollWidth;
            h = document.documentElement.scrollHeight;
        } else if (document.body) {
            t = document.body.scrollTop;
            l = document.body.scrollLeft;
            w = document.body.scrollWidth;
            h = document.body.scrollHeight;
        }
        return { top: t, left: l, width: w, height: h };
    };


    //201011051414
    nstp.fillZero = function (argStr, argInt) {
        if (argStr.length < argInt) {
            return ycrnajs.fillZero("0" + argStr, argInt);
        }

        if (argStr.length > argInt) {
            return argStr.substr(argStr.length - argInt);
        }
        return argStr;
    };

    /*
    //201012281045
    IE is not use capture.
    The eventName must be "on"(onkeydown) on IE, and else(FireFox, Chrome) has not "on". 
    */
    nstp.addEventListener = function (obj, eventName, func, capture) {
        if (obj["addEventListener"]) {
            obj.addEventListener(eventName, func, capture);
        } else if (obj["attachEvent"]) {

            obj.attachEvent("on" + eventName, func);
        }
    };
    nstp.removeEventListener = function (obj, eventName, func, capture) {
        if (obj["removeEventListener"]) {
            obj.removeEventListener(eventName, func, capture);
        } else if (obj["detachEvent"]) {
            obj.detachEvent("on" + eventName, func);
        }
    };

    nstp.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if(results == null) return null;
        return results[1] || 0;
    }


    return nstp;
})();


