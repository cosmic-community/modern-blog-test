(function() {
  // Only activate if we're in an iframe (dashboard preview)
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, (key, value) => {
            if (typeof value === 'function') return '[Function]';
            if (value instanceof Error) return value.toString();
            return value;
          }, 2);
        } catch (e) {
          return '[Object]';
        }
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silently fail if postMessage doesn't work
    }
  }
  
  // Override console methods
  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    captureLog('log', args);
  };
  
  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    captureLog('warn', args);
  };
  
  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    captureLog('error', args);
  };
  
  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    captureLog('info', args);
  };
  
  console.debug = function(...args) {
    originalConsole.debug.apply(console, args);
    captureLog('debug', args);
  };
  
  // Capture unhandled errors
  window.addEventListener('error', function(event) {
    captureLog('error', [`Unhandled Error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    captureLog('error', [`Unhandled Promise Rejection: ${event.reason}`]);
  });
  
  // Send ready message to parent
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silently fail if postMessage doesn't work
    }
  }
  
  // Send route change message to parent
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silently fail if postMessage doesn't work
    }
  }
  
  // Send ready message when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sendReady);
  } else {
    sendReady();
  }
  
  // Monitor for route changes (for SPA navigation)
  let currentPath = window.location.pathname;
  
  // Override history methods to detect navigation
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(history, args);
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      sendRouteChange();
    }
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(history, args);
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      sendRouteChange();
    }
  };
  
  // Listen for popstate events (back/forward buttons)
  window.addEventListener('popstate', function() {
    if (window.location.pathname !== currentPath) {
      currentPath = window.location.pathname;
      sendRouteChange();
    }
  });
  
  // Listen for hashchange events
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send initial route data
  sendRouteChange();
})();