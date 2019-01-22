import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'
import { Food } from '../worldObjects/Food.js';

export class Ant extends Entity {
    constructor(pos, nest) {
        super(pos);
        this.nest = nest;
        this.orientation = alea(0, 360);
        this.mentalState = {
            preferedDirection: alea(0, 1) ? -1 : 1,
            lastPheromoneMax: 10,
            perception: 10,
            pheromoneWanderValue: 10,
            pheromoneWanderStrength: 500,
            pheromoneFoodValue: 20,
            energyMax: 2000,
            resilience: 500,
            curiosity: 10,
            speed: 1
        }
        this.mentalState.energy = this.mentalState.energyMax;
        this.mentalState.lastPheromone = this.mentalState.lastPheromoneMax;
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
        return this.mentalState;
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

    changeDirection() {
        this.orientation += this.mentalState.preferedDirection * 5;
        if (this.orientation > 360) {
            this.orientation = 0;
        }
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
            world.replaceInObjectList(this, new Food(this.pos, 20));
        }
        this.mentalState.energy -= 1;
    }

    get states() {
        return [{
                action: (ant, world) => {

                    let frontOffSetPosition = ant.getFrontOffsetPerceptionPosition();

                    let isFront = world.getNearbyObjects(frontOffSetPosition);
                    if (isFront.filter(obj => obj.type === 'gravel').length > 0) {
                        ant.changeDirection();
                    } else if (alea(1, 100) < ant.mentalState.curiosity) {
                        ant.changeDirection();
                    } else {
                        ant.forward();
                    }
                    ant.mentalState.lastPheromone--;
                    if (ant.mentalState.lastPheromone < 0) {
                        ant.mentalState.lastPheromone = ant.mentalState.lastPheromoneMax;
                        ant.mentalState.energy -= 5;
                        let pheromone = new Pheromone({ x: ant.pos.x, y: ant.pos.y }, ant.mentalState.pheromoneWanderValue, ant.mentalState.pheromoneWanderStrength);
                        world.pushToObjectList(pheromone)
                    }

                    if (ant.mentalState.energy < ant.mentalState.resilience) {
                        return 1;
                    }
                    return -1;
                }
            },
            {
                foundTrail: false,
                action: (ant, world) => {
                    ant.colorValue = 'red'
                    let frontOffSetPosition = ant.getFrontOffsetPerceptionPosition();

                    let isFront = world.getNearbyObjects(frontOffSetPosition);
                    if (isFront.filter(obj => obj.type === 'gravel').length > 0) {
                        ant.changeDirection();
                    } else if (isFront.filter(obj => obj.type === 'pheromone').length > 0) {
                        this.foundTrail = true;
                        ant.forward();
                    } else if (this.foundTrail) {
                        ant.changeDirection();
                    } else if (alea(1, 100) < ant.mentalState.curiosity) {
                        ant.changeDirection();
                    } else {
                        ant.forward();
                    }

                    return -1;
                }
            }
        ]
    }
}

class Pheromone extends Entity {
    constructor(pos, value, maxDecay) {
        super(pos);
        this.value = value;
        this.decay = 0;
        this.maxDecay = maxDecay;
        this.colorValue = "rgba(255, 0, 0, 1)"
        this.skinBase = [
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
        ]
    }

    get type() {
        return 'pheromone'
    }

    postRun(world) {
        if (this.decay > this.maxDecay) {
            world.removeFromObjectList(this);
        }
        this.colorValue = `rgba(255, 0, 0, ${1-this.decay / this.maxDecay})`
    }

    get states() {
        return [{
            action: (entity, world) => {
                entity.decay++;
                return -1
            }
        }]
    }
}