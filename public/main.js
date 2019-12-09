

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
let neighbors=[-(wmod+1),-(wmod),-(wmod-1),-1,1,wmod,(wmod-1),(wmod+1)];
let animate=0;
let rule=1;
let wra=0;
let wrb=0;
let mnca_index=0;
let frameCount=0;
document.addEventListener('keyup', (e)=>{
    //e.preventDefault;
    if(e.key=='p')
        {
            if(animate)
                animate=0;
            else
                animate=1;
            
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
    
    if(keyCode>=0x30&&keyCode<=0x39)
        rule=keyCode-0x30;
    
});

function setup() {
    createCanvas(width, height);

    setgrid();
    // pixels[5000].state=true;
    // fill(255)
    // rect(pixels[5000].x,pixels[5000].y,pixelwidth,pixelheight)
}

function draw() {
    //++frameCount
    switch(rule*animate)
    {
        case 1: conway();
        break;
        case 2: wra=1;wrb=4;rule=30;
        break;
        case 3: wra=1;wrb=6;rule=30;
        break;
        case 4: alert("enter a custom wolfram value. let a be < b and in range of 1 to 7")
            wra = prompt("enter value a");wrb=prompt("enter value b");rule=30;
        break;
        case 5:kindaconway();
        break;
        case 6: mnca409();
        break;
        case 7: mnca130();
        break;
        case 30:wolframRule(wra,wrb);
        break;
        default:
        break;
    }

    
    

    processClicks();


    if(visuals)
        visualize();

      
}



function conway()
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

        
    
}


function kindaconway()
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
            if(aliveNeighbors>=3)
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
}


