module.exports = class {
    constructor() {
        this.critterList = []
    }

    get critters() {
        return this.critterList
    }

    get drawCritters(){
        return this.critterList.map(critter=>critter.drawDatas)
    }

    runWorld() {
        for (let critter of this.critterList) {
            critter.run(this)
        }
    }

    getNearbyCritters(pos, range){
        return this.critterList.filter(critter=>{
            let isOkx = critter.pos.x > pos.x - range && critter.pos.x < pos.x + range
            let isOky = critter.pos.y > pos.y - range && critter.pos.y < pos.y + range
            return isOkx && isOky
        })
    }

    createNewCritter(pos) {
        let color = ['red', 'blue', 'black', 'yellow'][Math.floor(Math.random()*4)]
        this.critterList.push(new Critter(color, pos, Math.floor(Math.random()*3) +2))
    }
}

class Critter {
    constructor(color, pos, size) {
        this.states = [
            {
                skin: returnNewSkin(),
                action: function(critter) {
                    console.log(this)
                    critter.pos[this.internal[0]] = critter.pos[this.internal[0]]+ this.internal[1]
                },
                internal: [alea(2)=== 1 ? 'x': 'y', alea(2)===1?-1:1]
            },
            {
                skin: returnNewSkin(),
                action: () => {}
            }
        ]
        this.color = color;
        this.state = 1;
        this.pos = pos;
        this.size = size;
    }

    get drawDatas(){
        return {
            pos:this.pos,
            skin:this.states[this.state].skin,
            color:this.color,
            size:this.size
        }
    }

    run(world) {
        let nc = world.getNearbyCritters(this.pos, 200);
        this.states[this.state].action(this)
        this.state = Number(nc.length === 0)
    }
}

function alea(min, max) {
    if (typeof max === 'undefined') {
        max = min;
        min = 1;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}
function returnNewSkin() {
    return [
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1],
        [Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1, Math.random() > 0.5 ? 0 : 1]
    ]
}