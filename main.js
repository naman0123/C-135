var model_status = false;
var input_obj = "";

function setup()
{
    var canvas = createCanvas(800, 500);
    canvas.center();
    var video = createCapture(VIDEO);
    video.size(800, 500);
    video.hide();
}

function draw()
{
    image(video, 0, 0);
}

function start()
{
    model = ml5.imageClassifier('cocossd', modelLoaded);
    document.getElementById("model_status").innerHTML = "Status: Detecting objects";
    input_obj = document.getElementById("obj_name").innerHTML;
}

function modelLoaded()
{
    console.log("Model loaded");
    model_status = true;
}