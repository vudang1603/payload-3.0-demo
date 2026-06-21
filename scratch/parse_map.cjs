const fs = require('fs');

const contentPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\41470be6-0392-44d0-b73d-a3f211fd8a8c\\.system_generated\\steps\\3845\\content.md';
const mapPath = 'c:\\Users\\Admin\\.gemini\\antigravity-ide\\scratch\\payload-demo\\src\\components\\InteractiveIndiaMap.tsx';

try {
  const content = fs.readFileSync(contentPath, 'utf8');
  let mapText = fs.readFileSync(mapPath, 'utf8');

  // Extract SVG paths from content.md
  const pathRegex = /<path\s+[^>]*id="([^"]+)"[^>]*d="([^"]+)"[^>]*>/g;
  let match;
  const pathMap = {};
  
  while ((match = pathRegex.exec(content)) !== null) {
    pathMap[match[1]] = match[2];
  }

  console.log(`Parsed ${Object.keys(pathMap).length} paths from content.md.`);

  let count = 0;
  for (const [id, d] of Object.entries(pathMap)) {
    // Look for path block containing id="id" and d="id"
    // Clean regex match to handle newlines and spaces
    const blockRegex = new RegExp(`(<path\\s+[^>]*id="${id}"[^>]*d=")${id}("[^>]*>)`, 'i');
    if (blockRegex.test(mapText)) {
      mapText = mapText.replace(blockRegex, `$1${d}$2`);
      count++;
    } else {
      const simpleRegex = new RegExp(`(id="${id}"[^>]*d=")${id}"`, 'i');
      if (simpleRegex.test(mapText)) {
        mapText = mapText.replace(simpleRegex, `$1${d}"`);
        count++;
      } else {
        console.warn(`Could not find path block for id: ${id}`);
      }
    }
  }

  fs.writeFileSync(mapPath, mapText, 'utf8');
  console.log(`Successfully updated ${count} paths in InteractiveIndiaMap.tsx.`);
} catch (err) {
  console.error('Error parsing or writing map:', err);
}
