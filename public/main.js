



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

let frameCount=0;

let customConway={create:"",destroy:""};

let mncaObj409={"nhd0":[-526,-14,498,-2061,-1549,-1037,1011,1523,2035,-3084,-2572,2548,3060,-4107,-3595,3573,4085,-4618,-522,-10,502,4598,-5129,-2057,-1545,-1033,1015,1527,2039,5111,-5640,-3080,-2568,2552,3064,5624,-5639,-3591,-1031,-519,-7,505,1017,3577,5625,-6150,-4102,-2054,-1542,1530,2042,4090,6138,-6149,-4101,-2565,-517,-5,507,2555],"nhd1":[4091,6139,-6660,-4612,-3076,-1540,-1028,1020,1532,3068,4604,6652,-6659,-4611,-3075,-2051,-515,-3,509,2045,3069,4605,6653,-6658,-4610,-3586,-2050,-1026,1022,2046,3582,4606,6654,-7169,-5121,-3585,-2561,-1537,-513,-1,511,1535,2559,3583,5119,7167,-7168,-5120,-3584,-2560,-1536,-512,512,1536,2560,3584,5120,7168,-7167,-5119,-3583],"nhd2":[-2559,-1535,-511,1,513,1537,2561,3585,5121,7169,-6654,-4606,-3582,-2046,-1022,1026,2050,3586,4610,6658,-6653,-4605,-3069,-2045,-509,3,515,2051,3075,4611,6659,-6652,-4604,-3068,-1532,-1020,1028,1540,3076,4612,6660,-6139,-4091,-2555,-507,5,517,2565,4101,6149,-6138,-4090,-2042,-1530,1542,2054,4102,6150,-5625,-3577,-1017],"nhd3":[-505,7,519,1031,3591,5639,-5624,-3064,-2552,2568,3080,5640,-5111,-2039,-1527,-1015,1033,1545,2057,5129,-4598,-502,10,522,4618,-4085,-3573,3595,4107,-3060,-2548,2572,3084,-2035,-1523,-1011,1037,1549,2061,-498,14,526],"nhd4":[]}
let mncaObj130={"nhd0":[-518,-6,506,-1541,-1029,1019,1531,-2052,2044,-2563,-1027,-515,-3,509,1021,2557,-2562,-1538,1534,2558,-3073,-1537,-513,-1,511,1535,3071,-3072,-1536,-512,512,1536,3072,-3071,-1535,-511,1,513,1537,3073,-2558,-1534,1538,2562,-2557,-1021,-509,3,515,1027,2563,-2044,2052,-1531,-1019,1029,1541,-506,6,518],"nhd1":[-1044,-532,-20,492,1004,-2579,-2067,-1555,1517,2029,2541,-4114,-3602,-3090,3054,3566,4078,-5137,-4625,4591,5103,-6160,-5648,5616,6128,-6671,-1039,-527,-15,497,1009,6641,-7182,-2574,-2062,-1550,1522,2034,2546,7154,-7693,-3597,-3085,3059,3571,7667,-8204,-4620,-4108,4084,4596,8180,-8203,-5131,-1547,-1035,-523,-11,501,1013,1525,5109,8181,-8714,-5642,-2570,-2058,-1546,-1034,1014,1526,2038,2550,5622,8694,-8713,-6153,-3593,-3081,-2569,2551,3063,3575,6135,8695,-9224,-6152,-4104,-3592,3576,4088,6136,9208,-9223,-6663,-4615,-4103,-519,-7,505,4089,4601,6649,9209,-9222,-6662,-4614,-1542,-1030,-518,-6,506,1018,1530,4602,6650,9210,-9733,-7173,-5125,-4613,-2565,-2053,-1541,-1029,1019,1531,2043,2555,4603,5115,7163,9723,-9732,-7172,-5124,-2564,-2052,2044,2556,5116,7164,9724,-9731,-7171,-5635,-5123,-3075,-2563,2557,3069,5117,5629,7165,9725,-10242,-7682,-5634,-5122,-3074,-2562,-1026,-514,-2,510,1022,2558,3070,5118,5630,7678,10238,-10241,-7681,-5633,-3585,-3073,-1025,-513,-1,511,1023,3071,3583,5631,7679,10239,-10240,-7680,-5632,-3584],"nhd2":[-3072,-1024,-512,512,1024,3072,3584,5632,7680,10240,-10239,-7679,-5631,-3583,-3071,-1023,-511,1,513,1025,3073,3585,5633,7681,10241,-10238,-7678,-5630,-5118,-3070,-2558,-1022,-510,2,514,1026,2562,3074,5122,5634,7682,10242,-9725,-7165,-5629,-5117,-3069,-2557,2563,3075,5123,5635,7171,9731,-9724,-7164,-5116,-2556,-2044,2052,2564,5124,7172,9732,-9723,-7163,-5115,-4603,-2555,-2043,-1531,-1019,1029,1541,2053,2565,4613,5125,7173,9733,-9210,-6650,-4602,-1530,-1018,-506,6,518,1030,1542,4614,6662,9222,-9209,-6649,-4601,-4089,-505,7,519,4103,4615,6663,9223,-9208,-6136,-4088,-3576,3592,4104,6152,9224,-8695,-6135,-3575,-3063,-2551,2569,3081,3593,6153,8713,-8694,-5622,-2550,-2038,-1526,-1014,1034,1546,2058,2570,5642,8714,-8181,-5109,-1525,-1013,-501,11,523,1035,1547,5131,8203,-8180,-4596,-4084,4108,4620,8204,-7667,-3571,-3059,3085,3597,7693,-7154,-2546,-2034,-1522,1550,2062,2574,7182,-6641,-1009,-497,15,527,1039,6671,-6128,-5616,5648,6160,-5103,-4591,4625,5137,-4078,-3566,-3054,3090,3602,4114,-2541,-2029,-1517,1555,2067,2579,-1004,-492,20,532,1044],"nhd3":[],"nhd4":[]}

