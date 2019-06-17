// for full tab
// chrome.devtools.panels.create('Theme UI',
//   'icon.png',
//   'panel.html'
// );

// for sidebar in elements tab
chrome.devtools.panels.elements.createSidebarPane('Theme UI',
  function(sidebar) {
    sidebar.setPage('panel.html');
    // sidebar.setObject({ beep: 'boop' });
    // window.themeUISidebar = sidebar;
  }
);
