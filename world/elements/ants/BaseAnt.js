import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'
import { Food } from '../worldObjects/Food.js';

export class Ant extends Entity {
    constructor(pos, nest) {
        super(pos);
        this.nest = nest;
        this.orientation = alea(0, 360);
        this.foodCarried = 0;
        this.mentalState = {
            lastPheromoneMax: 10,
            perception: 10,
            pheromoneWanderValue: '0,0,255',
            pheromoneWanderStrength: 2000,
            pheromoneFoodValue: '255,0,0',
            pheromoneFoodStrength: 6000,
            pheromoneFoodTrigger: 500,
            energyMax: 2000,
            resilience: 1200,
            curiosityMax: 500,
            speed: 1
        }
        this.mentalState.energy = this.mentalState.energyMax;
        this.mentalState.lastPheromone = this.mentalState.lastPheromoneMax;
        this.mentalState.curiosity = this.mentalState.curiosityMax;
        this.skinBase = [
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
            [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0],
            [1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
            [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
        ]
    }
    get infos() {
        return Object.assign({}, this.mentalState, { "food-carried": this.foodCarried });
    }

    get type() {
        return 'baseAnt'
    }

    forward() {
        this.pos.x -= this.mentalState.speed * Math.sin(this.orientation * Math.PI / 180);
        this.pos.y += this.mentalState.speed * Math.cos(this.orientation * Math.PI / 180);
    }

    getFrontOffsetPerceptionPosition() {
        let frontOffSetPosition = {
            x: this.pos.x,
            y: this.pos.y,
            range: this.mentalState.perception * this.size
        }
        let offset = this.mentalState.perception * this.size;

        frontOffSetPosition.x -= offset * Math.sin(this.orientation * Math.PI / 180);
        frontOffSetPosition.y += offset * Math.cos(this.orientation * Math.PI / 180);
        return frontOffSetPosition;
    }

    getCloseOffsetPerceptionPosition() {
        let frontOffSetPosition = {
            x: this.pos.x,
            y: this.pos.y,
            range: this.mentalState.perception * this.size
        }
        let offset = this.mentalState.perception / 2 * this.size;

        frontOffSetPosition.x -= offset * Math.sin(this.orientation * Math.PI / 180);
        frontOffSetPosition.y += offset * Math.cos(this.orientation * Math.PI / 180);
        return frontOffSetPosition;
    }

    changeDirection(preferedDirection = alea(0, 1) ? -1 : 1, preferedStep = alea(1, 3)) {

        //var angleDeg = Math.atan2(isFront.filter(obj => obj.type === 'gravel')[0].pos.y - this.pos.y, isFront.filter(obj => obj.type === 'gravel')[0].pos.x - this.pos.x) * 180 / Math.PI;
        //console.log("angle", angleDeg);
        this.orientation += preferedDirection * 5 * preferedStep;
        if (this.orientation > 360) {
            this.orientation = 0;
        }
    }

    putPheromone(type, world) {
        let pheros;
        switch (type) {
            case 'wander':
                pheros = world.getNearbyObjectsByType('pheromone', {
                    x: this.pos.x,
                    y: this.pos.y,
                    range: 5
                }).filter(phero => phero.value === this.mentalState.pheromoneWanderValue);
                if (pheros.length > 0) {
                    pheros[0].strength += this.mentalState.pheromoneWanderStrength;
                } else {
                    let pheromone = new Pheromone({ x: this.pos.x, y: this.pos.y }, this.mentalState.pheromoneWanderValue, this.mentalState.pheromoneWanderStrength);
                    world.pushToObjectList(pheromone);
                }
                break;
            case 'food':
                pheros = world.getNearbyObjectsByType('pheromone', {
                    x: this.pos.x,
                    y: this.pos.y,
                    range: 5
                }).filter(phero => phero.value === this.mentalState.pheromoneFoodValue);
                if (pheros.length > 0) {
                    pheros[0].strength += this.mentalState.pheromoneFoodStrength;
                } else {
                    let pheromone = new Pheromone({ x: this.pos.x, y: this.pos.y }, this.mentalState.pheromoneFoodValue, this.mentalState.pheromoneFoodStrength);
                    world.pushToObjectList(pheromone)
                }

                break;
        }

    }

    takeFood(food) {
        this.foodCarried += food.removeFood(5);
    }

    makePheromoneSum(pheromoneArray) {
        return pheromoneArray.reduce((pheromoneSum, pheromone) => {
            pheromoneSum[pheromone.value] = pheromoneSum[pheromone.value] ? pheromoneSum[pheromone.value] + pheromone.strength : pheromone.strength
            return pheromoneSum;
        }, {});
    }

    rotate(matrix) {
        let result = [];
        for (let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map(e => e[i]).reverse();
            result.push(row);
        }
        return result;
    };

    postRun(world) {
        if (this.mentalState.energy < 0) {
            world.replaceInObjectList(this, new Food(this.pos, { value: 20 + this.foodCarried, decayValue: 200 }));
        }
        this.mentalState.energy -= 1;
        this.mentalState.curiosity--;
        if (this.mentalState.curiosity < 0) {
            this.mentalState.curiosity = this.mentalState.curiosityMax;
        }
    }

    get states() {
        return [{
                action: (world) => {

                    let frontOffSetPosition = this.getFrontOffsetPerceptionPosition();

                    let isFront = world.getNearbyObjects(frontOffSetPosition);
                    if (isFront.filter(obj => obj.type === 'gravel').length > 0) {
                        this.changeDirection();
                    } else if (isFront.filter(obj => obj.type === 'food').length > 0) {
                        this.mentalState.curiosity = this.mentalState.curiosityMax;
                        return 2;
                    } else if (isFront.filter(obj => obj.type === 'pheromone').length > 0) {
                        let pheromoneSum = this.makePheromoneSum(isFront.filter(obj => obj.type === 'pheromone'));
                        if (pheromoneSum[this.mentalState.pheromoneFoodValue] > this.mentalState.pheromoneFoodTrigger) {
                            this.mentalState.curiosity = this.mentalState.curiosityMax;
                            return 2;
                        } else {
                            this.forward();
                        }
                    } else if (alea(1, this.mentalState.curiosityMax / 2) > this.mentalState.curiosity) {
                        this.changeDirection();
                        this.mentalState.curiosity = this.mentalState.curiosityMax;
                    } else {
                        this.forward();
                        this.mentalState.curiosity--;
                    }
                    this.mentalState.lastPheromone--;
                    if (this.mentalState.lastPheromone < 0) {
                        this.mentalState.lastPheromone = this.mentalState.lastPheromoneMax;
                        this.mentalState.energy -= 5;
                        this.putPheromone('wander', world);
                    }

                    if (this.mentalState.energy < this.mentalState.resilience) {
                        this.mentalState.curiosity = this.mentalState.curiosityMax;
                        return 1;
                    }
                    return -1;
                }
            },
            {
                action: (world) => {
                    this.colorValue = 'grey'
                    let frontOffSetPosition = this.getFrontOffsetPerceptionPosition();

                    let isFront = world.getNearbyObjects(frontOffSetPosition);
                    if (isFront.filter(obj => obj.type === 'gravel').length > 0) {
                        this.changeDirection();
                    } else if (isFront.filter(obj => obj.type === 'nestEntrance').length > 0) {
                        isFront.filter(obj => obj.type === 'nestEntrance')[0].enter(this, world);
                    } else if (isFront.filter(obj => obj.type === 'pheromone').length > 0) {
                        let pheromoneSum = this.makePheromoneSum(isFront.filter(obj => obj.type === 'pheromone'));
                        if (pheromoneSum[this.mentalState.pheromoneWanderValue] > 0) {
                            this.foundTrail = true;
                            this.searchTime = 0;
                            this.forward();
                        } else {
                            this.changeDirection();
                        }
                    } else if (this.foundTrail) {
                        this.searchTime++;
                        if (this.searchTime < this.mentalState.curiosityMax * 10) {
                            this.changeDirection();
                        } else {
                            this.foundTrail = false;
                            this.searchTime = 0;
                        }
                    } else if (alea(1, this.mentalState.curiosityMax / 2) > this.mentalState.curiosity) {
                        this.mentalState.curiosity = this.mentalState.curiosityMax;
                        this.forward();
                    } else {
                        this.changeDirection();
                    }
                    return -1;
                }
            },
            {
                action: (world) => {
                    this.colorValue = 'blue'
                    let frontOffSetPosition = this.getFrontOffsetPerceptionPosition();

                    let isFront = world.getNearbyObjects(frontOffSetPosition);
                    if (isFront.filter(obj => obj.type === 'gravel').length > 0) {
                        this.changeDirection();
                    } else if (isFront.filter(obj => obj.type === 'nestEntrance').length > 0 && this.foodCarried >= 20) {
                        isFront.filter(obj => obj.type === 'nestEntrance')[0].enter(this, world);
                    } else if (isFront.filter(obj => obj.type === 'food').length > 0 && this.foodCarried < 20) {
                        this.takeFood(isFront.filter(obj => obj.type === 'food')[0])
                        this.foundTrail = false;
                        this.searchTime = 0;
                    } else if (isFront.filter(obj => obj.type === 'pheromone').length > 0) {
                        if (this.foodCarried < 20) {
                            let pheromoneSum = this.makePheromoneSum(isFront.filter(obj => obj.type === 'pheromone'));
                            if (pheromoneSum[this.mentalState.pheromoneFoodValue] > 0) {
                                this.foundTrail = true;
                                this.searchTime = 0;
                                this.forward();
                            } else {
                                this.changeDirection();
                            }
                        } else {
                            let pheromoneSum = this.makePheromoneSum(isFront.filter(obj => obj.type === 'pheromone'));
                            if (pheromoneSum[this.mentalState.pheromoneWanderValue] > 0) {
                                this.foundTrail = true;
                                this.forward();
                            } else {
                                this.changeDirection();
                            }
                        }
                    } else if (this.foundTrail) {
                        this.searchTime++;
                        if (this.searchTime < this.mentalState.curiosityMax * 10) {
                            this.changeDirection();
                        } else {
                            this.foundTrail = false;
                            this.searchTime = 0;
                        }
                    } else if (alea(1, this.mentalState.curiosityMax / 2) > this.mentalState.curiosity) {
                        this.forward();
                        this.mentalState.curiosity = this.mentalState.curiosityMax;
                    } else {
                        this.changeDirection();
                    }
                    if (this.foundTrail) {
                        this.mentalState.lastPheromone--;
                        if (this.mentalState.lastPheromone < 0) {
                            this.mentalState.lastPheromone = this.mentalState.lastPheromoneMax;
                            this.mentalState.energy -= 5;
                            if (this.foodCarried >= 20) {
                                this.putPheromone('food', world);
                            } else {
                                this.putPheromone('wander', world);
                            }

                        }
                    }
                    return -1;
                }
            }
        ]
    }
}

class Pheromone extends Entity {
    constructor(pos, value, strength) {
        super(pos);
        this.value = value;
        this.strength = strength;
        this.maxStrength = strength;
        this.colorValue = `rgba(${this.value}, 1)`
        this.skinBase = false
        this.skinVisible = [
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
        ]
    }

    get type() {
        return 'pheromone'
    }

    postRun(world) {
        if (this.strength < 0) {
            world.removeFromObjectList(this);
        }
        if (world.options.pheromoneVisible) {
            this.skinBase = this.skinVisible;
        } else {
            this.skinBase = false;
        }
        this.colorValue = `rgba(${this.value}, ${this.strength / this.maxStrength})`
    }

    get states() {
        return [{
            action: (world) => {
                this.strength--;
                return -1
            }
        }]
    }

    get infos() {
        return {
            "strength": `${this.strength} (${(this.strength / this.maxStrength )*100}%)`
        }
    }
}