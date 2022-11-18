var model_status = false;
var input_obj = "";
var results_arr = [];
const synth = window.speechSynthesis;


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
    if(model_status) {
        model.detect(video, gotResult);
        for(let i = 0; i < results_arr.length; i++) {
            document.getElementById("obj_status").innerHTML = "Status: Objects Detected";
            document.getElementById("obj_status").innerHTML = "Number of objects detected are: " + results_arr.length;
            if(results_arr[i].label === document.getElementById("obj_name")) {
                video.webcamLiveView.stop();
                model.detect(gotResult);
                document.getElementById("obj_status").innerHTML = "Status: Object" + document.getElementById("obj_name") + " found";
                let utterance = new SpeechSynthesisUtterance("Status: Object" + document.getElementById("obj_name") + " found");
                synth.speak(utterance);
            } else {
                document.getElementById("obj_status").innerHTML = "Status: Object" + document.getElementById("obj_name") + "not found";
            }
            
            fill("#00FF00");
            percent = floor(results_arr[i].confidence);
            text(results_arr[i].label + " " + percent + "%", results_arr[i].x + 15, results_arr[i].y + 15);
            noFill();
            stroke("#0000FF");
            rect(results_arr[i].x, results_arr[i].y, results_arr[i].width, results_arr[i].height);
        }
    }
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

function gotResult(error, results)
{
    if(error) {
        console.error(error);
    }
    if (results.length > 0) {
        results_arr = results;
        console.log(results_arr);
    }
}