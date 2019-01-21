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
var gravelsNumber = document.getElementById('gravels');
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
        o.skin.forEach((row, rowIdx) => {
            row.forEach((point, pointIdx) => {
                if (point) {
                    let xStart = offSetX - ((pointIdx * o.size))
                    let yStart = offSetY - ((rowIdx * o.size))

                    ctx.fillRect(xStart, yStart, o.size, o.size);
                }
            })
        })
    });
    gravelsNumber.innerHTML = world.getObjectNumberByType('gravel')
    antsNumber.innerHTML = world.getObjectNumberByType('baseAnt')
}

animate();


// click handler to add random rects
cv.addEventListener('click', e => {
    console.log(e)
    world.createNewAnt({ x: e.x, y: e.y });
});
cv.addEventListener('contextmenu', e => {
    e.preventDefault();
    console.log(e)
    world.createNewGravel({ x: e.x, y: e.y });
});