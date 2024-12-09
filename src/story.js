// Define the URL for the GET request
const server_url = 'http://127.0.0.1:5000/'; // Replace with your Flask app URL

export class Story {
  constructor() {
    this.page_size_limit = 20; // How big one page is
    this.rawtext = '';
    this.story_lines = [];
    this.isLoaded = false;
    this.maxPages = 0;
    (async () => {
      this.rawtext = await this.getStory();
      // Split story line by line and add back breaks
      this.story_lines = this.rawtext.split("\n");
      this.maxPages = Math.floor(this.story_lines.length / this.page_size_limit)
      this.isLoaded = true; // Mark the story as loaded
    })();
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
    await this.checkLoaded();
    console.log(index, this.maxPages)
    if(index > this.maxPages){
      document.getElementById(id).innerHTML = "the end!";
      return;
    }
    // Starting point
    const base = index * this.page_size_limit;
    const slice = this.story_lines.slice(base, base + this.page_size_limit).join("\n");
    
    // Update the page with the slice
    document.getElementById(id).innerHTML = slice;
  }
}
