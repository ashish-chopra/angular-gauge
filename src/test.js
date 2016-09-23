<html>

<head>
    <title>Testing Canvas Arc Drawing</title>
    <script>
        function drawRectOnCanvas() {
            var canvas = document.getElementById('canvasBlock');
            if (canvas.getContext)
                var ctx = canvas.getContext('2d');
            //            x = ctx.canvas.width / 2;
            //            y = ctx.canvas.height / 2;
            //            console.log(x + " " + y);
            //            ctx.beginPath();
            //            ctx.arc(x, y, 50, 0, Math.PI, true);
            //            ctx.stroke();


            var requestID;
            ctx.fillStyle = '#212121';
            var posX = 0,
                boxWidth = 50,
                pixelPerFrame = 5;

            ctx.fillRect(posX, 0, boxWidth, canvas.height);

            function animate() {
                requestID = window.requestAnimationFrame(animate);
                //console.log(posX);
                if (posX <= (canvas.width - boxWidth)) {
                    ctx.clearRect((posX - pixelPerFrame), 0, boxWidth, canvas.height);
                    ctx.fillRect(posX, 0, boxWidth, canvas.height);
                    posX += pixelPerFrame;
                } else {
                    window.cancelAnimationFrame(requestID);
                }
            }
            animate();
        }

        function drawOnCanvas() {
            var canvas = document.getElementById('canvasBlock');
            if (canvas.getContext)
                var ctx = canvas.getContext('2d');
            x = ctx.canvas.width / 2;
            y = ctx.canvas.height / 2;
            console.log(x + " " + y);
            ctx.clearRect(0,0,canvas.width, canvas.height);
            var requestID,
                startPos = 0.9 * Math.PI,
                endPos = 2.1 * Math.PI,
                movePerFrame = 0.0174532925;
            console.log(endPos);
            
            ctx.beginPath();
            ctx.arc(x,y,x-20,startPos, endPos, false);
            ctx.lineWidth = 20;
            ctx.strokeStyle = "#ccc";
            ctx.stroke();
            animate();
            
            function animate() {
                requestID = window.requestAnimationFrame(animate);

                if (startPos <= endPos - 40*movePerFrame) {
                    ctx.beginPath();
                    var newPos = startPos + 3* movePerFrame;
                    console.log(newPos);
                    //ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.arc(x, y, x-20, startPos, newPos, false);
                    ctx.lineWidth = 20;
                    ctx.lineCap = 'butt';
                    ctx.strokeStyle = "orange";
                    ctx.stroke();
                    startPos = newPos+ movePerFrame;
                    
                } else {
                    cancelAnimationFrame(requestID);
                }
            }


        }
    </script>
    <style>
        .canvas-area {
            /*
border: 1px solid green;
                        width: 200px;
            height: 200px;
*/
        }
        
        .body-settings {
            margin-top: 200px;
            margin-left: 300px;
        }
    </style>
</head>

<body class="body-settings">
    <button onclick="drawOnCanvas()">Click to draw</button>

    <canvas id="canvasBlock" width="150" height="150" class="canvas-area"></canvas>
</body>

</html>