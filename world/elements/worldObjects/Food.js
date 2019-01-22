import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'

export class Food extends Entity {
    constructor(pos, value = 50) {
        super(pos);
        this.value = value;
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

    get type() {
        return 'food'
    }
}