function mnca409()
{   
    let create=[];
    let destroy=[];
    for(let i=0;i<pixels.length;i++)
    {
        mnca_index=i;
        let outval=pixels[i].state;
        let nhd0=cv(-14,-1)+cv(-14,0)+cv(-14,1)+cv(-13,-4)+cv(-13,-3)+cv(-13,-2)+cv(-13,2)+cv(-13,3)+cv(-13,4)+cv(-12,-6)+cv(-12,-5)+cv(-12,5)+cv(-12,6)+cv(-11,-8)+cv(-11,-7)+cv(-11,7)+cv(-11,8)+cv(-10,-9)+cv(-10,-1)+cv(-10,0)+cv(-10,1)+cv(-10,9)+cv(-9,-10)+cv(-9,-4)+cv(-9,-3)+cv(-9,-2)+cv(-9,2)+cv(-9,3)+cv(-9,4)+cv(-9,10)+cv(-8,-11)+cv(-8,-6)+cv(-8,-5)+cv(-8,5)+cv(-8,6)+cv(-8,11)+cv(-7,-11)+cv(-7,-7)+cv(-7,-2)+cv(-7,-1)+cv(-7,0)+cv(-7,1)+cv(-7,2)+cv(-7,7)+cv(-7,11)+cv(-6,-12)+cv(-6,-8)+cv(-6,-4)+cv(-6,-3)+cv(-6,3)+cv(-6,4)+cv(-6,8)+cv(-6,12)+cv(-5,-12)+cv(-5,-8)+cv(-5,-5)+cv(-5,-1)+cv(-5,0)+cv(-5,1)+cv(-5,5);
        let nhd1=cv(-5,8)+cv(-5,12)+cv(-4,-13)+cv(-4,-9)+cv(-4,-6)+cv(-4,-3)+cv(-4,-2)+cv(-4,2)+cv(-4,3)+cv(-4,6)+cv(-4,9)+cv(-4,13)+cv(-3,-13)+cv(-3,-9)+cv(-3,-6)+cv(-3,-4)+cv(-3,-1)+cv(-3,0)+cv(-3,1)+cv(-3,4)+cv(-3,6)+cv(-3,9)+cv(-3,13)+cv(-2,-13)+cv(-2,-9)+cv(-2,-7)+cv(-2,-4)+cv(-2,-2)+cv(-2,2)+cv(-2,4)+cv(-2,7)+cv(-2,9)+cv(-2,13)+cv(-1,-14)+cv(-1,-10)+cv(-1,-7)+cv(-1,-5)+cv(-1,-3)+cv(-1,-1)+cv(-1,0)+cv(-1,1)+cv(-1,3)+cv(-1,5)+cv(-1,7)+cv(-1,10)+cv(-1,14)+cv(0,-14)+cv(0,-10)+cv(0,-7)+cv(0,-5)+cv(0,-3)+cv(0,-1)+cv(0,1)+cv(0,3)+cv(0,5)+cv(0,7)+cv(0,10)+cv(0,14)+cv(1,-14)+cv(1,-10)+cv(1,-7);
        let nhd2=cv(1,-5)+cv(1,-3)+cv(1,-1)+cv(1,0)+cv(1,1)+cv(1,3)+cv(1,5)+cv(1,7)+cv(1,10)+cv(1,14)+cv(2,-13)+cv(2,-9)+cv(2,-7)+cv(2,-4)+cv(2,-2)+cv(2,2)+cv(2,4)+cv(2,7)+cv(2,9)+cv(2,13)+cv(3,-13)+cv(3,-9)+cv(3,-6)+cv(3,-4)+cv(3,-1)+cv(3,0)+cv(3,1)+cv(3,4)+cv(3,6)+cv(3,9)+cv(3,13)+cv(4,-13)+cv(4,-9)+cv(4,-6)+cv(4,-3)+cv(4,-2)+cv(4,2)+cv(4,3)+cv(4,6)+cv(4,9)+cv(4,13)+cv(5,-12)+cv(5,-8)+cv(5,-5)+cv(5,-1)+cv(5,0)+cv(5,1)+cv(5,5)+cv(5,8)+cv(5,12)+cv(6,-12)+cv(6,-8)+cv(6,-4)+cv(6,-3)+cv(6,3)+cv(6,4)+cv(6,8)+cv(6,12)+cv(7,-11)+cv(7,-7)+cv(7,-2);
        let nhd3=cv(7,-1)+cv(7,0)+cv(7,1)+cv(7,2)+cv(7,7)+cv(7,11)+cv(8,-11)+cv(8,-6)+cv(8,-5)+cv(8,5)+cv(8,6)+cv(8,11)+cv(9,-10)+cv(9,-4)+cv(9,-3)+cv(9,-2)+cv(9,2)+cv(9,3)+cv(9,4)+cv(9,10)+cv(10,-9)+cv(10,-1)+cv(10,0)+cv(10,1)+cv(10,9)+cv(11,-8)+cv(11,-7)+cv(11,7)+cv(11,8)+cv(12,-6)+cv(12,-5)+cv(12,5)+cv(12,6)+cv(13,-4)+cv(13,-3)+cv(13,-2)+cv(13,2)+cv(13,3)+cv(13,4)+cv(14,-1)+cv(14,0)+cv(14,1);
        let fin_0=nhd0+nhd1+nhd2+nhd3;
        if(fin_0>=86&&fin_0<=110){
            outval=1;
        }
        if(fin_0>=123){
            outval=0;
        }
        if(fin_0>=51&&fin_0<=62){
            outval=0;
        }
        if(fin_0>=67&&fin_0<=78){
            outval=0;
        }
        if(fin_0>=27&&fin_0<=31){
            outval=1;
        }

        if(outval==1&&!pixels[i].state)
         create.push(i);
        if(outval==0&&pixels[i].state) 
         destroy.push(i);
    }


    for(let i=0;i<create.length;i++)
    {
        pixels[create[i]].state=true;
        fill(255)
        rect(pixels[create[i]].x,pixels[create[i]].y,pixelwidth,pixelheight)
    }

    for(let i=0;i<destroy.length;i++)
    {
        pixels[destroy[i]].state=false;
        fill(0)
        rect(pixels[destroy[i]].x,pixels[destroy[i]].y,pixelwidth,pixelheight)
    }
}

