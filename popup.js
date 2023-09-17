document.getElementById("addCard").addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    chrome.scripting.executeScript(
      {
        target: { tabId: currentTab.id },
        func: getSelectedText,
      },
      (injectionResults) => {
        for (const frameResult of injectionResults) {
          const selectedText = frameResult.result;
          if (selectedText) {
            const encodedText = encodeURIComponent(selectedText);
            const url = `http://localhost:3000/add-card/?text=${encodedText}`;
            window.open(url, "", "width=400, height=400");
            break; // We found text in one frame, no need to check further frames
          }
        }
      }
    );
  });
});

function getSelectedText() {
  return window.getSelection().toString().trim();
}
