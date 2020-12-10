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
