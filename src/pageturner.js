let index = 0;
export function turnPage(story){
    story.writeSlice("l", index);
    story.writeSlice("r",index + 1);

    //update page count
    (async() => {await story.checkLoaded();
    if(index < story.maxPages){
        document.getElementById("pagecount").innerHTML = `${index} / ${story.maxPages + 1}`
    }
    else{
        document.getElementById("pagecount").innerHTML = `${story.maxPages + 1} / ${story.maxPages + 1}`
    }
    index+=2;
})();
}