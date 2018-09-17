if (navigator && navigator.platform) {
    var sasIsIosUiwebview = false;
    if (navigator.platform.substr(0,2) === 'iP') {
      var lte9 = /constructor/i.test(window.HTMLElement);
      var nav = window.navigator, ua = nav.userAgent, idb = !!window.indexedDB;
      if (ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !nav.standalone) {      
        sasIsIosUiwebview = false;
      } else if ((!idb && lte9) || !window.statusbar.visible) {
        sasIsIosUiwebview = true;
      } else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb) {
        sasIsIosUiwebview = true;
      }
    }
    if (!sasIsIosUiwebview) {
        var smartCsync=document.createElement('IFRAME');smartCsync.src='//csync.smartadserver.com/rtb/csync/CookieSync.html?nwid=3050&dcid=5';
        smartCsync.scrolling = 'no';smartCsync.frameBorder = 0;smartCsync.width = 0;smartCsync.height = 0;smartCsync.style.margin = 0;smartCsync.style.padding = 0;smartCsync.style.display = 'none';smartCsync.style.width = '0px';smartCsync.style.height = '0px';smartCsync.style.visibility = 'hidden';
        if(document.body != null)document.body.appendChild(smartCsync);
    }
}CookieSmartPid = 874972191834408199;
var sas_getDomElem = function(id) {
return d.getElementById(id).contentDocument || d.frames[id].document;
}
//Transférer la valeur Csync via PostMessage
//Eventlistener pour récupérer l'info
  var CsyncMessage = "";
        window.addEventListener("message", function(event) {
            if(event.data.indexOf("sas_csync_") != -1) {
                CsyncMessage = event.data.slice(10);
            }
            
        }, true);

var sas_i = document.createElement('iframe');


sas_i.src = "//demo.smartadserver.com/shared/VidCoin/Csync-vidcoin.html?nwid= 3050&dcid=6";
sas_i.id = 'sas_iframe';
sas_i.scrolling = 'no';
sas_i.frameBorder = 0;
sas_i.width = 0;
sas_i.height = 0;
sas_i.style.display = 'none';
sas_i.style.margin = 0;
sas_i.style.padding = 0;
sas_i.style.width = '0px';
sas_i.style.height = '0px';

window.document.getElementsByTagName('body')[0].appendChild(sas_i);