/*
  I looked through the p5.js library to get started on this project and discovered that there is native methods for 3D shapes. I decided I could produce a better looking end product with 3D shapes after looking through both the methods for 2D and 3D shapes.
 I don't think there is a way to display a catchphrase in p5.js unless it is rendered in 3d and text() is unsupported in WEBGL mode.
*/

function setup () {
  createCanvas(400, 400, WEBGL);

  // Step 2: Answer the question
  console.log("A class is a place where methods and objects are defined and is not a runtime. An instance is an instance of a class called during runtime using the 'new' operator all instances are defined by the classes they instantiate.");
  _text = createGraphics( 100, 200);
  
  _text.fill(0);
  _text.textSize(50);
  _text.textAlign(CENTER, TOP);
  _text.text('HYAAA!', 100, 50); 
  // Step 4: Create your own Avatar
  window.Avatar1 = new  Avatar("Henry", 30, 30, "blue", "blonde", 'green');

}


function draw () {
  background(color(100, 150, 255));

  // Step 6b: Update avatar location
  Avatar1.updateLocation(mouseX, mouseY);
  // Step 5b: Show your avatar
    Avatar1.show();
}

 class Avatar {
  constructor(name, height, width, eyeColor, hairColor,  hatColor ) {
    // Step 3: add the missing parameters and properties
    this.name = name;
    this.height = height;
    this.width = width;
    this.eyeColor = eyeColor;
    this.hairColor = hairColor;
    this.hatColor = hatColor;
    this.x = width/2;
    this.y = height/2;

    
    
    
  }
  
  // Step 5a: Add the show() function
  show() {
    //rotateY(frameCount/500); //some rotation fun
    //rotateX(frameCount/500);
    rotateX(-.5);
    angleMode(degrees);
    var jump = Math.sin(frameCount*.1)*3; //since sine functions cycles between -1 and 1 we can use it to loop a jump animation
    rotateY(frameCount/500);
    push();// just the avatar model scope
    translate(0, jump, 0);
    push(); //creating a ellipsoid body
    noStroke();
    fill(255, 153, 204);
    ellipsoid(this.width, this.height, this.width);
    pop();
    
    push(); //creating hat using cone shape and torus
    translate(0,this.height-70, 0);
    stroke(this.hatColor);
    noFill();
    cone(this.width*1.25, -this.height*1.25);
    translate(0, 12, 0);
    rotateX(-1.5);
    torus(this.width, this.width*.25);
    pop();
    
    push();// creating feet from ellipsoid shapes
    noStroke();
    fill(204, 0, 102);
    translate(this.width*.6,this.height-2, this.width*.40);
    rotateY(.5);
    ellipsoid(this.width*.50, this.height*.33, this.width*.8); //right feet
    translate((-this.width*.6)*2, 0 , 0);
    rotateY(-.5);
    ellipsoid(this.width*.50, this.height*.33, this.width*.8); //left feet
    pop();
    
    push(); //arms are also ellipsoids
    noStroke();
    translate(this.width, 0, 0);
    rotateX(-.5);
    rotateY(-.15)
    ellipsoid(this.width*.4, this.height*.33, this.width*.6); //right arm
    translate(-this.width*2, 0, 0);
    rotateY(.5);
    rotateX(.5);
    ellipsoid(this.width*.4, this.height*.33, this.width*.6); //left arm
    pop();
    
    push(); //eyes are 2d shapes
    noStroke();
    fill(this.eyeColor);
    translate(0,0, this.width);
    ellipse(this.width*.33, -this.height*.20, this.width*.2, this.height*.60);
    ellipse(-this.width*.33, -this.height*.20, this.width*.2, this.height*.60);
    pop();
    
    push(); //hair is a torus();
    noStroke();
    fill(this.hairColor);
    translate(0, -this.width*.75, 0);
    rotateX(96);
    torus(this.width*.55, this.width*.25);
    pop();
    pop();  //end of avatar scope

    push();
    fill(0)
    noStroke();
    translate(0,this.width*1.45,this.width*1.25);
    rotateX(90);
    ellipse(0, 0, this.width*2.40+jump, this.width*2.60+jump/2);
    pop();
    
    push();
    fill('white');
    this.mouseClicked();
    pop();
    
    
  }
  
  // Step 6a: Add the updateLocation() function
  updateLocation(x, y)
  {
    this.mouseX = x;
    this.mouseY = y;
    
    translate(this.mouseX-width/2, this.mouseY-height/2);
  }

  mouseClicked() {
   orbitControl();
   //background(100);
   
   texture(_text);
   plane(40, 20);
  }

}
