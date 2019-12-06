


function audiosetup()
{
    window.ctx = new AudioContext();
    window.audio = document.getElementById('music');
    window.audioSrc = ctx.createMediaElementSource(audio);
    window.analyser = ctx.createAnalyser();
    analyser.fftSize=128;
    audioSrc.connect(ctx.destination);
    audioSrc.connect(analyser);

    window.freqData = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(freqData);
}


let wmod=(128*2)*2;
let hmod=(72*2)*2;

let width = window.innerWidth;
let height = window.innerHeight;
let pixelwidth = width/wmod;
let pixelheight = height/hmod;
let pixels = [];
let limitClicks=false;
let ud=false
let visuals=false;
let neighbors=[-(wmod+1),-(wmod+2),-(wmod),-1,1,wmod,(wmod+2),(wmod+1)];
let pause=true;

document.addEventListener('keyup', (e)=>{
    //e.preventDefault;
    if(e.key=='p')
        {
            if(pause)
                {ud=true;pause=false;}
            else
                pause=true;
            
        }
    if(e.key=='r')
    {
        pixels=[];
        ud=false;
        background(143, 143, 143);
        //draw pixels(black)
        //frameRate(2);
        let run = true;
        let x=0;
        let y=0;
        let f=0;
        
        fill(f)
        while(run)
        {
            
            rect(x,y,pixelwidth,pixelheight); 
            pixels.push({x:x,y:y,state:false})
            if(x<width)
                x=x+pixelwidth;
            else{
                y=y+pixelheight;
                x=0;
            }
            
            if(x>=width&&y>=height)
                run=false;
            
            
        }
    }

    if(e.key=='x')
        drawAnX(70);
    if(e.key=='t')
        drawAnt(70);
    if(e.key=='l')
        audiosetup();
    if(e.key=='m')
        audio.play();
    if(e.key=='v')
        visuals=!visuals;
    
    
});

function setup() {
    createCanvas(width, height);
    background(143, 143, 143);
    //draw pixels(black)
    //frameRate(2);
    let run = true;
    let x=0;
    let y=0;
    let f=0;
    
    fill(f)
    while(run)
    {
        
        rect(x,y,pixelwidth,pixelheight); 
        pixels.push({x:x,y:y,state:false})
        if(x<width)
            x=x+pixelwidth;
        else{
            y=y+pixelheight;
            x=0;
        }
        
        if(x>=width&&y>=height)
            run=false;
        
        
    }
    console.log(pixels.length)
    
    

}

function draw() {
    //get mouse press and update pixel to white
    
    
    //also...
    //do logic for updating necessary pixels
    //f=8

    if(!pause&&ud)
    {   
        let create=[];
        let destroy=[];
        pixels.forEach((element,i)=>{
            let aliveNeighbors=0;
            neighbors.forEach((neighbor)=>{
                if(i+neighbor>=0&&i+neighbor<pixels.length-1)
                {

                    if(pixels[i+neighbor].state)
                        aliveNeighbors=aliveNeighbors+1;

                }

            })

            if(element.state)
            {
                if(aliveNeighbors<2)
                {
                    destroy.push(i)
                }
                if(aliveNeighbors>3)
                {
                    destroy.push(i)
                }


            }else{
                if(aliveNeighbors==3)
                {
                    create.push(i);
                }
            }
        })

        create.forEach((e)=>{
            pixels[e].state=true;
            fill(255)
            rect(pixels[e].x,pixels[e].y,pixelwidth,pixelheight)
        })
        destroy.forEach((e)=>{
            pixels[e].state=false;
            fill(0)
            rect(pixels[e].x,pixels[e].y,pixelwidth,pixelheight)
        })
        ud=false;
        setTimeout(_=>{ud=true;},20)
        
    }
    
    


    if(mouseIsPressed)
    {
        if(!limitClicks)
        {
            //get xy and apply correct pixel
            let index=(Math.floor((mouseY/pixelheight))*(wmod+1))+Math.floor(mouseX/pixelwidth);
            if(index>=0&&index<pixels.length){
                limitClicks=true;            
                if(pixels[index].state==false)
                    {pixels[index].state=true;fill(255)}
                else
                    {pixels[index].state=false;fill(0)}
                rect(pixels[index].x,pixels[index].y,pixelwidth,pixelheight)
                setTimeout(_=>{limitClicks=false},200)
            }

            
        }



    }

    if(visuals)
        visualize();

      
}



function drawAnX(size)
{
        //begin excess
        let mid=pixels.length/2;
        pixels[mid].state=true;
        fill(255);
        rect(pixels[mid].x,pixels[mid].y,pixelwidth,pixelheight)
        
        for(let i = 1;i<size;i++)
        {
            fill(255);
            pixels[mid-(wmod*i)].state=true;
            pixels[mid-((wmod+2)*i)].state=true;
            rect(pixels[mid-(wmod*i)].x,pixels[mid-(wmod*i)].y,pixelwidth,pixelheight);
            rect(pixels[mid-((wmod+2)*i)].x,pixels[mid-((wmod+2)*i)].y,pixelwidth,pixelheight);
            pixels[mid+(wmod*i)].state=true;
            pixels[mid+((wmod+2)*i)].state=true;
            rect(pixels[mid+(wmod*i)].x,pixels[mid+(wmod*i)].y,pixelwidth,pixelheight);
            rect(pixels[mid+((wmod+2)*i)].x,pixels[mid+((wmod+2)*i)].y,pixelwidth,pixelheight);
    
        }
}

function drawAnt(size)
{
    let mid=pixels.length/2;
    pixels[mid].state=true;
    fill(255);
    rect(pixels[mid].x,pixels[mid].y,pixelwidth,pixelheight)
    
    for(let i = 1;i<size;i++)
    {
        fill(255);
        pixels[mid-i].state=true;
        pixels[mid-((wmod+1)*i)].state=true;
        rect(pixels[mid-i].x,pixels[mid-i].y,pixelwidth,pixelheight);
        rect(pixels[mid-((wmod+1)*i)].x,pixels[mid-((wmod+1)*i)].y,pixelwidth,pixelheight);
        pixels[mid+i].state=true;
        pixels[mid+((wmod+1)*i)].state=true;
        rect(pixels[mid+i].x,pixels[mid+i].y,pixelwidth,pixelheight);
        rect(pixels[mid+((wmod+1)*i)].x,pixels[mid+((wmod+1)*i)].y,pixelwidth,pixelheight);

    }
}

function visualize()
{
    analyser.getByteFrequencyData(freqData);
    drawAnt(freqData[10]*.25);
    drawAnX(freqData[25]*.25);
}

alert("hi and welcome! here is a breakdown of the controlls. \nclick around to draw\n press P to start and pause\npress x to draw and X\npress t to draw a t\npress l then m and finally v after interacting with the page to start a music visualizer.\nthis will be later updated with some helpful buttons, but works for now.")
