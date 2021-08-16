def nth_fib_number (num):

    #creating the start of the sequence. This list will always be limited to 2 elements.
	fibs = [0, 1]
	fibNumber = 1

    #this is the starting place for the series. The first fibonacci number is 0
    if num == 1:
		return 0

	elif num > 2:
        #this for-loop calculates fibonacci numbers using the list created in the beginning.
        #The loop updates the list, replacing the values with the next numbers in the sequence
        #until it has calculated up to the number passed in as an argument
		for count in range (1, num-1):
			fibNumber = fibs[0] + fibs [1]
			fibs [0] = fibs.pop()
			fibs.append(fibNumber)

	return fibNumber
