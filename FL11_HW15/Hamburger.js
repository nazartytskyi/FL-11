class Hamburger {
	constructor(type, calories, isSecretIngredientIncluded = false) {
		this.type = type;
		this._calories = calories + (isSecretIngredientIncluded ? 100 : 0);
		this._cheese = 0;
		this._tomatoo = 0;
		this._secretIngredient = isSecretIngredientIncluded ? 1 : 0;
		this._biteCount = 0;
	}

	getCalories() {
		return this._calories;
	}

	setCalories(calories) {
		this._calories = calories;
	}

	addCheese() {
		if (this._biteCount) {
			console.log('Sorry, you cannot add cheese');
			return;
		}

		if (this._cheese < 1) {
			this._cheese++;
			this._calories += 120;
		} else {
			console.log('Sorry, you can add cheese only once.');
		}
	}

	addTomatoo() {
		if (this._biteCount) {
			console.log('Sorry, you cannot add tomatoo');
			return;
		}

		if (this._tomatoo < 2) {
			this._tomatoo++;
			this.calories +=20
		} else {
			console.log('Sorry, you can add tomatoo only twice.')
		}
	}

	addSecretIngredient() {
		if (this._biteCount) {
			console.log('Sorry, you cannot add secret ingredient');
			return;
		}

		if (this._tomatoo || this._cheese) {
			console.log('Sorry, you can add secret ingredient only before another ingredient');
			return;
		} else if (this._secretIngredient) {
			console.log('Sorry, you can add secret ingredient only once.');
		} else {
			this._secretIngredient++;
			this._calories += 100;
		}
	}

	bite() {
		this._biteCount++;
	}

	info() {
		let infoMessage = `${this.type} hamburger: `;
		
		if (this._secretIngredient) {
			infoMessage += 'with secret ingredient, ';
		}

		if (this._cheese) {
			infoMessage += 'with cheese, ';
		}

		if (this._tomatoo) {
			if (this._tomatoo > 1) {
				infoMessage += `with ${this._tomatoo} tomatoes, `;
			} else {
				infoMessage += 'with 1 tomatoo, ';
			}

		}

		if (this._biteCount === 1) {
			infoMessage += `is bit ${this._biteCount} time. `;
		} else {
			infoMessage += `is bit ${this._biteCount} times. `;
		}

		infoMessage += `Total calories: ${this._calories}.`

		return infoMessage;
	}
}