function mnca130()
{   
    let create=[];
    let destroy=[];
    for(let i=0;i<pixels.length;i++)
    {
        mnca_index=i;
        let outval=pixels[i].state;
        let nhd0=cv(-6,-1)+cv(-6,0)+cv(-6,1)+cv(-5,-3)+cv(-5,-2)+cv(-5,2)+cv(-5,3)+cv(-4,-4)+cv(-4,4)+cv(-3,-5)+cv(-3,-2)+cv(-3,-1)+cv(-3,0)+cv(-3,1)+cv(-3,2)+cv(-3,5)+cv(-2,-5)+cv(-2,-3)+cv(-2,3)+cv(-2,5)+cv(-1,-6)+cv(-1,-3)+cv(-1,-1)+cv(-1,0)+cv(-1,1)+cv(-1,3)+cv(-1,6)+cv(0,-6)+cv(0,-3)+cv(0,-1)+cv(0,1)+cv(0,3)+cv(0,6)+cv(1,-6)+cv(1,-3)+cv(1,-1)+cv(1,0)+cv(1,1)+cv(1,3)+cv(1,6)+cv(2,-5)+cv(2,-3)+cv(2,3)+cv(2,5)+cv(3,-5)+cv(3,-2)+cv(3,-1)+cv(3,0)+cv(3,1)+cv(3,2)+cv(3,5)+cv(4,-4)+cv(4,4)+cv(5,-3)+cv(5,-2)+cv(5,2)+cv(5,3)+cv(6,-1)+cv(6,0)+cv(6,1);
        let nhd1=cv(-20,-2)+cv(-20,-1)+cv(-20,0)+cv(-20,1)+cv(-20,2)+cv(-19,-5)+cv(-19,-4)+cv(-19,-3)+cv(-19,3)+cv(-19,4)+cv(-19,5)+cv(-18,-8)+cv(-18,-7)+cv(-18,-6)+cv(-18,6)+cv(-18,7)+cv(-18,8)+cv(-17,-10)+cv(-17,-9)+cv(-17,9)+cv(-17,10)+cv(-16,-12)+cv(-16,-11)+cv(-16,11)+cv(-16,12)+cv(-15,-13)+cv(-15,-2)+cv(-15,-1)+cv(-15,0)+cv(-15,1)+cv(-15,2)+cv(-15,13)+cv(-14,-14)+cv(-14,-5)+cv(-14,-4)+cv(-14,-3)+cv(-14,3)+cv(-14,4)+cv(-14,5)+cv(-14,14)+cv(-13,-15)+cv(-13,-7)+cv(-13,-6)+cv(-13,6)+cv(-13,7)+cv(-13,15)+cv(-12,-16)+cv(-12,-9)+cv(-12,-8)+cv(-12,8)+cv(-12,9)+cv(-12,16)+cv(-11,-16)+cv(-11,-10)+cv(-11,-3)+cv(-11,-2)+cv(-11,-1)+cv(-11,0)+cv(-11,1)+cv(-11,2)+cv(-11,3)+cv(-11,10)+cv(-11,16)+cv(-10,-17)+cv(-10,-11)+cv(-10,-5)+cv(-10,-4)+cv(-10,-3)+cv(-10,-2)+cv(-10,2)+cv(-10,3)+cv(-10,4)+cv(-10,5)+cv(-10,11)+cv(-10,17)+cv(-9,-17)+cv(-9,-12)+cv(-9,-7)+cv(-9,-6)+cv(-9,-5)+cv(-9,5)+cv(-9,6)+cv(-9,7)+cv(-9,12)+cv(-9,17)+cv(-8,-18)+cv(-8,-12)+cv(-8,-8)+cv(-8,-7)+cv(-8,7)+cv(-8,8)+cv(-8,12)+cv(-8,18)+cv(-7,-18)+cv(-7,-13)+cv(-7,-9)+cv(-7,-8)+cv(-7,-1)+cv(-7,0)+cv(-7,1)+cv(-7,8)+cv(-7,9)+cv(-7,13)+cv(-7,18)+cv(-6,-18)+cv(-6,-13)+cv(-6,-9)+cv(-6,-3)+cv(-6,-2)+cv(-6,-1)+cv(-6,0)+cv(-6,1)+cv(-6,2)+cv(-6,3)+cv(-6,9)+cv(-6,13)+cv(-6,18)+cv(-5,-19)+cv(-5,-14)+cv(-5,-10)+cv(-5,-9)+cv(-5,-5)+cv(-5,-4)+cv(-5,-3)+cv(-5,-2)+cv(-5,2)+cv(-5,3)+cv(-5,4)+cv(-5,5)+cv(-5,9)+cv(-5,10)+cv(-5,14)+cv(-5,19)+cv(-4,-19)+cv(-4,-14)+cv(-4,-10)+cv(-4,-5)+cv(-4,-4)+cv(-4,4)+cv(-4,5)+cv(-4,10)+cv(-4,14)+cv(-4,19)+cv(-3,-19)+cv(-3,-14)+cv(-3,-11)+cv(-3,-10)+cv(-3,-6)+cv(-3,-5)+cv(-3,5)+cv(-3,6)+cv(-3,10)+cv(-3,11)+cv(-3,14)+cv(-3,19)+cv(-2,-20)+cv(-2,-15)+cv(-2,-11)+cv(-2,-10)+cv(-2,-6)+cv(-2,-5)+cv(-2,-2)+cv(-2,-1)+cv(-2,0)+cv(-2,1)+cv(-2,2)+cv(-2,5)+cv(-2,6)+cv(-2,10)+cv(-2,11)+cv(-2,15)+cv(-2,20)+cv(-1,-20)+cv(-1,-15)+cv(-1,-11)+cv(-1,-7)+cv(-1,-6)+cv(-1,-2)+cv(-1,-1)+cv(-1,0)+cv(-1,1)+cv(-1,2)+cv(-1,6)+cv(-1,7)+cv(-1,11)+cv(-1,15)+cv(-1,20)+cv(0,-20)+cv(0,-15)+cv(0,-11)+cv(0,-7);
        let nhd2=cv(0,-6)+cv(0,-2)+cv(0,-1)+cv(0,1)+cv(0,2)+cv(0,6)+cv(0,7)+cv(0,11)+cv(0,15)+cv(0,20)+cv(1,-20)+cv(1,-15)+cv(1,-11)+cv(1,-7)+cv(1,-6)+cv(1,-2)+cv(1,-1)+cv(1,0)+cv(1,1)+cv(1,2)+cv(1,6)+cv(1,7)+cv(1,11)+cv(1,15)+cv(1,20)+cv(2,-20)+cv(2,-15)+cv(2,-11)+cv(2,-10)+cv(2,-6)+cv(2,-5)+cv(2,-2)+cv(2,-1)+cv(2,0)+cv(2,1)+cv(2,2)+cv(2,5)+cv(2,6)+cv(2,10)+cv(2,11)+cv(2,15)+cv(2,20)+cv(3,-19)+cv(3,-14)+cv(3,-11)+cv(3,-10)+cv(3,-6)+cv(3,-5)+cv(3,5)+cv(3,6)+cv(3,10)+cv(3,11)+cv(3,14)+cv(3,19)+cv(4,-19)+cv(4,-14)+cv(4,-10)+cv(4,-5)+cv(4,-4)+cv(4,4)+cv(4,5)+cv(4,10)+cv(4,14)+cv(4,19)+cv(5,-19)+cv(5,-14)+cv(5,-10)+cv(5,-9)+cv(5,-5)+cv(5,-4)+cv(5,-3)+cv(5,-2)+cv(5,2)+cv(5,3)+cv(5,4)+cv(5,5)+cv(5,9)+cv(5,10)+cv(5,14)+cv(5,19)+cv(6,-18)+cv(6,-13)+cv(6,-9)+cv(6,-3)+cv(6,-2)+cv(6,-1)+cv(6,0)+cv(6,1)+cv(6,2)+cv(6,3)+cv(6,9)+cv(6,13)+cv(6,18)+cv(7,-18)+cv(7,-13)+cv(7,-9)+cv(7,-8)+cv(7,-1)+cv(7,0)+cv(7,1)+cv(7,8)+cv(7,9)+cv(7,13)+cv(7,18)+cv(8,-18)+cv(8,-12)+cv(8,-8)+cv(8,-7)+cv(8,7)+cv(8,8)+cv(8,12)+cv(8,18)+cv(9,-17)+cv(9,-12)+cv(9,-7)+cv(9,-6)+cv(9,-5)+cv(9,5)+cv(9,6)+cv(9,7)+cv(9,12)+cv(9,17)+cv(10,-17)+cv(10,-11)+cv(10,-5)+cv(10,-4)+cv(10,-3)+cv(10,-2)+cv(10,2)+cv(10,3)+cv(10,4)+cv(10,5)+cv(10,11)+cv(10,17)+cv(11,-16)+cv(11,-10)+cv(11,-3)+cv(11,-2)+cv(11,-1)+cv(11,0)+cv(11,1)+cv(11,2)+cv(11,3)+cv(11,10)+cv(11,16)+cv(12,-16)+cv(12,-9)+cv(12,-8)+cv(12,8)+cv(12,9)+cv(12,16)+cv(13,-15)+cv(13,-7)+cv(13,-6)+cv(13,6)+cv(13,7)+cv(13,15)+cv(14,-14)+cv(14,-5)+cv(14,-4)+cv(14,-3)+cv(14,3)+cv(14,4)+cv(14,5)+cv(14,14)+cv(15,-13)+cv(15,-2)+cv(15,-1)+cv(15,0)+cv(15,1)+cv(15,2)+cv(15,13)+cv(16,-12)+cv(16,-11)+cv(16,11)+cv(16,12)+cv(17,-10)+cv(17,-9)+cv(17,9)+cv(17,10)+cv(18,-8)+cv(18,-7)+cv(18,-6)+cv(18,6)+cv(18,7)+cv(18,8)+cv(19,-5)+cv(19,-4)+cv(19,-3)+cv(19,3)+cv(19,4)+cv(19,5)+cv(20,-2)+cv(20,-1)+cv(20,0)+cv(20,1)+cv(20,2);
        let fin_0=nhd0;
        let fin_1=nhd1+nhd2;
        if(fin_0>=28&&fin_0<=35){
            outval=1;
        }
        if(fin_0<=25){
            outval=0;
        }
        if(fin_0>=41&&fin_0<=46){
            outval=0;
        }
        if(fin_1>=290){
            outval=0;
        }
        if(fin_1>=180&&fin_1<=280){
            outval=1;
        }
        if(fin_1>=210&&fin_1<=270){
            outval=1;
        }
        if(fin_1==89){
            outval=1;
        }
        if(fin_1>=69&&fin_1<=74){
            outval=1;
        }
        if(fin_1>=310){
            outval=0;
        }

        if(outval==1&&!pixels[i].state)
         create.push(i);
        if(outval==0&&pixels[i].state) 
         destroy.push(i);
    }


    for(let i=0;i<create.length;i++)
    {
        pixels[create[i]].state=true;
        fill(255)
        rect(pixels[create[i]].x,pixels[create[i]].y,pixelwidth,pixelheight)
    }

    for(let i=0;i<destroy.length;i++)
    {
        pixels[destroy[i]].state=false;
        fill(0)
        rect(pixels[destroy[i]].x,pixels[destroy[i]].y,pixelwidth,pixelheight)
    }
}

