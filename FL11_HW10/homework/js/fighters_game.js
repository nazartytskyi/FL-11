function Fighter(obj) {
    const name = obj.name;
    const damage = Math.abs(obj.damage);
    const maxHp = Math.abs(obj.hp);
    let currentHp = maxHp;
    const agility = Math.abs(obj.agility);
    let winsCount = 0;
    let lossesCount = 0;

    function attack(enemy) {
        const MAX_AGILITY = 100; 
        if ( Math.random() * MAX_AGILITY > enemy.getAgility() ) {
            enemy.dealDamage(damage);
            console.log(`${name} make ${damage} damage to ${enemy.getName()}`);
        } else {
            console.log(`${name} attack is missed`);
        }
    }

    function logCombatHistory() {
        console.log(`Name: ${name}, Wins: ${winsCount}, Losses: ${lossesCount}`);
    }

    function heal(points) {
        currentHp += Math.abs(points);      
        if (currentHp > maxHp) {
            currentHp = maxHp;
        }
    }

    function dealDamage(points) {
        currentHp -= Math.abs(points);
        if (currentHp < 0) {
            currentHp = 0;
        }
    }

    function addWin() {
        winsCount++;
    }

    function addLoss() {
        lossesCount++;
    }

    return {
        getName: () => name,
        getDamage: () => damage,
        getAgility: () => agility,
        getHealth: () => currentHp,
        attack,
        logCombatHistory,
        heal,
        dealDamage,
        addWin,
        addLoss
    }
}

function battle(figther1, figther2) {
    if ( isDead(figther1) ) {
        console.log(`${figther1.getName()} is dead and can't fight.`);
        return;
    }

    if ( isDead(figther2) ) {
        console.log(`${figther2.getName()} is dead and can't fight.`);
        return;
    }

    while ( !isDead(figther1) || !isDead(figther2) ) {
        figther1.attack(figther2);
        if ( isDead(figther2) ) {
            figther2.addLoss();
            figther1.addWin();
            break;
        }

        figther2.attack(figther1);
        if ( isDead(figther1) ) {
            figther1.addLoss();
            figther2.addWin();
            break;
        }
    }

    function isDead(fighter) {
        if (fighter.getHealth() > 0) {
            return false;
        }
        return true;
    }
}

const figther1 = new Fighter({name: 'John', damage: 20, hp: 100, agility: 25}); 
const figther2 = new Fighter({name: 'Jim', damage: 10, hp: 120, agility: 40}); 
battle(figther1, figther2);
figther1.getHealth();
figther2.getHealth();
figther1.logCombatHistory();
figther2.logCombatHistory();
battle(figther1, figther2);
