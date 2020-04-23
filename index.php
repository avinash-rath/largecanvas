<?php 

print <<<EOF

<!doctype html>
<style>

#mycanvas{
    border: 1px #000 solid;
    background-color: #fff;
    cursor: pointer;
}

#canvasWrapper{
    position:relative;
}
#selectedBox{
    border: 1px rgba(0,50,100,0.5) solid;
    background-color: rgba(0, 50, 100, 0.25);
    position:absolute;
    pointer-events:none;
}

</style>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-firestore.js"></script>
    <script src="index.js?version=$time"></script>
</head>
<body>
    <div id=canvasWrapper>
        <canvas id="mycanvas" width ="500" height ="500" style = "margin:8px;border:1px #000 solid"></canvas>
    </div>
<body>
</html>

EOF;

?>