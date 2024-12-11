let index = 0;
export function turnPage(story){
    if(window.innerWidth >= 1024){ 
        document.getElementById("r").style.animation="flip 0.5s linear"
        document.getElementById("l").style.animation="unflip 0.5s linear"
        index+=2;
        story.writeSlice("l", index);
        setTimeout(function(){
            document.getElementById("r").style.animation="none";
            story.writeSlice("r", index+1)
        },250)
        setTimeout(function(){
            document.getElementById("l").style.animation="none";
        },500)
    }
    else{index++}
    //update page count
    if(index < story.maxPages){
        document.getElementById("pagecount").innerHTML = `Page ${index}   out of ${story.maxPages + 1}`
    }
    else{
        document.getElementById("pagecount").innerHTML = `Page ${story.maxPages + 1}   out of ${story.maxPages + 1}`
        index = story.maxPages + 1;
    }
}
export function goBack(story){
    if(index <= 0){
        return;
    }
    if(window.innerWidth >= 1024){
        document.getElementById("r").style.animation="flip 0.5s linear 0s 1 reverse"
        document.getElementById("l").style.animation="unflip 0.5s linear 0s 1 reverse"
        story.writeSlice("r", index-2)
        setTimeout(function(){
            document.getElementById("l").style.animation="none";
            story.writeSlice("l", index-2)
        },250)
        setTimeout(function(){
            document.getElementById("r").style.animation="none";
        },500)

        //update page count
        index-=2;
    }
    else{
        story.writeSlice("l", index - 1);
        story.writeSlice("r",index - 1);
        index--;
    }
    document.getElementById("pagecount").innerHTML = `Page ${index}   out of ${story.maxPages + 1}`
}