function appendSymbol(symbol) {
	document.getElementById('expression-panel').value = document.getElementById('expression-panel').value + symbol;
}

function evaluateExpression() {
	try {
		result = eval(normalizeExpression(document.getElementById('expression-panel').value))
		document.getElementById('expression-panel').value = result
	}
	catch(err) {
	    document.getElementById('expression-panel').value = "Malformed Expression"
	}	
}

function normalizeExpression(expression) {
	// Replacing multiplication and division symbols
	expression = expression.replace(/\u00F7/g,'/')
	expression = expression.replace(/\u00D7/g,'*')

	// Replacing exponentiation symbols
	expression = expression.replace(/[0-9](\^[0-9])+/g, function myFunction(exponentialExpression){
		exponents = exponentialExpression.split("^")
		currentValue = Math.pow(exponents[exponents.length-2], exponents[exponents.length-1])
		for (i = exponents.length - 3; i >= 0; i--) {
			currentValue = Math.pow(exponents[i], currentValue)
		}
		return currentValue.toString()
	});

	return expression
}

