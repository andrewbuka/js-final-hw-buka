function createElement(tag, classList, attributes, textContent, children, insertType) {
  const element = document.createElement(tag);

  if (classList?.length) {
    element.classList.add(...classList);
  }

  if (attributes?.length) {
    attributes.forEach(({ prop, value }) => {
      element.setAttribute(prop, value);
    });
  }

  if (textContent) {
    element.textContent = textContent;
  }

  if (children) {
    element[insertType](...children);
  }

  return element;
}
