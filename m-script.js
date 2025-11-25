window.addEventListener('load',function(){
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  // Default CSS size (will be overwritten by resizeCanvas)
  canvas.style.width = '480px';
  canvas.style.height = '450px';
  
  
  class Mandrake{
    constructor(canvasWidth,canvasHeight){
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.image = document.getElementById('mandrake');
      this.spriteWidth = 256;
      this.spriteHeight = 256;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.scale = 2;
      this.x = this.canvasWidth/2 - this.width * this.scale/2;
      this.y = this.canvasHeight/2 -this.height * this.scale/2;
      this.minFrame = 0;
      this.maxFrame = 355;
      this.frame = 0;
      this.frameX = 3;
      this.frameY = 7;
    }
    draw(context){
      context.drawImage(this.image, this.frameX * this.spriteWidth, 
      this.frameY * this.spriteHeight, this.spriteWidth,this.spriteHeight, 
      this.x, this.y,
      this.width * this.scale, this.height * this.scale);  
    }
    update(){
      /*(this.frameX < 17 this.frameX++
      else this.frameX = 0*/
      this.frame = this.frame < this.maxFrame ? this.frame + 1 : this.minFrame;
      this.frameX = this.frame % 18;
      this.frameY = Math.floor(this.frame / 18);
    }
    setAnimation(newMinFrame, newMaxFrame){
      this.minFrame = newMinFrame;
      this.maxFrame = newMaxFrame;
      this.frame = this.minFrame;
    }
  } 
  
  const mandrake = new Mandrake(canvas.clientWidth,canvas.clientHeight);

  // Resize canvas buffer and adjust mandrake scale/position to fit container
  function resizeCanvas(){
    const dpr = window.devicePixelRatio || 1;
    const containerEl = document.getElementById('container');
    const cssWidth = Math.min(containerEl.clientWidth, 650);
    // Keep aspect ratio similar to initial default
    const aspect = 480 / 450; // width/height
    const cssHeight = Math.round(cssWidth / aspect);

    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';

    canvas.width = Math.round(cssWidth * dpr);
    canvas.height = Math.round(cssHeight * dpr);
    // Make drawing coordinates equal to CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Update mandrake properties to the CSS pixel size
    mandrake.canvasWidth = cssWidth;
    mandrake.canvasHeight = cssHeight;
    // Compute a scale so the sprite fits comfortably inside the canvas
    const s = Math.min((cssWidth * 0.8) / mandrake.spriteWidth, (cssHeight * 0.8) / mandrake.spriteHeight);
    mandrake.scale = s || 1;
    mandrake.x = mandrake.canvasWidth/2 - mandrake.spriteWidth * mandrake.scale/2;
    mandrake.y = mandrake.canvasHeight/2 - mandrake.spriteHeight * mandrake.scale/2;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    mandrake.draw(ctx);
    mandrake.update();
    requestAnimationFrame(animate);
  }
  animate();
  
  const all = document.getElementById('all');
  all.addEventListener('click', function(){
    mandrake.setAnimation(0,355)
  });
  
  const grow = document.getElementById('grow');
  grow.addEventListener('click', function(){
    mandrake.setAnimation(0,75)
  });
  
  const wink = document.getElementById('wink');
  wink.addEventListener('click', function(){
    mandrake.setAnimation(76,112)
  });
   
  const float = document.getElementById('float');
  float.addEventListener('click', function(){
    mandrake.setAnimation(113,262)
  });
  
   const hide = document.getElementById('hide');
  hide.addEventListener('click', function(){
    mandrake.setAnimation(263,355)
  });
})