//let mnca_index=0;
// let mncaObj={}
// nhd=0;
// mncaObj.nhd0=[];
// mncaObj.nhd1=[];
// mncaObj.nhd2=[];
// mncaObj.nhd3=[];
// mncaObj.nhd4=[];

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
    
    if(e.key=='b')
        rule=10;
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
        case 8:crule04();
        break;
        case 9:alert("enter a custom conway rule.")

            customConway.create=eval(prompt("enter a creation rule: use a valid js or es 6 function which returns a boolean value.\n the function should take in a value n specifying the number of alive neighbors for the specified cell.\n example: (n)=>{return n<2||n>3}  "));
            customConway.destroy=eval(prompt("enter a destruction rule: "));


            rule=13;
        break;
        case 10: 
            //flip coin for for 0 to 8
            let c='';
            let d='';
            for(let i=0;i<9;i++)
            {
                if(Math.floor(Math.random()*2)==1){
                    if(c=='')
                    {
                        c=c+`n==${i}`;
                    }else
                    {
                        c=c+`||n==${i}`;
                    }
                }
            }
            for(let i=0;i<9;i++)
            {
                if(Math.floor(Math.random()*2)==1){
                    if(d=='')
                    {
                        d=d+`n==${i}`;
                    }else
                    {
                        d=d+`||n==${i}`;
                    }
                }
            }

            
            customConway.create=eval(`(n)=>{return ${c}}`)
            customConway.destroy=eval(`(n)=>{return ${d}}`)
            rule=13;
        break;
        case 13:variableConway(customConway);
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


