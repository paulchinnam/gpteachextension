console.log("Content script loaded!");

function getSelectedText() {
  const selectedText = window.getSelection().toString().trim();
  return selectedText;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getSelectedText") {
    sendResponse(getSelectedText());
  }
});
