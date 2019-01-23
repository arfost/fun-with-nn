import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'

export class Food extends Entity {
    constructor(pos, foodConfig = {
        value: 200,
        decayValue: 200
    }) {
        super(pos);
        this.baseValue = foodConfig.value;
        this.value = foodConfig.value;
        this.decayValue = foodConfig.decayValue;
        this.currentDecay = 0;
        this.skinBase = [
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [1, 0, 0, 1, 1, 0, 1, 1, 0, 0],
            [1, 1, 1, 0, 0, 1, 0, 0, 1, 0],
            [1, 0, 0, 1, 1, 1, 1, 0, 1, 0],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
            [1, 1, 0, 1, 0, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 0, 0, 1, 0, 1, 0],
            [1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [1, 0, 1, 1, 1, 1, 1, 1, 1, 0]
        ]
    }

    removeFood(value) {
        this.value -= value;
        return value + (this.value < 0 ? this.value : 0)
    }

    postRun(world) {
        this.currentDecay++;
        if (this.currentDecay > this.decayValue) {
            this.currentDecay = 0;
            this.value--;
        }
        if (this.value <= 0) {
            world.removeFromObjectList(this);
        }
        this.colorValue = `rgba(0, 255, 0, ${this.value/this.baseValue })`
    }

    get type() {
        return 'food'
    }

    get infos() {
        return {
            "food quantity": `${this.value} (${(this.value/this.baseValue )*100}%)`
        }
    }
}