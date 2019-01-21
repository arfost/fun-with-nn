import { Ant } from './elements/ants/BaseAnt.js'
import { Gravel } from './elements/worldObjects/Gravel.js'
import { NestEntrance } from './elements/worldObjects/NestEntrance.js'

export default class {
    constructor() {
        this.objectList = [];
        this.sortedObjects = {};
    }

    get objects() {
        return this.objectList
    }

    get drawCritters() {
        return this.objectList.reduce((toDraw, object) => {
            if (object.drawDatas.skin) {
                toDraw.push(object.drawDatas)
            }
            return toDraw;
        }, [])
    }

    getObjectNumberByType(type) {
        return this.sortedObjects[type] ? this.sortedObjects[type].length : 0;
    }

    pushToObjectList(object) {
        this.sortedObjects[object.type] ? this.sortedObjects[object.type].push(object) : this.sortedObjects[object.type] = [object];
        this.objectList.push(object);
    }

    runWorld() {
        for (let object of this.objectList) {
            object.run(this)
        }
    }

    getNearbyObjects(pos) {
        return this.objectList.filter(object => {
            let isOkx = object.pos.x > pos.x - pos.range && object.pos.x < pos.x + pos.range
            let isOky = object.pos.y > pos.y - pos.range && object.pos.y < pos.y + pos.range
            return isOkx && isOky
        })
    }

    createNewAnt(pos) {
        if (this.getObjectNumberByType('nestEntrance') === 0) {
            this.pushToObjectList(new NestEntrance(pos))
        } else {
            this.pushToObjectList(new Ant({
                x: this.sortedObjects['nestEntrance'][0].pos.x,
                y: this.sortedObjects['nestEntrance'][0].pos.y
            }))
        }

    }
    createNewGravel(pos) {
        this.pushToObjectList(new Gravel(pos))
    }
}