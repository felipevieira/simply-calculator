function appendSymbol(symbol) {
	if (document.getElementById('expression-panel').style.fontWeight.localeCompare('bold') == 0) {
		document.getElementById('expression-panel').style.fontWeight = 'normal'
		clearDisplay()
	}
	document.getElementById('expression-panel').value = document.getElementById('expression-panel').value + symbol;
}

function evaluateExpression() {
	try {
		// Trying to evaluate de expression result
		result = eval(normalizeExpression(document.getElementById('expression-panel').value))		
		document.getElementById('expression-panel').value = result
	}
	catch(err) {
	    document.getElementById('expression-panel').value = 'Malformed Expression'
	}

	document.getElementById('expression-panel').style.fontWeight = 'bold';
}

function normalizeExpression(expression) {
	// Replacing multiplication and division symbols
	expression = expression.replace(/\u00F7/g,'/')
	expression = expression.replace(/\u00D7/g,'*')
	expression = expression.replace(/,/g,'.')

	// Replacing exponentiation symbols
	expression = expression.replace(/\-?[0-9]+(\^\-?[0-9]+)+/g, function myFunction(exponentialExpression){
		exponents = exponentialExpression.split("^")
		currentValue = Math.pow(exponents[exponents.length-2], exponents[exponents.length-1])
		for (i = exponents.length - 3; i >= 0; i--) {
			currentValue = Math.pow(exponents[i], currentValue)
		}
		return currentValue.toString()
	});

	return expression
}

function clearDisplay() {
	document.getElementById('expression-panel').value = ''
}

function keyboardEvent(e) {	
    keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      evaluateExpression()
    }
    else {
    	appendSymbol('')
    }
}

