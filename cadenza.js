var c = function cadenza(argument) {

  if (typeof argument === 'string') {
    var nodeCount = document.querySelectorAll(argument).length;

    if (nodeCount === 1) {
      var element = document.querySelector(argument);
    } else if (nodeCount > 1) {
      var nodeList = document.querySelectorAll(argument);
    }
  } else if (argument instanceof Element) {
    var element = argument;
  } else if (argument instanceof NodeList) {
    var nodeList = argument;
  }

  if (element) {
    return (function wrap(element) {

      function appendChild(tagName) {
        var newChild = createElement(tagName);
        element.appendChild(newChild);

        return wrap(newChild);
      }

      function appendSibling(tagName) {
        var newSibling = createElement(tagName);
        element.parentNode.insertBefore(newSibling, element.nextSibling);

        return wrap(newSibling);
      }

      function insertAfter(tagName, reference) {
        if (typeof reference === 'string') {
          reference = document.querySelector(reference);
        }

        var newChild = createElement(tagName);
        element.insertBefore(newChild, reference.nextSibling);

        return wrap(newChild);
      }

      function insertBefore(tagName, reference) {
        if (typeof reference === 'string') {
          reference = document.querySelector(reference);
        }

        var newChild = createElement(tagName);
        element.insertBefore(newChild, reference);

        return wrap(newChild);
      }

      function prependChild(tagName) {
        var newChild = createElement(tagName);
        element.insertBefore(newChild, element.firstChild);

        return wrap(newChild);
      }

      function prependSibling(tagName) {
        var newSibling = createElement(tagName);
        element.parentNode.insertBefore(newSibling, element);

        return wrap(newSibling);
      }

      return deepFreeze({
        appendChild: appendChild,
        appendSibling: appendSibling,
        insertAfter: insertAfter,
        insertBefore: insertBefore,
        prependChild: prependChild,
        prependSibling: prependSibling
      });

    })(element);
  }

  if (nodeList) {
    return (function wrap(nodeList) {

      return deepFreeze({
      });

    })(nodeList);
  }

  function createElement(tagName) {
    if (tagName === 'svg' || element instanceof SVGElement) {
      var svgNS = 'http://www.w3.org/2000/svg';
      return document.createElementNS(svgNS, tagName);
    } else if (element instanceof HTMLElement && tagName !== 'svg') {
      return document.createElement(tagName);
    }
  }

  function deepFreeze(object) {
    for (var property in object) {
      if (object.hasOwnProperty(property)) {
        if (object[property] instanceof Object) {
          deepFreeze(object[property]);
        }
      }
    }

    return Object.freeze(object);
  }

};
