export function generateTableOfContents(content: string): Array<{level: number, text: string, id: string}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: Array<{level: number, text: string, id: string}> = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    
    toc.push({ level, text, id });
  }
  
  return toc;
}