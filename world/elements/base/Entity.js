export class Entity {
    constructor(pos) {

        this.state = 0;
        this.pos = pos;
        this.size = 1;
        this.skinBase = false
    }

    get type() {
        throw new Error('to override in child')
    }

    get states() {
        return [{
            action: (entity) => { return -1 }
        }]
    }

    get color() {
        return 'black'
    }

    get drawDatas() {
        return {
            pos: this.pos,
            skin: this.skin,
            color: this.color,
            size: this.size,
            type: this.type
        }
    }

    get skin() {
        return this.skinBase;
    }

    run(world) {
        let newState = this.states[this.state].action(this, world);
        this.state = newState !== -1 ? newState : this.state;
    }
}