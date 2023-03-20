/**
 * This extension is powered by Sherlock.js
 * Check it out at https://github.com/GitSquared/sherlock-js
 *
 * This extension is powered by Sugar
 * Check it out at https://sugarjs.com/
 *
 * TODO:
 * -add URL for logo button
 * -after typing and idle: "Press Enter to continue"
 */

const sugar = Sugar.Date;
const switchToggle = document.querySelector('.switch input');
const exitBtn = document.querySelector('#exit-btn');
const logoBtn = document.querySelector('#logo-btn');
const input = document.querySelector('input');
const eventBuilder = new EventBuilder();
let delaysEvent = false;

input.focus();

switchToggle.addEventListener('click', onSwitchToggleClick);
exitBtn.addEventListener('click', (e) => window.close());
// logoBtn.addEventListener('click', (e) => window.open('will get the url once the addon is published'));
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
  // Enter
  if (e.keyCode === 13) {
    const url = eventBuilder.getEventURL(input.value, delaysEvent);

    if (url.startsWith('https://')) window.open(url);
  }
  // Esc
  else if (e.keyCode === 27) {
    window.close();
  }
}
