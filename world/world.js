import { Ant } from './elements/ants/BaseAnt.js'
import { Gravel } from './elements/worldObjects/Gravel.js'
import { Food } from './elements/worldObjects/Food.js'
import { NestEntrance } from './elements/worldObjects/NestEntrance.js'

export default class {
    constructor() {
        this.objectList = [];
        this.sortedObjects = {};
        this.options = {};
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

    removeFromObjectList(object) {
        this.sortedObjects[object.type] = this.sortedObjects[object.type].filter(obj => obj !== object);
        this.objectList = this.objectList.filter(obj => obj !== object);
    }
    replaceInObjectList(object, newObject) {
        this.removeFromObjectList(object);
        this.pushToObjectList(newObject);
    }

    runWorld() {
        for (let object of this.objectList) {
            object.run(this)
        }
    }

    getNearbyObjects(pos, all = true) {
        return this.objectList.filter(object => {
            let isOkx = object.pos.x > pos.x - pos.range && object.pos.x < pos.x + pos.range
            let isOky = object.pos.y > pos.y - pos.range && object.pos.y < pos.y + pos.range;
            let isDrawable = object.drawDatas.skin;
            return isOkx && isOky && (isDrawable || all)
        })
    }

    createNewNestEntrance(pos) {
        this.pushToObjectList(new NestEntrance(pos));
    }

    createNewAnt(nest) {
        if (nest.canCreateAnt) {
            nest.createNewAnt(this);
        }
    }

    createNewGravel(pos) {
        this.pushToObjectList(new Gravel(pos))
    }

    createNewFood(pos) {
        this.pushToObjectList(new Food(pos))
    }
}