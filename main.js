prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
})

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML = "<img id='captured_image' src=" + data_uri + ">";
    });
}

console.log("ml5 Version:", ml5.version);

var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/C_0bhAZl7/model.json", modelloaded);
function modelloaded()
{
    console.log("Modelloaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is " + prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterthis);
}

function check()
{
    var img = document.getElementById("captured_image");
    classifier.classify(img, gotresult);
}
function gotresult(error, result)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
        console.log(result);
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;      
        speak();
        if(result[0].label == "Victory")
        {
          document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
        if(result[0].label == "Best")
        {
          document.getElementById("update_emoji").innerHTML = "&#128077;"
        }
        if(result[0].label == "Amazing")
        {
          document.getElementById("update_emoji").innerHTML = "&#128076;"
        }
        if(result[1].label == "Victory")
        {
          document.getElementById("update_emoji2").innerHTML = "&#9996;"
        }
        if(result[1].label == "Best")
        {
          document.getElementById("update_emoji2").innerHTML = "&#128077;"
        }
        if(result[1].label == "Amazing")
        {
          document.getElementById("update_emoji2").innerHTML = "&#128076;"
        }
    }
}