var prediction1="";
var prediction2="";
Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
var camera=document.getElementById("camera");
Webcam.attach("#camera");
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='takenimg' src='"+data_uri+"'>";
    });
}
console.log("ml5 version:"+ml5.version);
clasifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FfFLlu1C9/model.json",modelloaded);
function modelloaded(){
    console.log("Model Loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first pediction is "+prediction1;
    speak_data2="And the second prediction is "+prediction2;
    var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utter_this);
}
function check(){
    var image=document.getElementById("takenimg");
    clasifier.classify(image,gotresult);
}
function gotresult(error,result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        document.getElementById("result_emotion_name_1").innerHTML=result[0].label;
        document.getElementById("result_emotion_name_2").innerHTML=result[1].label;
        prediction1=result[0].label;
        prediction2=result[1].label;
        speak();
        if(prediction1=="Amazing"){
            document.getElementById("update_emoji_1").innerHTML="&#128076;";
        }
        if(prediction1=="Best"){
            document.getElementById("update_emoji_1").innerHTML="&#128077;";
        }
        if(prediction1=="Victory"){
            document.getElementById("update_emoji_1").innerHTML="&#9996;";
        }
        if(prediction2=="Amazing"){
            document.getElementById("update_emoji_2").innerHTML="&#128076;";
        }
        if(prediction2=="Best"){
            document.getElementById("update_emoji_2").innerHTML="&#128077;";
        }
        if(prediction2=="Victory"){
            document.getElementById("update_emoji_2").innerHTML="&#9996;";
        }
    }
}
