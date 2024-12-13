//this will save short stories to a text file

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  const title = document.body.querySelector('h1').textContent;
  const author = document.body.querySelector('h2').textContent;
  const body_text = document.body.querySelector('.story_text').textContent;
  download(`${title}[${author}].txt`,`(${title},${author})\n${body_text}`);