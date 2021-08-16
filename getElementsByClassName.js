const getElementsByClassName = function(className
  ) {
    let result = [];
    let allElements = document.body;

    const iterateThroughNodes = (element, func) => {
      func(element);
      element = element.firstChild;
      while (element !== null) {
        iterateThroughNodes(element, func);
        element = element.nextSibling;
      }
    }

    iterateThroughNodes(allElements, function(element) {
      if ((element.classList !== undefined) && element.classList.contains(className)) {
        result.push(element)
      }
    });

    return result;
  };
