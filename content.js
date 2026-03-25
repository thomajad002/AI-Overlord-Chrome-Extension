function replaceAIOverview() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue && node.nodeValue.includes('AI Overview')) {
      textNodes.push(node);
    }
  }

  for (const node of textNodes) {
    const parent = node.parentNode;
    if (!parent) continue;

    const parts = node.nodeValue.split('AI Overview');
    const fragment = document.createDocumentFragment();

    parts.forEach((part, index) => {
      if (part) fragment.appendChild(document.createTextNode(part));

      if (index < parts.length - 1) {
        const span = document.createElement('span');
        span.textContent = 'AI Overlord';
        span.style.color = 'red';
        span.style.fontWeight = '700';
        fragment.appendChild(span);
      }
    });

    parent.replaceChild(fragment, node);
  }
}

replaceAIOverview();

const observer = new MutationObserver(() => {
  replaceAIOverview();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
