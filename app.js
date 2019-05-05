// Keep track of the session ID
var sessionID = 0;

// Keeps track of whether or not a session is started
var sessionStarted = false;

// Keep track of events during the session
var sessionEvents = [];

// Keep track of session info during a session
var sessionResearcher = "NONE";
var sessionParticipantID = "NONE";

// Starts a session
var startSessionAction = function () {

    // Check to make sure a session isn't already started
    if (sessionStarted) {
        throwError("A session has already been started. Please end the previous session before starting a new one.");
        return;
    } else {

        // Retrieve reasearcher and participant ID fields
        var researcher = document.getElementById("researcherInput").value.trim();
        var participantID = document.getElementById("participantIDInput").value.trim();

        // Next four if statements validate the given fields
        if (researcher.length < 1) {
            throwError("Please enter your researcher name.");
            return;
        }

        if (participantID.length < 1) {
            throwError("Please enter your participant ID.");
            return;
        }

        if (researcher.includes("\"") || researcher.includes("'")) {
            throwError("Your researcher name cannot have quotes in it!");
            return;
        }

        if (participantID.includes("\"") || participantID.includes("'")) {
            throwError("Your participant ID cannot have quotes in it!");
            return;
        }

        // Success! Begin a new session.
        successNotice("Your session has begun!");
        initNewSession(researcher, participantID);
        sessionStarted = true;
    }
}

// Intialize a new session
var initNewSession = function (researcher, participantID) {
    // Change BG color to indicate an active session (light green looks nice)
    document.body.style.backgroundColor = "lightgreen";

    // Set the global variables accordingly
    sessionEvents = [];
    sessionResearcher = researcher;
    sessionParticipantID = participantID;
}

// End your current session
var endSessionAction = function () {

    // Check to make sure we actually have started a session
    if (!sessionStarted) {
        throwError("A session has not been started yet.");
        return;
    } else {

        var writeText = "\"" + sessionResearcher + "\", \"" + sessionParticipantID + "\", ";

        if (sessionEvents.length > 0) {
            for (var i = 0; i < sessionEvents.length; i++) {
                if (i < sessionEvents.length - 1) {
                    writeText += "\"" + sessionEvents[i] + "\", ";
                } else {
                    writeText += "\"" + sessionEvents[i] + "\"";
                }
            }
        } else {
            writeText += "\"NO AUDIO PLAYED\"";
        }

        // TODO: append to sessions.csv
        download("session" + sessionID + ".csv", writeText);

        // Reset backround and show a success messagebox
        document.body.style.backgroundColor = "white";
        successNotice("Your session has been ended and your results have been recorded.");
    }

    sessionStarted = false;
}

// Function for easily throwing errors via messagebox/alert
var throwError = function (error) {
    alert("ERROR: " + error);
}

// Function for easily indicationg successes via messagebox/alert
var successNotice = function (notice) {
    alert("SUCCESS: " + notice);
}

// Function for playing audio files when buttons are clicked
var playAudio = function (strAudioObj) {

    // Make sure a session has been started
    if (!sessionStarted) {
        throwError("You need to start a session in order to teleoperate.");
        return;
    }

    var objSourceAudio = document.getElementById(strAudioObj);
    var objSourceAudioSource = objSourceAudio.getElementsByTagName('source')[0];
    var strSourceFile = objSourceAudioSource.src;
    var objPlayer = document.getElementById('audio_play');

    // We're only supporting .mp3 and .wav files--switch inbetween the two
    if (strSourceFile.indexOf('.wav')) {
        objPlayer.type = 'audio/wav';
    } else {
        objPlayer.type = 'audio/mpeg';
    }
    objPlayer.src = strSourceFile;
    objPlayer.load();
    objPlayer.play();

    // Push to sessionEvents for later saving
    sessionEvents.push(strAudioObj);
}

// Function for downloading a text file
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

var startSession = document.getElementById('startSession');
var endSession = document.getElementById('endSession');

// OLD CODE -> deprecated
function record(){
	console.log("record function happening")
	// pull data from two fields
	// start new file
	// save button clicks to file
};

function end(){
	// save file
}



