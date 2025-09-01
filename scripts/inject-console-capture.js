const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Script to inject console capture script into HTML files after build
function injectConsoleCapture() {
  // Read the console capture script
  const scriptPath = path.join(__dirname, '..', 'public', 'dashboard-console-capture.js');
  
  if (!fs.existsSync(scriptPath)) {
    console.log('Console capture script not found, skipping injection');
    return;
  }
  
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  const scriptTag = `<script>${scriptContent}</script>`;
  
  // Find all HTML files in the build output
  const buildDir = path.join(__dirname, '..', 'out'); // or '.next' for non-static builds
  
  if (!fs.existsSync(buildDir)) {
    console.log('Build directory not found, skipping injection');
    return;
  }
  
  const htmlFiles = glob.sync('**/*.html', { cwd: buildDir });
  
  console.log(`Found ${htmlFiles.length} HTML files to process`);
  
  htmlFiles.forEach(file => {
    const filePath = path.join(buildDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Only inject if not already present
    if (!content.includes('console-capture-ready')) {
      // Try to inject after <head> tag, fallback to before </head>
      if (content.includes('<head>')) {
        content = content.replace('<head>', `<head>${scriptTag}`);
      } else if (content.includes('</head>')) {
        content = content.replace('</head>', `${scriptTag}</head>`);
      } else {
        // Fallback: add to beginning of body
        content = content.replace('<body>', `<body>${scriptTag}`);
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`Injected console capture script into ${file}`);
    }
  });
  
  console.log('Console capture script injection completed');
}

// Run if called directly
if (require.main === module) {
  injectConsoleCapture();
}

module.exports = injectConsoleCapture;