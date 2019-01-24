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
var mapX = 0;
var mapY = 0;
// animation : always running loop.

// Options
const outputEl = document.getElementById('fps-output');
const decimalPlaces = 2;
const updateEachSecond = 1;

// Cache values
const decimalPlacesRatio = Math.pow(10, decimalPlaces);
let timeMeasurements = [];
let fps = 0;

function animate() {
    // call again next time we can draw
    requestAnimationFrame(animate);
    world.runWorld()
        // clear canvas
    ctx.clearRect(0, 0, cvWidth, cvHeight);
    //calc FPS
    timeMeasurements.push(performance.now());

    const msPassed = timeMeasurements[timeMeasurements.length - 1] - timeMeasurements[0];

    if (msPassed >= updateEachSecond * 1000) {
        fps = Math.round(timeMeasurements.length / msPassed * 1000 * decimalPlacesRatio) / decimalPlacesRatio;
        timeMeasurements = [];
    }
    let toDrawList = world.drawCritters(mapX, mapX + cvWidth, mapY, mapY + cvHeight)
    ctx.font = "10px Arial";
    ctx.fillStyle = 'black'
    ctx.fillText(`fps : ${fps}`, 10, 20);
    ctx.fillText(`screen object count : ${toDrawList.length}`, 10, 32);
    ctx.fillText(`total object count : ${world.totalObjectCount}`, 10, 44)
    let linePos = 56;
    for (let type in world.sortedObjects) {
        ctx.fillText(`${type} object count : ${world.sortedObjects[type].length}`, 10, linePos)
        linePos += 12;
    }
    // draw everything
    toDrawList.forEach(o => {
        ctx.fillStyle = o.color;
        let offSetX = o.pos.x - 5 * o.size - mapX;
        let offSetY = o.pos.y - 5 * o.size - mapY;
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
var conTips = document.getElementById('contextualTips');
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

document.getElementById('togglePheromone').addEventListener('click', e => {
    if (lastNest) {
        world.options.pheromoneVisible = !world.options.pheromoneVisible;
    }
    conTips.innerHTML = "ant will spawn on last selected nest and be attached to it"
});
var lastNest = false;
// click handler to add random rects
cv.addEventListener('click', e => {
    let rect = cv.getBoundingClientRect();
    let click = {
        x: e.pageX + mapX,
        y: e.pageY + mapY
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
var lastObj;
var lastInterval;
cv.addEventListener('contextmenu', e => {
            e.preventDefault();
            let click = {
                x: e.pageX + mapX,
                y: e.pageY + mapY,
                range: 20
            };
            let objs = world.getNearbyObjects(click, false);
            if (objs.length > 0) {
                let obj = objs[0];
                clearInterval(lastInterval)
                if (lastObj === obj && objs.length > 1) {
                    obj = objs[1]
                }
                let html = `<div>${obj.type}</div>${obj.formatedInfos.map(info => { return `<div>${info.key} : ${info.value}</div>` })}`;
                    html = html.replace(/,/g, '');
                    infoPanel.innerHTML = html;
                lastInterval = setInterval(function () {
                    let html = `<div>${obj.type}</div>${obj.formatedInfos.map(info => { return `<div>${info.key} : ${info.value}</div>` })}`;
                    html = html.replace(/,/g, '');
                    infoPanel.innerHTML = html;
                }, 1000);
                lastObj = obj;
                lastNest = objs.reduce((lastNest, obj) => {
                    if (obj.type === 'nestEntrance') {
                        lastNest = obj;
                    }
                    return lastNest
                }, false)
            } else {
                clearInterval(lastInterval);
                lastObj = undefined;
                infoPanel.innerHTML = "right click on something to see infos"
            }
            
});

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        console.log("up")
        mapY -= 10;
    }
    else if (e.keyCode == '40') {
        console.log("down")
        mapY += 10;
    }
    else if (e.keyCode == '37') {
        console.log("right")
        mapX += 10;
    }
    else if (e.keyCode == '39') {
        console.log("left")
        mapX -= 10;
    }

}