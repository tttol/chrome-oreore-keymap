// Background service worker for handling tab navigation and history

console.log('[Chrome Oreore Keymap] Background script loaded');

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[Chrome Oreore Keymap] Message received:', message.action);

  const tabId = sender.tab?.id;

  if (!tabId) {
    console.warn('[Chrome Oreore Keymap] No tab ID found');
    return;
  }

  switch (message.action) {
    case 'previousTab':
      handlePreviousTab(tabId);
      break;

    case 'nextTab':
      handleNextTab(tabId);
      break;

    case 'goBack':
      handleGoBack(tabId);
      break;

    case 'goForward':
      handleGoForward(tabId);
      break;

    default:
      console.warn('[Chrome Oreore Keymap] Unknown action:', message.action);
  }
});

// Navigate to previous tab
const handlePreviousTab = (currentTabId) => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === currentTabId);

    if (currentIndex === -1) {
      return;
    }

    const previousIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    const previousTab = tabs[previousIndex];

    chrome.tabs.update(previousTab.id, { active: true });
  });
};

// Navigate to next tab
const handleNextTab = (currentTabId) => {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === currentTabId);

    if (currentIndex === -1) {
      return;
    }

    const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;
    const nextTab = tabs[nextIndex];

    chrome.tabs.update(nextTab.id, { active: true });
  });
};

// Navigate back in history
const handleGoBack = (tabId) => {
  chrome.tabs.goBack(tabId);
};

// Navigate forward in history
const handleGoForward = (tabId) => {
  chrome.tabs.goForward(tabId);
};
