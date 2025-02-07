function clearDOM(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.lastChild);
  }
}

function hide(element) {
  element.classList.add("hide");
}

function show(element) {
  element.classList.remove("hide");
}

export { clearDOM, hide, show };
