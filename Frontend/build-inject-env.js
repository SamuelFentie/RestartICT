const fs = require('fs');
const path = require('path');

// Read the backend URL from environment variable
const backendUrl = process.env.BACKEND_URL || '';

console.log('🔧 Injecting backend URL into frontend build...');
console.log('📡 Backend URL:', backendUrl || 'Not set (will use relative path)');

// Read the original index.html
const indexPath = path.join(__dirname, 'src', 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

if (backendUrl) {
  // Add meta tag with backend URL
  const metaTag = `<meta name="backend-url" content="${backendUrl}">`;
  
  // Insert the meta tag in the head section
  indexContent = indexContent.replace(
    '<head>',
    `<head>\n  ${metaTag}`
  );
  
  // Also add a script tag to set window.__BACKEND_URL__
  const scriptTag = `<script>window.__BACKEND_URL__ = '${backendUrl}';</script>`;
  indexContent = indexContent.replace(
    '</head>',
    `  ${scriptTag}\n</head>`
  );
  
  console.log('✅ Backend URL injected into index.html');
} else {
  console.log('⚠️  No BACKEND_URL set, using relative path fallback');
}

// Write the modified index.html
fs.writeFileSync(indexPath, indexContent);
