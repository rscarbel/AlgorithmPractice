#Remember to read the description first

def count_primes(num):

    #This is the variable that will be returned, assuming the value passed into the function is >= 2
    primecount = 1

    if num >= 2:
        #This for-loop checks for factors for all odd numbers up to & including the number passed in.
        #I did not check for even numbers, because there are no even numbers other than 2 that are prime
        for val in range(3,int(num)+1,2):
            #When checking the factors of a number, I set the upper limit to the square root of the number being checked (decimals truncated)
            #This is because the factors beyond the square root are the same, just in a different order.
            test_limit = int(val**0.5)
            is_composite = False
            #This for-loop is checking to see if any of the values are factors of the number
            for factor_test in range (3,test_limit+1,2):
                if val % factor_test == 0:
                    is_composite = True
                    #This break line doesn't actually need to be here, but I put it in to make it clear that if the number is composite, the for-loop moves on to the next value.
                    break
            if is_composite == False:
                primecount += 1
    #This else clause will execute if a number is passed in that is less than 2, since 2 is the lowest prime number
    else:
        return 0

    return primecount
