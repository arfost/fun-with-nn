export class Entity {
    constructor(pos) {
        this.orientation = 0;
        this.state = 0;
        this.pos = pos;
        this.size = 1;
        this.skinBase = false;
        this.colorValue = 'black';
    }

    get type() {
        throw new Error('to override in child')
    }

    get infos() {
        return [];
    }

    get states() {
        return [{
            action: (entity) => { return -1 }
        }]
    }

    get color() {
        return this.colorValue;
    }

    get formatedInfos() {
        return Object.entries(this.infos).map(([key, value]) => ({ key, value }));
    }

    get drawDatas() {
        return {
            pos: this.pos,
            skin: this.skin,
            color: this.color,
            size: this.size,
            type: this.type,
            orientation: this.orientation
        }
    }

    get skin() {
        return this.skinBase;
    }

    postRun() {}

    run(world) {
        let newState = this.states[this.state].action(world);
        this.state = newState !== -1 ? newState : this.state;
        this.postRun(world)
    }
}