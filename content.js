// Content script for handling page scrolling operations

(() => {
  console.log('[Chrome Oreore Keymap] Content script loaded');

  const KEY_BUFFER_TIMEOUT = 500; // milliseconds
  const keyBuffer = { keys: '', timeout: null };

  // Reset key buffer after timeout
  const resetKeyBuffer = () => {
    keyBuffer.keys = '';
    if (keyBuffer.timeout) {
      clearTimeout(keyBuffer.timeout);
      keyBuffer.timeout = null;
    }
  };

  // Scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to bottom of page
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    // Ignore if user is typing in input fields
    const activeElement = document.activeElement;
    const isInputField = activeElement &&
      (activeElement.tagName === 'INPUT' ||
       activeElement.tagName === 'TEXTAREA' ||
       activeElement.isContentEditable);

    if (isInputField) {
      return;
    }

    const key = event.key;
    console.log('[Chrome Oreore Keymap] Key pressed:', key, 'Ctrl:', event.ctrlKey, 'Meta:', event.metaKey);

    // Handle Ctrl+[ (browser back)
    if (event.ctrlKey && key === '[' && !event.metaKey && !event.altKey && !event.shiftKey) {
      console.log('[Chrome Oreore Keymap] Action: Browser back');
      event.preventDefault();
      chrome.runtime.sendMessage({ action: 'goBack' });
      return;
    }

    // Handle Ctrl+] (browser forward)
    if (event.ctrlKey && key === ']' && !event.metaKey && !event.altKey && !event.shiftKey) {
      console.log('[Chrome Oreore Keymap] Action: Browser forward');
      event.preventDefault();
      chrome.runtime.sendMessage({ action: 'goForward' });
      return;
    }

    // Ignore if modifier keys are pressed (Cmd, Alt, Shift)
    if (event.metaKey || event.altKey || event.shiftKey) {
      return;
    }

    // Handle tab navigation (h, l)
    if (key === 'h') {
      console.log('[Chrome Oreore Keymap] Action: Previous tab');
      event.preventDefault();
      chrome.runtime.sendMessage({ action: 'previousTab' });
      return;
    }

    if (key === 'l') {
      console.log('[Chrome Oreore Keymap] Action: Next tab');
      event.preventDefault();
      chrome.runtime.sendMessage({ action: 'nextTab' });
      return;
    }

    // Handle single key commands (G for bottom)
    if (key === 'G') {
      console.log('[Chrome Oreore Keymap] Action: Scroll to bottom');
      event.preventDefault();
      scrollToBottom();
      resetKeyBuffer();
      return;
    }

    // Handle key sequences (gg for top)
    if (key === 'g') {
      keyBuffer.keys += key;

      // Clear existing timeout
      if (keyBuffer.timeout) {
        clearTimeout(keyBuffer.timeout);
      }

      // Check for 'gg' sequence
      if (keyBuffer.keys === 'gg') {
        console.log('[Chrome Oreore Keymap] Action: Scroll to top');
        event.preventDefault();
        scrollToTop();
        resetKeyBuffer();
        return;
      }

      // Set timeout to reset buffer
      keyBuffer.timeout = setTimeout(resetKeyBuffer, KEY_BUFFER_TIMEOUT);
      return;
    }

    // Reset buffer for any other key
    resetKeyBuffer();
  };

  // Add event listener
  document.addEventListener('keydown', handleKeyDown);
})();
