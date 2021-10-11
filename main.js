img = "";
status = "";
objects = [];
counter = 0;

function preload() {
     img = selectImage();
}


function setup() {
    canvas = createCanvas(640, 420);
    canvas.position(430,150);
    objectIdentifier = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Object";
}

function modelLoaded(){
    console.log("Model is loaded");
    status = "true";
    objectIdentifier.detect(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

/*function draw() {
    image(img, 0, 0, 640, 420);
    fill("#FF0000");
    text("Dog", 45, 75);
    text("Cat", 320, 120);
    noFill();
    stroke("#FF0000");
    rect(30, 60, 450, 350);
    rect(300, 90, 270, 320);
}*/

function draw(){
    image(img, 0, 0, 640, 420);
    if(status != ""){
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function selectImage(){
    if(counter == 0){
        img = loadImage("dog_cat.jpg");
    }
    else if(counter == 1){
        img = loadImage("person.jpg");
    }
    else if(counter == 2){
        img = loadImage("Table.jpg");
    }
    else if (counter == 3){
        img = loadImage("Furniture.jpg");
    }
    else if(counter == 4){
        img = loadImage("Cars.jpg");
    }
    else{
        counter = 0;
        selectImage();
    }
    return(img);
}

function ChangeImg(){
    counter = counter + 1;
    selectImage();
    setup();
}