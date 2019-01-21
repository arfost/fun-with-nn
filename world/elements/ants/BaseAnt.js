import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'

export class Ant extends Entity {
    constructor(pos) {
        super(pos);
        this.direction = alea(0, 3);
        this.mentalState = {
            preferedDirection: alea(0, 1) ? -1 : 1,
            lastPheromone: 10,
            perception: 10,
            pheromoneWanderValue: 10,
            pheromoneFoodValue: 20,
            energyMax: 2000,
            resilience: 500,
        }
        this.mentalState.energy = this.mentalState.energyMax;
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

    get skin() {
        let skin = this.skinBase;
        for (let i = 0; i < this.direction; i++) {
            skin = this.rotate(skin);
        }
        return skin;
    }

    get type() {
        return 'baseAnt'
    }

    forward() {

        switch (this.direction) {
            case 0:
                this.pos.y--;
                break;
            case 1:
                this.pos.x++;
                break;
            case 2:
                this.pos.y++;
                break;
            case 3:
                this.pos.x--;
                break;
        }

    }

    getFrontOffsetPerceptionPosition() {
        let frontOffSetPosition = {
            x: this.pos.x,
            y: this.pos.y,
            range: this.mentalState.perception * this.size
        }
        let offset = this.mentalState.perception * this.size;
        switch (this.direction) {
            case 0:
                frontOffSetPosition.y -= offset;
                break;
            case 1:
                frontOffSetPosition.x += offset;
                break;
            case 2:
                frontOffSetPosition.y += offset;
                break;
            case 3:
                frontOffSetPosition.x -= offset;
                break;
        }
        return frontOffSetPosition;
    }

    changeDirection() {
        console.log('change', this.direction)
        this.direction += this.mentalState.preferedDirection;
        if (this.direction > 3) {
            this.direction = 0;
        }
        if (this.direction < 0) {
            this.direction = 3;
        }
        console.log('change fin', this.direction)
    }

    rotate(matrix) {
        let result = [];
        for (let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map(e => e[i]).reverse();
            result.push(row);
        }
        return result;
    };

    get states() {
        return [{
            action: (ant, world) => {

                let frontOffSetPosition = ant.getFrontOffsetPerceptionPosition();

                let isFront = world.getNearbyObjects(frontOffSetPosition);
                console.log('coucou', alea(1, 200), ant.mentalState.energy)
                if (isFront.filter(obj => obj.type === 'gravel').length > 0 || alea(1, ant.mentalState.energyMax - ant.mentalState.resilience) > ant.mentalState.energy) {
                    console.log('coucou gravel')
                    ant.changeDirection();
                } else {
                    ant.forward();
                }
                ant.mentalState.lastPheromone--;
                if (ant.mentalState.lastPheromone < 0) {
                    ant.mentalState.energy -= 1;
                    let pheromone = new Pheromone({ x: ant.pos.x, y: ant.pos.y }, ant.mentalState.pheromoneWanderValue);
                    world.pushToObjectList(pheromone)
                }
                return -1;
            }
        }]
    }
}

class Pheromone extends Entity {
    constructor(pos, value) {
        super(pos);
        this.value = value;
        this.decay = 0;
    }

    get type() {
        return 'pheromone'
    }

    get states() {
        return [{
            action: (entity) => {
                entity.decay--;
                return -1
            }
        }]
    }
}