// Define the URL for the GET request
const server_url = 'http://127.0.0.1:5000/'; // Replace with your Flask app URL

export class Story {
  constructor() {
    this.page_size_limit = 15; // How big one page is
    this.line_limit = 45;
    this.rawtext = '';
    this.story_lines = [];
    this.isLoaded = false;
    this.maxPages = 0;
    (async () => {
      this.rawtext = await this.getStory();
      this.rawtext = this.rawtext.slice(this.rawtext.indexOf("\n") + 1)
      // Split story line by line and add back breaks
      this.breakLines();
      this.maxPages = Math.floor(this.story_lines.length / this.page_size_limit)
      this.isLoaded = true; 
      // Mark the story as loaded
    })();
  }
  breakLines(){
    let line = [];
    let letter_count = 0;
    const pushLine = ()=>{
      this.story_lines.push(line);
      letter_count = 0; 
      line = []
    }
    
    const uncut = this.rawtext.split(" ")
    console.log(uncut)
    for(var i = 0; i<uncut.length; i++){
      line += uncut[i] + " ";
      letter_count += uncut[i].length;
      if(letter_count >= this.line_limit || uncut[i].includes("\n")){
        pushLine();
      }
    }
    pushLine();
    console.log(this.story_lines)
  }
  async getStory() {
    try {
      const response = await fetch(server_url);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.text(); // Parse the response as text
      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      return ''; // Return empty string if there was an error
    }
  }

  checkLoaded() {
    return new Promise((resolve) => {
      if (this.isLoaded) {
        resolve(); // If already loaded, resolve immediately
      } else {
        // Wait for the story to load
        const checkInterval = setInterval(() => {
          if (this.isLoaded) {
            clearInterval(checkInterval); // Stop checking
            resolve(); // Resolve the promise once rawtext is ready
          }
        }, 100); // Check every 100ms until the story is loaded
      }
    });
  }

  async writeSlice(id, index) {
    // Wait for the story to be loaded before proceeding
    console.log(index, this.maxPages)
    await this.checkLoaded();
    if(index > this.maxPages){
      document.getElementById(id).innerHTML = "the end!";
      return;
    }
    // Starting point
    const base = index * this.page_size_limit;
    const slice = this.story_lines.slice(base, base + this.page_size_limit).join('\n');
    
    // Update the page with the slice
    document.getElementById(id).innerHTML = slice;
  }
}
