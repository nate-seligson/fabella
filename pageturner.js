let index = 0;
export function turnPage(story){
    index+=2;
    story.writeSlice("l", index);
    story.writeSlice("r",index + 1);

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
    story.writeSlice("l", index-2);
    story.writeSlice("r",index - 1);

    //update page count
    index-=2
    document.getElementById("pagecount").innerHTML = `Page ${index}   out of ${story.maxPages + 1}`
}