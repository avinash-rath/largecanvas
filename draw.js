$(document).ready(function () {

    // const firebase = require('firebase');


    let canvas = $("#mycanvas");
    let ctx = canvas.get(0).getContext("2d");
    let canvasWidth = canvas.width();
    let canvasHeight = canvas.height();
    let dim = 25;
    let PIXELSIZE = canvasHeight / dim;

    let selectedColor = '#222244';
    let enabled = true;
    let FILLED = {};

    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    for (let i = 0; i < dim; ++i) {
      x = Math.floor(i * canvasWidth / dim);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvasHeight);
      ctx.stroke();
  
      y = Math.floor(i * canvasHeight / dim);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvasWidth, y);
      ctx.stroke();
    }
    
    canvas.on('mousemove mousedown', mouseFill);
    function mouseFill(e) {
        if(!enabled) return;
        let offsetX = e.offsetX;
        let offsetY = e.offsetY;
        window.offsetX = offsetX;
        if(e.which!=1) return;
        let pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
        fillPixel(pixel);
    }
    function fillPixel(pixel) {
      let key = pixel[0]+','+pixel[1];
      FILLED[key] = selectedColor;
        ctx.fillStyle = selectedColor;
        ctx.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
    }

    

    const PICKR = Pickr.create({
        el: '#picker',
        comparison: false,
        components: {
          opacity: false,
          hue: true,
          palette: true,
          interaction: {
            input: true,
          }
        }
      });
      window.PICKR = PICKR;
      PICKR.on('init', function () {
        PICKR.setColor(selectedColor);
      });
      PICKR.on('show', function () {
        enabled = false;
      });
      PICKR.on('hide', function () {
        setTimeout(function () {
          enabled = true;
        }, 300);
      });
      PICKR.on('change', function () {
        selectedColor = PICKR.getColor().toHEXA().toString();
      });
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
    window.save = function(x,y) {
      var data = {};
      let key = x+','+y;
      data['data'] = FILLED;
      db = firebase.firestore();
      db.collection("app").doc(key).set(data).then(function(docRef) {
        console.log("Document added with ID: ",docRef);
        window.location = "index.php";
      })
      .catch(function(err){
        console.error("Error adding document",err);
      });
    }
});