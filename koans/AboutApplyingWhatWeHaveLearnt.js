var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      //takes in ingredient array
      var hasShrooms = function(ingred){ return ingred === "mushrooms" };

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(function(prod){
        return (!prod.containsNuts  && !( _(prod.ingredients).any(hasShrooms) ) );
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.chain(_.range(1000).filter( function(x){return (x % 5 === 0 || x % 3 === 0);} ))
                .reduce(function(sum, x) { return sum + x })
                .value();  /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    var ingArrays = [];

    /* chain() together map(), flatten() and reduce() */
    //map to pull all ingredient arrays
    //flatten to reduce the resulting array of arrays to one
    //reduce to sum all the ingredient counts into ingredientCount
    
    
    _(products).chain()
      .map(function(prod) { return prod.ingredients })
      .flatten() 
      .reduce(function(sum, ingredient) { return ingredientCount[ingredient] = ( ingredientCount[ingredient] || 0 ) + 1 })
      .value();

      expect(ingredientCount['mushrooms']).toBe(2);

  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    //get array of all factors (ignore self and 1, since if none of the other factors are prime, it is itself prime)
    //go through array and determine which (if any) factors are prime, replacing pointer to highest as necessary

    //to find prime: iterate across numbers < factor starting at 2. If factor % i === 0, not prime
    var x = 71;
    var factors = [x];
    var largestPrime = 1;
    var increment;
    var start;
    var findLargerPrime = function(n){
      //takes a number, determines if it is prime, and replaces largestPrime if it is prime and larger
      var isPrime = true;
      for(var i = 2; i < n; i++){
        if(n % i === 0){isPrime = false;}
      }

      if(isPrime && n > largestPrime) {largestPrime = n;}

    }

    //to get factors, if odd we do every other number. If even we do every number. Only need to go up to half.
    var half = Math.floor(x / 2);
    x % 2 === 0 ? (start = 2, increment = 1) : (start = 3, increment = 2);

    for(start; start <= half; start += increment){
      //do not worry about efficiency, just do every number up to half
      if( x % start === 0){ factors.push(start); }
    }

    if(factors.length === 1){
      largestPrime = x;
    } else {
      for( var i = 0; i < factors.length; i++ ){

      }
    }

    _(factors).forEach(findLargerPrime);

    expect(largestPrime).toBe(71);

  });

  /*it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    //smallest number is 10,000 (100 * 100) and largest is 998,001 (999 * 999)
    //to find palindromes: 
          Step 1:

          Start with any number. Call it original number. Reverse the digits of the original number

          Step 2:

          Call the number whose digits are reversed new number. Add the new number to your original number.

          Call the number found by adding the new number to the original number test number

          Step 3:

          If test number is a palindrome, you are done. If not, use your test number as your original number and repeat the steps above
  });*/

  /*it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      //find least common multiple of 1-20
      //break 1-20 into arrays of prime factors, count the greatest number of times each factor appears, multiply all those together
    
  });*/

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var a = 20;
    var b = 10;

    var diff = Math.abs((Math.pow(a,2)+ Math.pow(b,2)) - Math.pow(a*b,2));

    expect(diff).toBe(39500);

  });
/*
  it("should find the 10001st prime", function () {
    //The 10,001st prime is 104,743.
    //could do with a very long while loop, measuring the length of an array...
    //sieve of eratosthenes

  });*/
  
});
