<?php 
$x = intval($_REQUEST['x']);
$y = intval($_REQUEST['y']);

if ($_REQUEST['submit']) {
    $data = $_POST['data'];
    $data = json_encode($data);
    // return;
}

print <<<EOF

<!doctype html>

<html>
<style>
    body {
        margin: 30px;
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f0f0f0;
    }
    #mycanvas {
        margin-top: 8px;
        border: 1px #000 solid;
        background-color: #fff;
    }
</style>
<head> 
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.14.1/firebase-firestore.js"></script>
<link rel="stylesheet" href="pickr/dist/themes/classic.min.css" />
<script src="draw.js"></script>
<script src = "pickr/dist/pickr.min.js"></script>
</head>
<body>
<table>
    <tr>
        <td>
            <div id="picker"></div>
        </td>
        <td>
            <input type=button value="Choose Color" onclick="PICKR.show()" />
        </td>
    </tr>
</table>
<div>
    <canvas id="mycanvas" width ="600" height ="600"></canvas>
</div>

<input type="submit" value="save" onclick="save($x,$y)">
</body>

</html>

EOF;

?>