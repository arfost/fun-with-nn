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
            critter.run(this.critterList)
        }
    }

    createNewCritter(pos) {
        let color = ['red', 'blue', 'black', 'yellow'][Math.floor(Math.random()*4)]
        this.critterList.push(new Critter(color, pos))
    }
}

class Critter {
    constructor(color, pos) {
        this.states = [
            {
                skin: returnNewSkin(),
                action: function(critter) {
                    console.log(this)
                    critter.pos[this.internal[0]] = critter.pos[this.internal[0]]+ this.internal[1]
                    return (Math.random() > 0.8)
                },
                internal: ['x', 1]
            },
            {
                skin: returnNewSkin(),
                action: () => {
                    return (Math.random() > 0.2)
                }
            }
        ]
        this.color = color;
        this.state = 1;
        this.pos = pos
    }

    get drawDatas(){
        return {
            pos:this.pos,
            skin:this.states[this.state].skin,
            color:this.color
        }
    }

    run() {
        this.state = Number(this.states[this.state].action(this))
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