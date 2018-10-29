// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var World = require('./world/world.js')
var world = new World();

var cv = document.getElementById('cv');
var ctx = cv.getContext('2d');
var cvWidth = cv.width;
var cvHeight = cv.height;

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
        o.skin.forEach((row, rowIdx)=>{
            row.forEach((point, pointIdx)=>{
                if(point){
                    let xStart = o.pos.x - ((pointIdx * 5))
                    let yStart = o.pos.y - ((rowIdx * 5))
                    ctx.fillRect(xStart, yStart, 5, 5);
                }
            })
        })
    });
}

animate();


// click handler to add random rects
window.addEventListener('click', function () {
    world.createNewCritter();
});
