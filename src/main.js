const sugar = Sugar.Date;
const switchToggle = document.querySelector('.switch input');
let delaysEvent = false;

switchToggle.addEventListener('click', onSwitchToggleClick);

if (chrome.storage) {
  console.log('HAS');
}

if (chrome.storage)
  chrome.storage.local
    .get(['delaysEvent'])
    .then((result) => (delaysEvent = result.key));

function onSwitchToggleClick(e) {
  delaysEvent = switchToggle.checked;

  if (chrome.storage);
  chrome.storage.local.set({ delaysEvent: switchToggle.checked });
}

function loadDelaySetting() {}
