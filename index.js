$(document).ready(function () {


    let canvas = $("#mycanvas");
    let ctx = canvas.get(0).getContext("2d");
    let PIXELSIZE = 2;

    let REPEATSX = 20;
    let REPEATSY = 20;
    let DIMENSION = 25;
    let selectedBox = null;

    let WIDTH = DIMENSION * REPEATSX * PIXELSIZE;
    let HEIGHT = DIMENSION * REPEATSY * PIXELSIZE;

    canvas.attr('width',WIDTH);
    canvas.attr('height',HEIGHT);

    var firebaseConfig = {
        apiKey: "AIzaSyCL3BHtiAWRuJ-dlNXFFABoHJKwW6l6EAM",
        authDomain: "largecanvas-8f05f.firebaseapp.com",
        databaseURL: "https://largecanvas-8f05f.firebaseio.com",
        projectId: "largecanvas-8f05f",
        storageBucket: "largecanvas-8f05f.appspot.com",
        messagingSenderId: "858388865742",
        appId: "1:858388865742:web:1e83b1e730f2889262e69f"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    ctx.strokeStyle ='#cccccc';
    for (let i = 0; i < DIMENSION * REPEATSX; ++i) {
        if (i % DIMENSION != 0) { continue; }
        x = i * PIXELSIZE ;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, HEIGHT);
        ctx.stroke();

        y = i * PIXELSIZE;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(WIDTH, y);
        ctx.stroke();
    }
    let db = firebase.firestore();
    db.collection('app').onSnapshot(function (snapshot){
        snapshot.forEach(function(doc) {
            let coord = doc.id.split(",");
            let pixelData = doc.data()['data'];
            clearGrid(coord);
            for (let subkey in pixelData){
                let subcoord = subkey.split(",");
                let color = pixelData[subkey];

                fillPixel(coord,subcoord,color);
            }
        });
    });

    function clearGrid(coord) {
        let coordX = parseInt(coord[0]);
        let coordY = parseInt(coord[1]);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(coordX * DIMENSION * PIXELSIZE, coordY * DIMENSION * PIXELSIZE,
            DIMENSION*PIXELSIZE, DIMENSION*PIXELSIZE);
        ctx.fillStyle = '#cccccc';
        ctx.strokeRect(coordX * DIMENSION * PIXELSIZE, coordY * DIMENSION * PIXELSIZE,
        PIXELSIZE * DIMENSION, PIXELSIZE * DIMENSION);
    }

    function fillPixel(coord, subcoord, color) {
        let coordX = parseInt(coord[0]);
        let coordY = parseInt(coord[1]);
        let subCoordX = parseInt(subcoord[0]);
        let subCoordY = parseInt(subcoord[1]);
        if (coordX < 0 || coordY < 0 ||
          coordX >= REPEATSX || coordY >= REPEATSY ||
          subCoordX < 0 || subCoordX >= DIMENSION ||
          subCoordY < 0 || subCoordY >= DIMENSION) {
          return;
        }
    
        ctx.fillStyle = color;
        let x = (coordX * DIMENSION + subCoordX) * PIXELSIZE;
        let y = (coordY * DIMENSION + subCoordY) * PIXELSIZE;
        ctx.fillRect(x, y, PIXELSIZE, PIXELSIZE);
    }

    canvas.click(function (e) {
        selectBox(e);
    });
    canvas.mousemove(function(e) {
        pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];

        if(!selectedBox) {
            selectedBox = $("<div id=selectedBox></div>");
            selectedBox.css({width: DIMENSION * PIXELSIZE - 2, height: DIMENSION * PIXELSIZE - 2});
            $("#canvasWrapper").prepend(selectedBox);
        }
        selectedBox.css({left: pixel[0] * PIXELSIZE * DIMENSION+8,
        top: pixel[1] * PIXELSIZE * DIMENSION+8})
    });
    
    let SELECTED = 0;
    function selectBox(e) {
      if (SELECTED) return;
      SELECTED = 1;
  
      let pixel = [Math.floor(e.offsetX / (PIXELSIZE * DIMENSION)), Math.floor(e.offsetY / (PIXELSIZE * DIMENSION))];
      window.location = "draw.php?x=" + pixel[0] + "&y=" + pixel[1];
    }
});