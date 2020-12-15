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

function getTemplatesFromStorage(key, type) {
	chrome.storage.local.get(key, function(result) {
		let div = document.getElementById("userTemplates")
		let button = document.createElement('button')
		let text = document.createTextNode(key.substring(0, key.length - 8))
		button.appendChild(text)
		div.appendChild(button)
		let message = {
			"type": type,
			"message": result[key]
		}
		button.addEventListener("click", () => onClickAddComment(message), false)
	});
}

function onClickAddComment(message) {
	chrome.tabs.query({currentWindow: true, active: true},
	function(tabs) {
		if (isSnow(tabs[0].url)) {
			chrome.tabs.sendMessage(tabs[0].id, message)
		}
	})
}


document.getElementById("getAllTab").click();

document.addEventListener('DOMContentLoaded', function() {
	// chrome.storage.local.clear()
	chrome.storage.local.get(null, function(items) {
		for (key in items) {
			if (key.includes("-suspend")) {
					getTemplatesFromStorage(key, "suspend")
			}
			if (key.includes("--close")) {
					getTemplatesFromStorage(key, "close")
			}
		}
	});
	document.getElementById("suspend").addEventListener("click", () => onClickAddComment(messageToSuspend), false)
	document.getElementById("close").addEventListener("click", () => onClickAddComment(messageToClose), false)

}, false)

document.addEventListener('DOMContentLoaded', function() {
	document.getElementById("new").addEventListener("click", onClickNew, false)
	document.getElementById("forSuspend").checked = true
	document.getElementById("forSuspend").addEventListener("change", () => onChange(document.getElementById("forSuspend")), false)
	document.getElementById("forClose").addEventListener("change", () => onChange(document.getElementById("forClose")), false)

	function onClickNew() {

		let suspendCheck = document.getElementById("forSuspend")
		let closeCheck = document.getElementById("forClose")
		let name = document.getElementById("templateName").value
		let text = document.getElementById("commentText").value
		if (suspendCheck.checked) {
			name += "-suspend"
			chrome.storage.local.set({[name]: text})
		}
		if (closeCheck.checked) {
			name += "---close"
			chrome.storage.local.set({[name]: text})
		}
	}

	function onChange(input) {
		var checkboxes = document.getElementsByClassName("checkboxes")
    	for(var i = 0; i < checkboxes.length; i++)
    	{
    		if(checkboxes[i].checked == true)
    		{
    			checkboxes[i].checked = false
    		}
    	}
    	if(input.checked == true)
    	{
    		input.checked = false
    	}
    	else
    	{
    		input.checked = true
    	}
	}
}, false)
