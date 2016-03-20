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

      return deepFreeze({
      });

    })(element);
  }

  if (nodeList) {
    return (function wrap(nodeList) {

      return deepFreeze({
      });

    })(nodeList);
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