function cv(fx,fy)
{
    
    return mnca_index+((wmod*fy)+fx) >=0&&mnca_index+((wmod*fy)+fx)<pixels.length ? pixels[mnca_index+((wmod*fy)+fx)].state : 0;
}


function wolframRule(a,b)
{

 
            let create=[];
            let destroy=[];
            pixels.forEach((element,i)=>{
                let neighborsAsBinary=""
                if(!element.state){
                    for(let n=0;n<3;n++)
                    {
                        neighbor = neighbors[n];
                        if(i+neighbor>=0&&i+neighbor<pixels.length-1)
                        {
        
                            if(pixels[i+neighbor].state)
                                neighborsAsBinary=neighborsAsBinary+"1"
                            else
                                neighborsAsBinary=neighborsAsBinary+"0"
        
                        }
                    }
                    let neighborsAsInteger= parseInt(neighborsAsBinary, 2);
                        
                    if(neighborsAsInteger>=a&&neighborsAsInteger<=b)
                        create.push(i);
                }


    
                
            })

            create.forEach((e)=>{
                pixels[e].state=true;
                fill(255)
                rect(pixels[e].x,pixels[e].y,pixelwidth,pixelheight)
            })


            
        
    



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

alert("hi and welcome! here is a breakdown of the controls. \nclick around to draw\n press P to start and pause\npress x to draw and X\npress t to draw a t\npress l then m and finally v after interacting with the page to start a music visualizer. remember to press p if the canvas isn't animating :)\nnew:press 1-4 to change things up\nthis will be updated later with some helpful buttons, but works for now.")
