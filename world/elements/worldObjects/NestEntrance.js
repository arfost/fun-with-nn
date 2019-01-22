import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'
import { Ant } from '../ants/BaseAnt.js'

export class NestEntrance extends Entity {
    constructor(pos, nestConfig = {
        antFoodCount: 50,
        baseFood: 1000
    }) {
        super(pos);
        this.nestConfig = nestConfig;
        this.food = nestConfig.baseFood;
        this.antCount = 0;
        this.antBackCount = 0;
        this.skinBase = [
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
            [1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
            [0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 0, 0, 1, 1, 1, 0, 1, 0, 0],
            [0, 1, 1, 0, 1, 1, 1, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0]
        ]
    }

    get type() {
        return 'nestEntrance'
    }

    enter(ant, world) {
        this.antBackCount++;
        world.removeFromObjectList(ant);
    }

    createNewAnt(world) {
        let ant = new Ant({
            x: this.pos.x,
            y: this.pos.y
        }, this);
        world.pushToObjectList(ant);
        this.food -= this.nestConfig.antFoodCount;
        this.antCount++;
    }

    get canCreateAnt() {
        return this.food > this.nestConfig.antFoodCount;
    }

    get infos() {
        return {
            "ant count": this.antCount,
            "ant back count": this.antBackCount,
            food: this.food
        }
    }
}