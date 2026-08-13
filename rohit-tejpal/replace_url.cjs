const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace 'http://localhost:5000
      let newContent = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${import.meta.env.VITE_API_URL}$1`');
      
      // Replace `http://localhost:5000
      newContent = newContent.replace(/`http:\/\/localhost:5000([^`]*)`/g, '`${import.meta.env.VITE_API_URL}$1`');
      
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

walk(srcDir);
