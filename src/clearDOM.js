function clearDOM(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

export {clearDOM};