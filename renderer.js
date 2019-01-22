// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
require = require("esm")(module /*, options*/ )
var World = require('./world/world.js')
console.log(World)
var world = new World.default();

var cv = document.getElementById('cv');
var ctx = cv.getContext('2d');
var cvWidth = cv.width;
var cvHeight = cv.height;
var infoPanel = document.getElementById('infos');
var antsNumber = document.getElementById('ants');
// animation : always running loop.

function animate() {
    // call again next time we can draw
    requestAnimationFrame(animate);
    world.runWorld()
        // clear canvas
    ctx.clearRect(0, 0, cvWidth, cvHeight);
    // draw everything
    world.drawCritters.forEach(o => {
        ctx.fillStyle = o.color;
        let offSetX = o.pos.x - 5 * o.size;
        let offSetY = o.pos.y - 5 * o.size;
        var vx = Math.cos(o.orientation * Math.PI / 180); // create the vector along the image top
        var vy = Math.sin(o.orientation * Math.PI / 180);
        offSetX += -5 * vx + -5 * -vy; // add the rotated offset by mutliplying
        offSetY += -5 * vy + -5 * vx;
        ctx.setTransform(vx, vy, -vy, vx, offSetX, offSetY);
        o.skin.forEach((row, rowIdx) => {
            row.forEach((point, pointIdx) => {
                if (point) {
                    let xStart = ((pointIdx * o.size))
                    let yStart = ((rowIdx * o.size))

                    ctx.fillRect(xStart, yStart, o.size, o.size);

                }
            })
        })
        ctx.setTransform(1, 0, 0, 1, 0, 0);
    });
}

animate();
conTips = document.getElementById('contextualTips');
document.getElementById('addGravel').addEventListener('click', e => {
    console.log("mod add gravel")
    addState = 'gravel'
    conTips.innerHTML = "click anywhere to add gravel on map"
});

document.getElementById('addFood').addEventListener('click', e => {
    console.log("mod addFood")
    addState = 'food'
    conTips.innerHTML = "click anywhere to add food on map"
});

document.getElementById('addNestEntrance').addEventListener('click', e => {
    console.log("mod addNestEntrance")
    addState = 'nestEntrance'
    conTips.innerHTML = "click anywhere to add nest on map"
});

document.getElementById('addAnt').addEventListener('click', e => {
    if (lastNest) {
        world.createNewAnt(lastNest);
    }
    conTips.innerHTML = "ant will spawn on last selected nest and be attached to it"
});
lastNest = false;
// click handler to add random rects
cv.addEventListener('click', e => {
    let rect = cv.getBoundingClientRect();
    let click = {
        x: e.pageX,
        y: e.pageY
    };
    switch (addState) {
        case 'gravel':
            world.createNewGravel(click);
            break;
        case 'food':
            world.createNewFood(click)
            break;
        case 'nestEntrance':
            world.createNewNestEntrance(click);
            break;
    }
});
cv.addEventListener('contextmenu', e => {
            e.preventDefault();
            //world.createNewGravel({ x: e.x, y: e.y });
            let rect = cv.getBoundingClientRect();
            let click = {
                x: e.pageX,
                y: e.pageY,
                range: 10
            };
            let objs = world.getNearbyObjects(click, false);
            console.log(objs)
            infoPanel.innerHTML = `${objs.map(obj => { return `<p>${obj.type}</p>${obj.formatedInfos.map(info => { return `<p>${info.key} : ${info.value}</p>` })}` })}`
lastNest = objs.reduce((lastNest, obj) => {
if (obj.type === 'nestEntrance') {
lastNest = obj;
}
return lastNest
}, false)
});