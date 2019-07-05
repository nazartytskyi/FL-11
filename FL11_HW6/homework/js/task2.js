const triangle = {
	sideA: parseFloat( prompt('Enter side a:') ),
	sideB: parseFloat( prompt('Enter side b:') ),
	sideC: parseFloat( prompt('Enter side c:') )
}

const existence = triangle.sideA < triangle.sideB + triangle.sideC &&
				triangle.sideB < triangle.sideA + triangle.sideC &&
				triangle.sideC < triangle.sideA + triangle.sideB;

if (existence) {
	if (triangle.sideA === triangle.sideB && triangle.sideA === triangle.sideC) {
		console.log('Eequivalent triangle')
	} else if ( triangle.sideA === triangle.sideB ||
				triangle.sideA === triangle.sideC || 
				triangle.sideB === triangle.sideC ) {
		console.log('Isosceles triangle');	
	} else {
		console.log('Normal triangle');
	}
} else {
	console.log('Triangle doesn’t exist');
}

