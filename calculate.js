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
	var cArray = (string.match(/([0-9]+)|\+|-|\*|\//gmi));
	let i = -1;

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

if(!process.argv[2])
	console.log('You need to pass the string as a parameter like: node calculate.js "10*3+4/4"');
else
	console.log("Resultado: " + calculate(process.argv[2]));