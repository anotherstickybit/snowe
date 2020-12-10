var oldHref = document.location.href;
window.onload = function() {
    var bodyList = document.querySelector("body")
        ,observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    setTimeout(function() { incidentAndTask(); }, 1000);
                }
            });
        });
    var config = {
        childList: true,
        subtree: true
    };
    observer.observe(bodyList, config);
};

function incidentAndTask() {
  if (document.getElementById('gsft_main')) {
    let saveButton = document.getElementById('gsft_main').contentWindow.document.getElementById('sysverb_update_and_stay');
    let updateButton = document.getElementById('gsft_main').contentWindow.document.getElementById('sysverb_update');
    if (saveButton) {
      saveButton.disabled = true;
      updateButton.disabled = true;
      let timeWorkedMins = document.getElementById('gsft_main').contentWindow.document.querySelector('[id^="otmr"][id$="min"]');
      let timeWorkedHours = document.getElementById('gsft_main').contentWindow.document.querySelector('[id^="otmr"][id$="hour"]');
    	let minutes = timeWorkedMins.innerHTML
    	timeWorkedMins.addEventListener('DOMSubtreeModified', () => {
    		if (timeWorkedMins.innerHTML % 15 === 0 || timeWorkedMins.innerHTML === minutes) {
    			saveButton.disabled = false;
          updateButton.disabled = false;
    			timeWorkedMins.style.backgroundColor = "";
    		}
    		if (timeWorkedMins.innerHTML % 15 != 0) {
          saveButton.disabled = true;
          updateButton.disabled = true;
    			timeWorkedMins.style.backgroundColor = "red";
        }
    	})
    }
  }
}

function changeTask() {
  alert('CHANGE TASK')
}

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse) {
	console.log(message)
	if (message.type === 'suspend') {
		document.getElementById('gsft_main').contentWindow.document.getElementById('activity-stream-comments-textarea').value = message.message
	}
	if (message.type === 'close') {
		document.getElementById('gsft_main').contentWindow.document.getElementById('incident.close_notes').value = message.message
	}

}
