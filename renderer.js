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
        if(o.pos.x < 0){
            o.pos.x = cvWidth
        }
        if (o.pos.x > cvWidth){
            o.pos.x = 0
        }
        if(o.pos.y < 0){
            o.pos.y = cvHeight
        }
        if (o.pos.y > cvHeight){
            o.pos.y = 0
        }
        o.skin.forEach((row, rowIdx)=>{
            row.forEach((point, pointIdx)=>{
                if(point){
                    let xStart = o.pos.x - ((pointIdx * o.size))
                    let yStart = o.pos.y - ((rowIdx * o.size))
                    ctx.fillRect(xStart, yStart, o.size, o.size);
                }
            })
        })
    });
}

animate();


// click handler to add random rects
window.addEventListener('click', e => {
    console.log(e)
    world.createNewCritter({x:e.x, y:e.y});
});
