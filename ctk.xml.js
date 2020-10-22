/*
Create: 201012211412
Last Update: 201012211412
Creator: Yuchi
Intro: Debug
Reference: jQuery v1.5.1

 */

if (!window["ctkjs"]) {
    window["ctkjs"] = {};
}

ctkjs.xml = (function (ns) {
	var nstp = {};

	nstp.parseXml = function(xmlData) {
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDom = parser.parseFromString(xmlData, "text/xml");
			return xmlDom;
		} else if (window.ActiveXObject) {
			xmlDom = new ActiveXObject("Microsoft.XMLDOM");
			xmlDom.async = "false";
			xmlDom.loadXML(xmlData);
			return xmlDom;
		}
	}
	nstp.toXmlString = function(xmlDom) {
		if (window.DOMParser) {
			return (new XMLSerializer()).serializeToString(xmlDom);
		} else if (window.ActiveXObject) { // for IE
			return xmlDom.xml;
		}
	}

	/* ===XmlDoc=== */
	nstp.XmlDoc = function(xmlData) {
		if (typeof (xmlData) == typeof ("string")) {
			this.xmlObj = nstp.parseXml(xmlData);
		} else {
			this.xmlObj = xmlData;
		}
	}
	nstp.XmlDoc.prototype.xmlObj = null;

	nstp.XmlDoc.prototype.toXmlString = function() {
		return nstp.toXmlString(this.xmlObj);
	};

	nstp.XmlDoc.prototype.createElement = function(elementName) {
		var elmt = this.xmlObj.createElement(elementName);
		this.xmlObj.documentElement.appendChild(elmt);
		return elmt;
	};

	return nstp;
})();
