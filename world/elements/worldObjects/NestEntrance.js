import { Entity } from '../base/Entity.js'
import { alea } from '../../../helpers/vrac.js'

export class NestEntrance extends Entity {
    constructor(pos) {
        super(pos);
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
}