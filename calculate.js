function reorganizeArray(array){

	var reorganized = [];
	var k = -1;
	while(++k < array.length){
		if(array[k] !== false) reorganized.push(array[k]);
	}
	return reorganized;

}

function doTheMath(op, array){

	t1 = op-1;
	t2 = op+1;

	switch(array[op]){

		case '*':
			array[t1] = parseFloat(array[t1]) * parseFloat(array[t2]);
			break;

		case '/':
			array[t1] = parseFloat(array[t1]) / parseFloat(array[t2]);
			break;
		case '+':
			array[t1] = parseFloat(array[t1]) + parseFloat(array[t2]);
			break;
		case '-':
			array[t1] = parseFloat(array[t1]) - parseFloat(array[t2]);
			break;
	}

	array[op] = false;
	array[t2] = false;

	return reorganizeArray(array);

}

function calculate(string){

	// break the string into numbers and operators
	var cArray = (string.match(/([0-9]+)|\+|-|\*|\//g));
	let i = -1;

	if(!cArray || cArray.length == 1) return string;
	
	// multiplications
	while(i++ < cArray.length - 1){

		if(cArray[i] == '*'){
			cArray = doTheMath(i, cArray);
			i = i-1;
		}

	}

	// divisions
	i = -1;
	while(i++ < cArray.length - 1){

		if(cArray[i] == '/'){
			cArray = doTheMath(i, cArray);
			i--;
		}

	}

	// sum/substract
	i = -1;
	while(i++ < cArray.length - 1){

		if(cArray[i] == '+'){
			cArray = doTheMath(i, cArray);
			i--;
		}

		if(cArray[i] == '-'){
			cArray = doTheMath(i, cArray);
			i--;
		}

	}

	return cArray[0];

}

function calculateFull(str){

	// clean the string from spaces
	str = str.replace(/ /g,'');

	// declare the final result variable
	var result = str;

	// brake the strings there are between parentheses
	var subCalculations = str.match(/\(([^()]+)\)/gmi); 
	var subCalc;

	if(!subCalculations)
		return calculate(str);

	for(let k = 0; k < subCalculations.length; k++){
		subCalc = subCalculations[k].replace(/\(|\)/g, '');
		console.log('Replacing (' + subCalc + ') by ' + calculate(subCalc));
		result = result.replace('('+subCalc+')', calculate(subCalc));
	}

	// verify if the string still have parentheses and recursively resolves them
	if(result.indexOf('(') >= 0)
		return calculateFull(result);

	console.log("String after subcalculations are done: " + result);
	return calculate(result);
	
}

if(!process.argv[2])
	console.log('You need to pass the string as a parameter like: node calculate.js "10*3+4/4"');
else{
	console.log();
	console.log("Calculating " + process.argv[2]);
	console.log("Result: " + calculateFull(process.argv[2]));
	console.log();
}
