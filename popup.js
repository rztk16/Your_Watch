// Get references to the tab buttons and tab contents
var skipTabBtn = document.getElementById("skipTabBtn");
var findTabBtn = document.getElementById("findTabBtn");
var skipTabContent = document.getElementById("skipTab");
var findTabContent = document.getElementById("findTab");

skipTabBtn.addEventListener("click", function() {
    openTab("skipTab");
});

findTabBtn.addEventListener("click", function() {
    openTab("findTab");
});

// Function to switch between tabs
function openTab(tabName) {
    // Hide all tab contents
    skipTabContent.style.display = "none";
    findTabContent.style.display = "none";

    // Show the selected tab content
    if (tabName === "skipTab") {
        skipTabContent.style.display = "block";
    } else if (tabName === "findTab") {
        findTabContent.style.display = "block";
    }
}



// Function to apply skip settings
function applySkipSettings() {
    // Declare variables for checkbox elements
    var skipViolenceCheckbox = document.querySelector("input[name=skipViolence]");
    var skipNudityCheckbox = document.querySelector("input[name=skipNudity]");
    var skipProfanityCheckbox = document.querySelector("input[name=skipProfanity]");
    var skipSubstancesCheckbox = document.querySelector("input[name=skipSubstances]");
    var skipIntenseCheckbox = document.querySelector("input[name=skipIntense]");

    // Get custom skip text area value
    var customSkipInput = "Retrieve timestamps of "+document.getElementById("customSkipInput").value;

    // Initialize the prompt variable
    var skipPrompt = "";

    // Retrieve timestamps of violent and fight scenes from the video
    if (skipViolenceCheckbox && skipViolenceCheckbox.checked) {
        skipPrompt += "\nRetrieve timestamps of violent and fight scenes from the video\n";
    }

    // Retrieve timestamps of nude and explicit scenes from the video
    if (skipNudityCheckbox && skipNudityCheckbox.checked) {
        skipPrompt += "\nRetrieve timestamps of nude and explicit scenes from the video\n";
    }

    // Retrieve timestamps of profanity scenes from the video
    if (skipProfanityCheckbox && skipProfanityCheckbox.checked) {
        skipPrompt += "\nRetrieve timestamps of profanity scenes from the video\n";
    }

    // Retrieve timestamps of drugs and substance use scenes from the video
    if (skipSubstancesCheckbox && skipSubstancesCheckbox.checked) {
        skipPrompt += "\nRetrieve timestamps of drugs and substance use scenes from the video\n";
    }

    // Retrieve timestamps of blood and intense scenes from the video
    if (skipIntenseCheckbox && skipIntenseCheckbox.checked) {
        skipPrompt += "\nRetrieve timestamps of blood and intense scenes from the video\n";
    }

    // Append custom skip input to the prompt variable
    skipPrompt += "\n"+customSkipInput;

    // Log the contents of the prompt variable
    console.log(skipPrompt);
    printSkipPrompt(skipPrompt);

}

// Function to apply find settings
function applyFindSettings() {
    var prompt = "from the video retrieve the scene where ";

    // Get find text area value
    var findItInput = document.getElementById("findIt").value;

    // Concatenate find text area input to the prompt variable
    prompt += findItInput;

    // Now the 'prompt' variable contains the find input
    console.log(prompt);
    printPrompt(prompt);
}

// Function to print the contents of the prompt variable
function printPrompt(promptText) {
    
    const outputDiv = document.getElementById('output'); 
    outputDiv.textContent = "you said: "+promptText;
}

function printSkipPrompt(promptText) {
    
    const skipOutputDiv = document.getElementById('skipOutput'); 
    skipOutputDiv.textContent = "you said: "+promptText;
}





var skipBtn = document.getElementById("skipBtn");
var findBtn = document.getElementById("findBtn");


// Function to create the YouTube player
function createYouTubePlayer() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: extractVideoId(url),
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'start': 0 // Initial starting time of the video (in seconds)
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

// Event listener for the skip button
skipBtn.addEventListener("click", function() {
    skipBtn.disabled = true; // Disable the button
    skipBtn.innerHTML = "hmm...";
    getActiveTabURL();
    applySkipSettings();
    
    // Call createYouTubePlayer to initialize the player
    createYouTubePlayer();
    
    // Call skipToInterval only if the player is ready
    if (isPlayerReady) {
        skipToInterval(30, 60);
    } else {
        console.error("Player is not ready yet.");
    }
});

// Function to handle when the player is ready
function onPlayerReady(event) {
    isPlayerReady = true; // Set the flag to true when the player is ready
}

// Function to create the YouTube player when the API is ready
function onYouTubeIframeAPIReady() {
    createYouTubePlayer();
}


findBtn.addEventListener("click", function() {
    findBtn.disabled = true; // Disables the button
    findBtn.innerHTML = "hmm...";
    getActiveTabURL();
    applyFindSettings();
});

function extractVideoId(url) {
    // Regular expression to match YouTube video ID
    var regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    
    // Match the regular expression against the URL
    var match = url.match(regExp);
    
    // If there's a match, return the video ID
    if (match) {
      return match[1];
    } else {
      // If no match is found, return null or handle the error
      return null;
    }
  }
  
 
  
  
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: extractVideoId(url),
    playerVars: {
      'autoplay': 1,
      'controls': 1,
      'start': 0 // Initial starting time of the video (in seconds)
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function skipToInterval(startTime, endTime) {
    // Play from the start of the video to the beginning of the interval
    player.seekTo(0);
    player.playVideo();
    
    // Pause the video when it reaches the start of the interval
    setTimeout(function() {
        player.pauseVideo();
    }, startTime * 1000); // Convert seconds to milliseconds
    
    // Resume playing after the interval
    setTimeout(function() {
        player.playVideo();
    }, endTime * 1000); // Convert seconds to milliseconds
}

  

// Function to handle uploading data to the server
async function uploadDataToServer(data) {
    try {
        const response = await fetch('https://loud-ghosts-lay.loca.lt/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log('Upload successful:', result);
    } catch (error) {
        console.error('Error uploading:', error);
    }
}

// Function to get the active tab URL
// Function to get the active tab URL
async function getActiveTabURL() {
    try {
        // Use chrome.tabs.query to get information about the active tab
        const tabs = await chrome.tabs.query({
            currentWindow: true,
            active: true
        });

        // Check if tabs array is empty
        if (tabs.length === 0) {
            throw new Error("No active tab found.");
        }

        // Extract the URL of the active tab
        const url = tabs[0].url;

        // Check if URL is empty or null
        if (!url) {
            throw new Error("Active tab URL is empty.");
        }

        return url;
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error in getActiveTabURL:", error);
        // You may want to throw an error or return a default value
        return null;
    }
}



// Function to display message to the user
function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

// Call the function to get the active tab URL
getActiveTabURL().then(url => {
    // Check if the URL belongs to a YouTube video page
    if (url.includes("youtube.com/watch")) {
        // If it's a YouTube video page, save the URL in a parameter or send it to another file
        // Example: sendUrlToAnotherFile(url);
        console.log("YouTube video URL:", url);
    } else {
        // If it's not a YouTube video page, display a message to the user
        displayMessage("You are not on a YouTube video page.");
    }
}).catch(error => {
    // If there's an error while getting the active tab URL, display an error message to the user
    console.error("Error getting active tab URL:", error);
    displayMessage("Error: Unable to retrieve the active tab URL.");
});






