let pixels = [];
let colors = ["green","red","blue"];
let neighbors = [-160,-159,-161,160,159,161,-1,1];
let loop = false;
drawMap();

$(document).keyup((e)=>{
    switch(e.which)
    {
        case 32:
            if(loop)
                loop=!loop;
            else{
                loop = !loop;
                conway();
            }
  
        break;

        default:
        break;
    }
})





function drawMap() 
{
    for(let i=0;i<12800;i++)
    {
        //console.log(i)
        let pixel = $("<div>")
        pixel.attr("class","pixel");
        pixel.attr("id",""+i);
        pixel.css("background-color","black")
        $("body").append(pixel);
        pixel.click((e)=>{
            //console.log(pixel.attr("id"));
            if(pixel.css("background-color")!="rgb(0, 0, 255)")
                pixel.css("background-color","blue");
            else
                pixel.css("background-color","black");

            e.preventDefault();
        })
        pixels.push(pixel);
    }

}

function conway()
{
    let create = []
    let destroy = []
    pixels.forEach((element,i)=>{
        //check number of neighbors
        let aliveNeighbors = 0;
        neighbors.forEach((neighbor)=>{
            //console.log((parseInt(element.attr("id"))+neighbor));
            if($("#"+(parseInt(element.attr("id"))+neighbor)).css("background-color")=="rgb(0, 0, 255)")
            {
                aliveNeighbors=aliveNeighbors+1;
            }
            //console.log($("#"+(element.attr("id")+neighbor)).css("background-color"))
        })
        //conway's rules
        if(element.css("background-color")=="rgb(0, 0, 255)")
        {//console.log(aliveNeighbors);
            if(aliveNeighbors<2)
                destroy.push(element);
            if(aliveNeighbors>3)
                destroy.push(element);
        }else{
            //console.log(aliveNeighbors);
            if(aliveNeighbors==3)
                create.push(element);
        }
            

    })

    while(destroy.length>0){
        let deadOne = destroy.pop();
        deadOne.css("background-color","black");
    }

    
    while(create.length>0)
    {
        let child = create.pop();
        child.css("background-color","blue");
    }

    if(loop)
        setTimeout(()=>{conway();},20);
    
}


