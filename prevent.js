
  document.addEventListener('keydown', function(e) {
    // Prevent Ctrl+U (view source), Ctrl+Shift+I (inspect element), Ctrl+Shift+J (console)
    if (e.key === 'F12' || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
      e.preventDefault();
    }
  });
// Disable right-click on the entire document
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });