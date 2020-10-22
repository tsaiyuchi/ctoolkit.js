/*
Create: 201012211412
Last Update: 201012211412
Creator: Yuchi
Intro: Debug
Reference: 

*/




if (!window["ctkjs"]) {
    window["ctkjs"] = {};
}


ctkjs.debug = function () {
    var nstp = {};



    nstp.message = "";
    nstp.msgContainer = null;
    nstp.writeMsg = function (msg) {
        this.message += msg;
    };
    nstp.writeMember = function (obj, newline) {
        newline = newline ? newline : "\r\n";
        for (var key in obj) {
            try {
                this.message += key + " = " + obj[key] + newline;
            } catch (ex) { this.message += key + " = " + ex + newline; }
        }

    };
    nstp.clearMsg = function () { this.message = ""; };
    nstp.getMsgContainer = function () {
        if (!this.msgContainer) {
            var ta = document.createElement("textarea");
            ta.style.position = "absolute";
            ta.style.top = "10px";
            ta.style.left = "600px";
            ta.style.width = "500px";
            ta.style.height = "300px";
            ta.style.zIndex = 99999;
            document.body.appendChild(ta);
            this.msgContainer = ta;
        }
        return this.msgContainer;
    };
    nstp.showMsg = function (msg, container) {
        if (container == null) { container = this.getMsgContainer(); }
        else { if (typeof (container) == typeof ("string")) { container = document.getElementById(container); } }
        if (!msg) { msg = this.message; }
        if (container.value != undefined) { container.value = msg; }
        else { container.innerHTML = msg; }
    };

    nstp.showMember = function (obj, container) {
        if (container == null) { container = this.getMsgContainer(); }
        else { if (typeof (container) == typeof ("string")) { container = document.getElementById(container); } }

        var br = container.value != undefined ? ";\r\n" : ";<br />";
        var str = "";
        for (var key in obj) {
            try {
                str += key + " = " + obj[key] + br;
            } catch (ex) { str += key + " = " + ex + br; }
        }

        if (container.value != undefined) {
            container.value = str;
        } else { container.innerHTML = str; }
    };




    return nstp;
}();
