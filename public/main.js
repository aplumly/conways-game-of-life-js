

let song=1;
let number_of_songs=6;

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
    audio.addEventListener("ended", function(){
        if(song>=number_of_songs)
            song=0;
        audio.currentTime = 0;
        console.log("ended");
        document.getElementById("audioBitRate").src=`./public/${++song}.mp3`
        audio.load();
        audio.play();
   });

}


let wmod=((128*2)*2);
let hmod=((72*2)*2);

let width = window.innerWidth;
let height = window.innerHeight;
let pixelwidth = width/wmod;
let pixelheight = height/hmod;
let pixels = [];
let limitClicks=false;
let ud=false
let visuals=false;
let neighbors=[-(wmod+1),-(wmod-1),-(wmod),-1,1,wmod,(wmod-1),(wmod+1)];
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
        setgrid();
    }

    if(e.key=='x')
        drawAnX(70);
    if(e.key=='t')
        drawAnt(70);
    if(e.key=='l')
        audiosetup();
    if(e.key=='m')
    {   if(audio.paused)
            audio.play();
        else
            audio.pause();
    }
    if(e.key=='v')
        visuals=!visuals;
    
    
});

function setup() {
    createCanvas(width, height);

    setgrid();
    

}

function draw() {


    conway();
    
    

    processClicks();


    if(visuals)
        visualize();

      
}



function conway()
{
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
}


function processClicks()
{
    if(mouseIsPressed)
    {
        if(!limitClicks)
        {
            //get xy and apply correct pixel
            let index=(Math.floor((mouseY/pixelheight))*(wmod))+Math.floor(mouseX/pixelwidth);
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
}


function drawAnX(size)
{
        
        let mid=Math.round(pixels.length/2);
        pixels[mid].state=true;
        fill(255);
        rect(pixels[mid].x,pixels[mid].y,pixelwidth,pixelheight)
        
        for(let i = 1;i<size;i++)
        {
            fill(255);
            pixels[mid-((wmod-1)*i)].state=true;
            pixels[mid-((wmod+1)*i)].state=true;
            rect(pixels[mid-((wmod-1)*i)].x,pixels[mid-((wmod-1)*i)].y,pixelwidth,pixelheight);
            rect(pixels[mid-((wmod+1)*i)].x,pixels[mid-((wmod+1)*i)].y,pixelwidth,pixelheight);
            pixels[mid+((wmod-1)*i)].state=true;
            pixels[mid+((wmod+1)*i)].state=true;
            rect(pixels[mid+((wmod-1)*i)].x,pixels[mid+((wmod-1)*i)].y,pixelwidth,pixelheight);
            rect(pixels[mid+((wmod+1)*i)].x,pixels[mid+((wmod+1)*i)].y,pixelwidth,pixelheight);
    
        }
}

function drawAnt(size)
{
    let mid=Math.round(pixels.length/2);
    pixels[mid].state=true;
    fill(255);
    rect(pixels[mid].x,pixels[mid].y,pixelwidth,pixelheight)
    
    for(let i = 1;i<size;i++)
    {
        fill(255);
        pixels[mid-i].state=true;
        pixels[mid-((wmod)*i)].state=true;
        rect(pixels[mid-i].x,pixels[mid-i].y,pixelwidth,pixelheight);
        rect(pixels[mid-((wmod)*i)].x,pixels[mid-((wmod+1)*i)].y,pixelwidth,pixelheight);
        pixels[mid+i].state=true;
        pixels[mid+((wmod)*i)].state=true;
        rect(pixels[mid+i].x,pixels[mid+i].y,pixelwidth,pixelheight);
        rect(pixels[mid+((wmod)*i)].x,pixels[mid+((wmod+1)*i)].y,pixelwidth,pixelheight);

    }
}


function setgrid()
{
    pixels=[];
    background(143, 143, 143);
    //draw pixels(black)
    //frameRate(2);
    let run = true;
    let x=0;
    let y=0;
    let f=0;
    let rowcount=0;
    let xcount=0;
    fill(f)
    while(run)
    {
        
        rect(x,y,pixelwidth,pixelheight); 
        pixels.push({x:x,y:y,state:false})
        xcount++;
        if(xcount<wmod)
            x=x+pixelwidth;
        else{
            y=y+pixelheight;
            x=0;
            xcount=0;
            rowcount++;
        }
        
        if(rowcount>hmod)
            run=false;
        
        
    }
    console.log(pixels.length)
}


function visualize()
{
    analyser.getByteFrequencyData(freqData);
    drawAnt(freqData[40]*.25);
    drawAnX(freqData[10]*.25);
}

alert("hi and welcome! here is a breakdown of the controls. \nclick around to draw\n press P to start and pause\npress x to draw and X\npress t to draw a t\npress l then m and finally v after interacting with the page to start a music visualizer. remember to press p if the canvas isn't animating :)\nthis will be updated later with some helpful buttons, but works for now.")
