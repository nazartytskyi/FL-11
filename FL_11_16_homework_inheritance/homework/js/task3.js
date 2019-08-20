function Pokemon(type, specie, hasWings = false) {
	this.type = type;
	this.specie = specie;
	this.hasWings = hasWings;
}

Pokemon.prototype.getType = function() {
	return this.type;
}

Pokemon.prototype.getSpecie = function() {
	return this.specie;
}

Pokemon.prototype.canFly = function() {
	return this.hasWings;
}

Pokemon.prototype.getPokemonType = function() {
	return this.constructor.name;
}

function Charmander() {
	Pokemon.call(this, 'Fire', 'Lizard Pokemon');
}

Charmander.prototype = Object.create(Pokemon.prototype);
Charmander.prototype.constructor = Charmander;
Charmander.prototype.evolve = function() {
	return new Charmeleon();
}

function Charmeleon() {
	Charmander.call(this);
	this.specie = 'Flame Pokemon';
}

Charmeleon.prototype = Object.create(Charmander.prototype);
Charmeleon.prototype.constructor = Charmeleon;
Charmeleon.prototype.evolve = function() {
	return new Charizard();
}

function Charizard() {
	Charmeleon.call(this);
	this.hasWings = true;
}

Charizard.prototype = Object.create(Charmeleon.prototype);
Charizard.prototype.constructor = Charizard;
Charizard.prototype.evolve = function() {
	return this;
}

function Pichu(){
	Pokemon.call(this, 'Electric', 'Mouse Pokemon');
}

Pichu.prototype = Object.create(Pokemon.prototype);
Pichu.prototype.constructor = Pichu;
Pichu.prototype.evolve = function() {
	return new Pikachu();
}

function Pikachu() {
	Pichu.call(this);
}

Pikachu.prototype = Object.create(Pichu.prototype);
Pikachu.prototype.constructor = Pikachu;
Pikachu.prototype.evolve = function() {
	return new Raichu();
}

function Raichu() {
	Pikachu.call(this);
} 

Raichu.prototype = Object.create(Pikachu.prototype);
Raichu.prototype.constructor = Raichu;
Raichu.prototype.evolve = function() {
	return this;
}
