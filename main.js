song="";
function preload(){
    song=loadSound("music.mp3");
}
scoreRightWrist=0;
scoreLeftWrist=0;
RightWristX=0;
RightWristY=0;
LeftWristX=0;
LeftWristY=0;
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
console.log("poseNet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
         scoreLeftWrist = results[0].pose.keypoints[9].score;
          console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
    LeftWristX=results[0].pose.leftWrist.x;
    LeftWristY=results[0].pose.leftWrist.y;
    console.log("Left wrist X="+LeftWristX+"Left wrist Y="+LeftWristY);
    RightWristX=results[0].pose.rightWrist.x;
    RightWristY=results[0].pose.rightWrist.y;
    console.log("Right wrist X="+RightWristX+"Right wrist Y="+RightWristY);
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){
        circle(LeftWristX,LeftWristY,20);
        InNumberleftWristY=Number(LeftWristY);
        remove_decimals=floor(InNumberleftWristY);
        volume=remove_decimals/500;
        document.getElementById("volume").innerHTML="volume="+volume;
        song.setVolume(volume);
    }
    if(scoreRightWrist>0.2){
        circle(RightWristX,RightWristY,20);
        if(RightWristY>0 && RightWristY<=100){
            song.rate(0.5);
            document.getElementById("speed").innerHTML="Speed=0.5x";
        }
        else if(RightWristY>100 && RightWristY<=200){
            song.rate(1);
            document.getElementById("speed").innerHTML="Speed=1x";
        }
        else if(RightWristY>200 && RightWristY<=300){
            song.rate(1.5);
            document.getElementById("speed").innerHTML="Speed=1.5x";
        }
        else if(RightWristY>300 && RightWristY<=400){
            song.rate(2);
            document.getElementById("speed").innerHTML="speed=2x";
        }
        else if(RightWristY>400){
            song.rate(2.5);
            document.getElementById("speed").innerHTML="speed=2.5x";
    }}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}