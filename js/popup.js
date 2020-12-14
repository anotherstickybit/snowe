let messageToClose = {
	"type": "close",
	"message": "What was done:\nWhat was changed and what result was achieved by this:\nWhat else should be done (if necessary):"
}
let messageToSuspend = {
	"type": "suspend",
	"message": "Last implemented action:\nNext planned action:\nPlanned date for next action:\nResponsible person:"
}

function isSnow(url) {
	if (url.includes("excalibur.service-now")) {
		return true;
	}
	else {
		return false;
	}
}

document.getElementById("getAllTab").addEventListener("click", () => openAllTab(event ,'allTemplates'), false)
document.getElementById("createCustomTab").addEventListener("click", () => openAllTab(event, 'createCustomTemplate'), false)

function openAllTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}


document.getElementById("getAllTab").click();

document.addEventListener('DOMContentLoaded', function() {
document.getElementById("suspend").addEventListener("click", onclickSubpend, false)

	function onclickSubpend() {
		chrome.tabs.query({currentWindow: true, active: true},
		function(tabs) {
			if (isSnow(tabs[0].url)) {
				chrome.tabs.sendMessage(tabs[0].id, messageToSuspend)
			}
		})
	}
}, false)

document.addEventListener('DOMContentLoaded', function() {
document.getElementById("close").addEventListener("click", onclickClose, false)

function onclickClose() {
	chrome.tabs.query({currentWindow: true, active: true},
	function(tabs) {
		if (isSnow(tabs[0].url)) {
			chrome.tabs.sendMessage(tabs[0].id, messageToClose)
		}
	})
}
}, false)
