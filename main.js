img="";
status="";
object=[];
function preload()
{
}
function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide()
}
function start()
{
    objectDetector=ml5.objectDetector('cocoSSd',modelLoaded);
    document.getElementById("status").innerHTML="status:detectingobject";
}
function modelLoaded()
{
    console.log("modelloaded");
    status="true";
    objectDetector.detect(video,gotresult);
}
function gotresult(error,result)
{
    if (error)
    {
        console.error(error);
    }
    {
        console.log(result);
        object=result;
    }
}
function draw()
{
    image(video,0,0,380,380);
   if (status!="")
   {
    for(i=0;i< object.length; i++ )
    {
        r=random(255);
        g=random(255);
        b=random(255);
        document.getElementById("status").innerHTML="status : object detected";
        document.getElementById("number_of_object_detected").innerHTML="number of object detected"+object.length;
        fill(r,g,b);
        percent=floor(object[i].confidence*100);
        text(object[i].label+""+percent+"%",object[i].x,object[i].y);
        noFill();
        stroke(r,g,b);
        rect(object[i].x-80,object[i].y-40,object[i].width,object[i].height+30);
    }
   }
}