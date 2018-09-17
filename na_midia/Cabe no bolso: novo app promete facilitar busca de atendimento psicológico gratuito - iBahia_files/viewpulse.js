(function() {
	if(typeof(gvp) != 'undefined') {
		var u = window.location.protocol+'//'+window.location.hostname;
		if(window.location.port!="") { u += ":"+window.location.port; }
		u += '/ibahia/urchin.gif?';
		u += 'utme=8(nid*ed)9('; u += gvp.ib.id; u += "*"; u += encodeURIComponent(gvp.ib.title); u += ')&utmcs=UTF-8';
	    var i = document.createElement('img');
	    i.src = u;
	    i.style = "float:left;";
	    document.body.appendChild(i);
	}
})();
