/*
This is an alogrithm that detects valid credit cards, without using regex
*/

  const creditCards = {
    'Diner\'s Club': {
      'length': [14],
      'prefix': ['38', '39']
    },
    'American Express': {
      'length': [15],
      'prefix': ['34', '37']
    },
    'Visa': {
      'length': [13, 16, 19],
      'prefix': ['4']
    },
    'MasterCard': {
      'length': [16],
      'prefix': ['51', '52', '53', '54', '55']
    },
    'Discover': {
      'length': [16, 19],
      'prefix': ['6011', '644', '645', '646', '647', '648', '649', '65']
    },
    'Maestro': {
      'length': [12, 13, 14, 15, 16, 17, 18, 19],
      'prefix': ['5018', '5020', '5038', '6304']
    },
    'China UnionPay': {
      'length': [16, 17, 18, 19],
      //due to the large number of prefixes China UnionPay has,
      //values will be added via the chinaAdd an IIFE following this dictionary
      'prefix': []
    },
    'Switch': {
      'length': [16, 18, 19],
      'prefix': ['4903', '4905', '4911', '4936', '564182', '633110', '6333', '6759']
    }
  };

  (function(){
    let addPrefix = prefix => creditCards['China UnionPay']['prefix'].push(prefix.toString());
    for (let i = 622126; i <= 622925; i++) {
      addPrefix(i);
    }
    for (let i = 624; i <= 626; i++) {
      addPrefix(i);
    }
    for (let i = 6282; i <= 6288; i++) {
      addPrefix(i);
    }
  })();

  //Array of credit card network names
  const networkNames = Object.keys(creditCards);

  const detectNetwork = function(cardNumber) {
    //Variable to assign a matching prefix if one is found
    let prefixMatch = false;
    let matchedNetworks = [];
    //IIFE to look for a matching prefix
    (function () {
      //Iterate through every network in the dictionary
      for (let i = 0; i <= networkNames.length - 1; i++) {
        //Iterate though every prefix in the current credit card network
        for (let j = 0; j <= creditCards[networkNames[i]]['prefix'].length - 1; j++) {
          let prefix = creditCards[networkNames[i]]['prefix'][j];
          if ((prefix === cardNumber.split('').splice(0, prefix.length).join(''))) {
            prefixMatch = true;
            //Checks to see if that network has already been added
            if (matchedNetworks.indexOf(prefix) === -1){
              matchedNetworks.push(networkNames[i]);
            }
          }
        }
      }
    })();
    matchedNetworks.sort((a,b) => b.length - a.length);
    //After the longest matching prefix is found, compare the length
    //of the card against valid lengths for the network
    if (prefixMatch) {
      for (let i = 0; i <= matchedNetworks.length - 1; i++) {
        for (let j = 0; j <= creditCards[matchedNetworks[i]]['length'].length - 1; j++) {
          if (creditCards[matchedNetworks[i]]['length'][j] === cardNumber.length) {
            return matchedNetworks[i];
          }
        }
      }
    }
    //If no valid card was found, chastise the user for their mistake.
    return 'Error: Invalid credit card. Please try again.';
  };