function crule04()
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
            if(aliveNeighbors==0)
            {
                destroy.push(i)
            }
            if(aliveNeighbors==4)
            {
                destroy.push(i)
            }


        }else{
            if(aliveNeighbors==1)
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


function variableConway(rule)
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
            if((rule.destroy(aliveNeighbors)))
            {
                destroy.push(i)
            }



        }else{
            if((rule.create(aliveNeighbors)))
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
        
        let outval=pixels[i].state;
        let fin_0=0;
        
        mncaObj409.nhd0.forEach((e)=>{
            let t=i+e;
            if(t>=0&&t<pixels.length)
                fin_0=fin_0+pixels[t].state;

        })
        mncaObj409.nhd1.forEach((e)=>{
            let t=i+e;
            if(t>=0&&t<pixels.length)
                fin_0=fin_0+pixels[t].state;

        })
        
        mncaObj409.nhd2.forEach((e)=>{
            let t=i+e;
            if(t>=0&&t<pixels.length)
                fin_0=fin_0+pixels[t].state;
        })
        if(fin_0>=123)
        {
            outval=0;
        }else{
            mncaObj409.nhd3.forEach((e)=>{
                let t=i+e;
                if(t>=0&&t<pixels.length)
                    fin_0=fin_0+pixels[t].state;

            })

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
        //mnca_index=i;
        let fin_0=0;
        let fin_1=0;
        let outval=pixels[i].state;
        mncaObj130.nhd0.forEach((e)=>{
            let t=i+e;
            if(t>=0&&t<pixels.length)
                fin_0=fin_0+pixels[t].state;

        })
        mncaObj130.nhd1.forEach((e)=>{
            let t=i+e;
            if(t>=0&&t<pixels.length)
                fin_1=fin_1+pixels[t].state;

        })
        mncaObj130.nhd2.forEach((e)=>{
            let t=i+e;
            if(t>=0&&t<pixels.length)
                fin_1=fin_1+pixels[t].state;

        })

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

// function cv(fx,fy)
// {
//     switch(nhd)
//     {
//         case 0:mncaObj.nhd0.push((((wmod*fy)+fx)))
//         break;
//         case 1:mncaObj.nhd1.push((((wmod*fy)+fx)))
//         break;
//         case 2:mncaObj.nhd2.push((((wmod*fy)+fx)))
//         break;
//         case 3:mncaObj.nhd3.push((((wmod*fy)+fx)))
//         break;
//         case 4:mncaObj.nhd4.push((((wmod*fy)+fx)))
//         break;
//         default:
//         break;

//     }
//     return mnca_index+((wmod*fy)+fx) >=0&&mnca_index+((wmod*fy)+fx)<pixels.length ? pixels[mnca_index+((wmod*fy)+fx)].state : 0;
// }


// function mcnaArray()
// {
//     mnca_index=50000;
//     switch(nhd)
//     {
//         case 0:let nhd0=cv(-6,-1)+cv(-6,0)+cv(-6,1)+cv(-5,-3)+cv(-5,-2)+cv(-5,2)+cv(-5,3)+cv(-4,-4)+cv(-4,4)+cv(-3,-5)+cv(-3,-2)+cv(-3,-1)+cv(-3,0)+cv(-3,1)+cv(-3,2)+cv(-3,5)+cv(-2,-5)+cv(-2,-3)+cv(-2,3)+cv(-2,5)+cv(-1,-6)+cv(-1,-3)+cv(-1,-1)+cv(-1,0)+cv(-1,1)+cv(-1,3)+cv(-1,6)+cv(0,-6)+cv(0,-3)+cv(0,-1)+cv(0,1)+cv(0,3)+cv(0,6)+cv(1,-6)+cv(1,-3)+cv(1,-1)+cv(1,0)+cv(1,1)+cv(1,3)+cv(1,6)+cv(2,-5)+cv(2,-3)+cv(2,3)+cv(2,5)+cv(3,-5)+cv(3,-2)+cv(3,-1)+cv(3,0)+cv(3,1)+cv(3,2)+cv(3,5)+cv(4,-4)+cv(4,4)+cv(5,-3)+cv(5,-2)+cv(5,2)+cv(5,3)+cv(6,-1)+cv(6,0)+cv(6,1);
//         break;
//         case 1:let nhd1=cv(-20,-2)+cv(-20,-1)+cv(-20,0)+cv(-20,1)+cv(-20,2)+cv(-19,-5)+cv(-19,-4)+cv(-19,-3)+cv(-19,3)+cv(-19,4)+cv(-19,5)+cv(-18,-8)+cv(-18,-7)+cv(-18,-6)+cv(-18,6)+cv(-18,7)+cv(-18,8)+cv(-17,-10)+cv(-17,-9)+cv(-17,9)+cv(-17,10)+cv(-16,-12)+cv(-16,-11)+cv(-16,11)+cv(-16,12)+cv(-15,-13)+cv(-15,-2)+cv(-15,-1)+cv(-15,0)+cv(-15,1)+cv(-15,2)+cv(-15,13)+cv(-14,-14)+cv(-14,-5)+cv(-14,-4)+cv(-14,-3)+cv(-14,3)+cv(-14,4)+cv(-14,5)+cv(-14,14)+cv(-13,-15)+cv(-13,-7)+cv(-13,-6)+cv(-13,6)+cv(-13,7)+cv(-13,15)+cv(-12,-16)+cv(-12,-9)+cv(-12,-8)+cv(-12,8)+cv(-12,9)+cv(-12,16)+cv(-11,-16)+cv(-11,-10)+cv(-11,-3)+cv(-11,-2)+cv(-11,-1)+cv(-11,0)+cv(-11,1)+cv(-11,2)+cv(-11,3)+cv(-11,10)+cv(-11,16)+cv(-10,-17)+cv(-10,-11)+cv(-10,-5)+cv(-10,-4)+cv(-10,-3)+cv(-10,-2)+cv(-10,2)+cv(-10,3)+cv(-10,4)+cv(-10,5)+cv(-10,11)+cv(-10,17)+cv(-9,-17)+cv(-9,-12)+cv(-9,-7)+cv(-9,-6)+cv(-9,-5)+cv(-9,5)+cv(-9,6)+cv(-9,7)+cv(-9,12)+cv(-9,17)+cv(-8,-18)+cv(-8,-12)+cv(-8,-8)+cv(-8,-7)+cv(-8,7)+cv(-8,8)+cv(-8,12)+cv(-8,18)+cv(-7,-18)+cv(-7,-13)+cv(-7,-9)+cv(-7,-8)+cv(-7,-1)+cv(-7,0)+cv(-7,1)+cv(-7,8)+cv(-7,9)+cv(-7,13)+cv(-7,18)+cv(-6,-18)+cv(-6,-13)+cv(-6,-9)+cv(-6,-3)+cv(-6,-2)+cv(-6,-1)+cv(-6,0)+cv(-6,1)+cv(-6,2)+cv(-6,3)+cv(-6,9)+cv(-6,13)+cv(-6,18)+cv(-5,-19)+cv(-5,-14)+cv(-5,-10)+cv(-5,-9)+cv(-5,-5)+cv(-5,-4)+cv(-5,-3)+cv(-5,-2)+cv(-5,2)+cv(-5,3)+cv(-5,4)+cv(-5,5)+cv(-5,9)+cv(-5,10)+cv(-5,14)+cv(-5,19)+cv(-4,-19)+cv(-4,-14)+cv(-4,-10)+cv(-4,-5)+cv(-4,-4)+cv(-4,4)+cv(-4,5)+cv(-4,10)+cv(-4,14)+cv(-4,19)+cv(-3,-19)+cv(-3,-14)+cv(-3,-11)+cv(-3,-10)+cv(-3,-6)+cv(-3,-5)+cv(-3,5)+cv(-3,6)+cv(-3,10)+cv(-3,11)+cv(-3,14)+cv(-3,19)+cv(-2,-20)+cv(-2,-15)+cv(-2,-11)+cv(-2,-10)+cv(-2,-6)+cv(-2,-5)+cv(-2,-2)+cv(-2,-1)+cv(-2,0)+cv(-2,1)+cv(-2,2)+cv(-2,5)+cv(-2,6)+cv(-2,10)+cv(-2,11)+cv(-2,15)+cv(-2,20)+cv(-1,-20)+cv(-1,-15)+cv(-1,-11)+cv(-1,-7)+cv(-1,-6)+cv(-1,-2)+cv(-1,-1)+cv(-1,0)+cv(-1,1)+cv(-1,2)+cv(-1,6)+cv(-1,7)+cv(-1,11)+cv(-1,15)+cv(-1,20)+cv(0,-20)+cv(0,-15)+cv(0,-11)+cv(0,-7);
//         break;
//         case 2:let nhd2=cv(0,-6)+cv(0,-2)+cv(0,-1)+cv(0,1)+cv(0,2)+cv(0,6)+cv(0,7)+cv(0,11)+cv(0,15)+cv(0,20)+cv(1,-20)+cv(1,-15)+cv(1,-11)+cv(1,-7)+cv(1,-6)+cv(1,-2)+cv(1,-1)+cv(1,0)+cv(1,1)+cv(1,2)+cv(1,6)+cv(1,7)+cv(1,11)+cv(1,15)+cv(1,20)+cv(2,-20)+cv(2,-15)+cv(2,-11)+cv(2,-10)+cv(2,-6)+cv(2,-5)+cv(2,-2)+cv(2,-1)+cv(2,0)+cv(2,1)+cv(2,2)+cv(2,5)+cv(2,6)+cv(2,10)+cv(2,11)+cv(2,15)+cv(2,20)+cv(3,-19)+cv(3,-14)+cv(3,-11)+cv(3,-10)+cv(3,-6)+cv(3,-5)+cv(3,5)+cv(3,6)+cv(3,10)+cv(3,11)+cv(3,14)+cv(3,19)+cv(4,-19)+cv(4,-14)+cv(4,-10)+cv(4,-5)+cv(4,-4)+cv(4,4)+cv(4,5)+cv(4,10)+cv(4,14)+cv(4,19)+cv(5,-19)+cv(5,-14)+cv(5,-10)+cv(5,-9)+cv(5,-5)+cv(5,-4)+cv(5,-3)+cv(5,-2)+cv(5,2)+cv(5,3)+cv(5,4)+cv(5,5)+cv(5,9)+cv(5,10)+cv(5,14)+cv(5,19)+cv(6,-18)+cv(6,-13)+cv(6,-9)+cv(6,-3)+cv(6,-2)+cv(6,-1)+cv(6,0)+cv(6,1)+cv(6,2)+cv(6,3)+cv(6,9)+cv(6,13)+cv(6,18)+cv(7,-18)+cv(7,-13)+cv(7,-9)+cv(7,-8)+cv(7,-1)+cv(7,0)+cv(7,1)+cv(7,8)+cv(7,9)+cv(7,13)+cv(7,18)+cv(8,-18)+cv(8,-12)+cv(8,-8)+cv(8,-7)+cv(8,7)+cv(8,8)+cv(8,12)+cv(8,18)+cv(9,-17)+cv(9,-12)+cv(9,-7)+cv(9,-6)+cv(9,-5)+cv(9,5)+cv(9,6)+cv(9,7)+cv(9,12)+cv(9,17)+cv(10,-17)+cv(10,-11)+cv(10,-5)+cv(10,-4)+cv(10,-3)+cv(10,-2)+cv(10,2)+cv(10,3)+cv(10,4)+cv(10,5)+cv(10,11)+cv(10,17)+cv(11,-16)+cv(11,-10)+cv(11,-3)+cv(11,-2)+cv(11,-1)+cv(11,0)+cv(11,1)+cv(11,2)+cv(11,3)+cv(11,10)+cv(11,16)+cv(12,-16)+cv(12,-9)+cv(12,-8)+cv(12,8)+cv(12,9)+cv(12,16)+cv(13,-15)+cv(13,-7)+cv(13,-6)+cv(13,6)+cv(13,7)+cv(13,15)+cv(14,-14)+cv(14,-5)+cv(14,-4)+cv(14,-3)+cv(14,3)+cv(14,4)+cv(14,5)+cv(14,14)+cv(15,-13)+cv(15,-2)+cv(15,-1)+cv(15,0)+cv(15,1)+cv(15,2)+cv(15,13)+cv(16,-12)+cv(16,-11)+cv(16,11)+cv(16,12)+cv(17,-10)+cv(17,-9)+cv(17,9)+cv(17,10)+cv(18,-8)+cv(18,-7)+cv(18,-6)+cv(18,6)+cv(18,7)+cv(18,8)+cv(19,-5)+cv(19,-4)+cv(19,-3)+cv(19,3)+cv(19,4)+cv(19,5)+cv(20,-2)+cv(20,-1)+cv(20,0)+cv(20,1)+cv(20,2);
//         break;
//         case 3:
//         break;
//         case 4:
//         break;
//         default:
//         break;

//     }
    
    
    

//     nhd++;
    
//     return 1;
// }

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

alert("hi and welcome! here is a breakdown of the controls. \nclick around to draw\n press P to start and pause\npress x to draw and X\npress t to draw a t\nthe R key will reset the canvas\npress l then m and finally v after interacting with the page to start a music visualizer.\nnew:press 1-9 to change things up\npress b to switch to a completely random ruleset\nthis will be updated later with a helpful ui, but works for now.")
