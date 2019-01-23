import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'
import { Ant } from '../ants/BaseAnt.js'

export class NestEntrance extends Entity {
    constructor(pos, nestConfig = {
        antFoodCount: 50,
        baseFood: 1000,
        foodConsomption: 100
    }) {
        super(pos);
        this.nestConfig = nestConfig;
        this.food = nestConfig.baseFood;
        this.foodRecolted = 0;
        this.antCount = 0;
        this.antBackCount = 0;
        this.consomptionTimer = nestConfig.foodConsomption;
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
        this.food += ant.foodCarried * 10;
        this.foodRecolted += ant.foodCarried * 10;
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

    postRun(world) {
        this.consomptionTimer--;
        if (this.consomptionTimer < 0) {
            this.consomptionTimer = this.nestConfig.foodConsomption;
            //this.food -= this.antBackCount;
        }
        if (this.food <= 0) {
            world.removeFromObjectList(this);
        }
    }

    get canCreateAnt() {
        return this.food > this.nestConfig.antFoodCount;
    }

    get infos() {
        return {
            "ant count": this.antCount,
            "ant back count": this.antBackCount,
            food: this.food,
            "food recolted": this.foodRecolted,
            "consomption timer": this.consomptionTimer
        }
    }
}