(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument.
  _.identity = function(val) {
    return val;
  };

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (n <= 0) {
      return [];
    }
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n <= 0) {
      return [];
    } else if (n > array.length) {
      return array;
    }
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i <= collection.length - 1; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    var result = -1;
    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });
    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var passingElements = [];
    _.each(collection, function(element) {
      if (test(element)) {
        passingElements.push(element);
      }
    });
    return passingElements;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    var failingElements = [];
    _.each(collection, function(element) {
      if (!test(element)) {
        failingElements.push(element);
      }
    });
    return failingElements;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var set = [];
    var modifiedSet = [];
    _.each (array, function (element) {
      if (iterator === undefined) {
        if (_.indexOf(set, element) === -1) {
          set.push(element);
        }
      } else {
        if (_.indexOf(modifiedSet, iterator(element)) === -1) {
          modifiedSet.push(iterator(element));
          set.push (element);
        }
      }
    });
    return set;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var result = [];
    _.each(collection, function(element) {
      result.push (iterator(element));
    });
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, accumulator) {
    var total = accumulator === undefined ? collection[0] : accumulator;
    if (Array.isArray(collection)) {
      for (var i = accumulator === undefined ? 1 : 0; i <= collection.length - 1; i++ ) {
        total = iterator(total, collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        total = iterator(total, collection[key], key, collection);
      }
    }

    return total;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(collection, function (wasTrue, item) {
      if (wasTrue) {
        return iterator ? !!iterator(item) : item;
      }
      return false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    return !_.every(collection, function (item) {
      if (iterator) {
        return !iterator(item);
      }
      return !item;
    });
  };

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for (var appendedObject = 1; appendedObject <= arguments.length - 1; appendedObject++) {
      for (var key in arguments[appendedObject]) {
        obj[key] = arguments[appendedObject][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for (var appendedObject = 1; appendedObject <= arguments.length - 1; appendedObject++) {
      for (var key in arguments[appendedObject]) {
        if (obj[key] === undefined) {
          obj[key] = arguments[appendedObject][key];
        }
      }
    }
    return obj;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var alreadyCalled = false;
    var result;
    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var alreadyCalled = {};
    return function() {
      var argumentKey = '';
      for (var i = 0; i < arguments.length; i++) {
        argumentKey = argumentKey + arguments[i] + '_';
      }
      if (!alreadyCalled[argumentKey]) {
        alreadyCalled[argumentKey] = func.apply(this, arguments);
      }
      return alreadyCalled[argumentKey];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var passedArguments = [];
    for (var i = 2; i < arguments.length; i++) {
      passedArguments.push(arguments[i]);
    }
    setTimeout (function() { func.apply(null, passedArguments); }, wait);
  };

  // Randomizes the order of an array's contents.

  _.shuffle = function(array) {
    var result = [];
    var original = array.slice(0);
    while (original.length > 0) {
      var index = Math.floor(Math.random() * original.length);
      result.push(original.splice(index, 1)[0]);
    }
    return result;
  };
}());
