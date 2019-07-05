const NUM_OF_COORDS = 2;

const a1 = parseFloat( prompt('Enter a1:') );
const a2 = parseFloat( prompt('Enter a2:') );
const b1 = parseFloat( prompt('Enter b1:') );
const b2 = parseFloat( prompt('Enter b2:') );
const c1 = parseFloat( prompt('Enter c1:') );
const c2 = parseFloat( prompt('Enter c2:') );

let res = (a1 + b1) / NUM_OF_COORDS === c1 && (a2 + b2) / NUM_OF_COORDS === c2;

console.log(res);