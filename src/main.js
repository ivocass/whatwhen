/**
 * This extension is powered by Sherlock.js
 * Check it out at https://github.com/GitSquared/sherlock-js
 *
 * This extension is powered by Sugar
 * Check it out at https://sugarjs.com/
 *
 */

const sugar = Sugar.Date;
const switchToggle = document.querySelector('.switch input');
const exitBtn = document.querySelector('#exit-btn');
const input = document.querySelector('input');
let delaysEvent = false;

switchToggle.addEventListener('click', onSwitchToggleClick);
exitBtn.addEventListener('click', (e) => window.close());
input.addEventListener('keydown', inputKeyDownListener);

// load user config
if (chrome.storage)
  chrome.storage.local.get(['delaysEvent']).then((result) => {
    delaysEvent = result.delaysEvent;
    switchToggle.checked = result.delaysEvent;
  });

function onSwitchToggleClick(e) {
  delaysEvent = switchToggle.checked;

  if (chrome.storage)
    chrome.storage.local.set({ delaysEvent: switchToggle.checked });
}

function inputKeyDownListener(e) {
  if (e.keyCode === 13) {
    processInput();
  }
}

function processInput() {}
