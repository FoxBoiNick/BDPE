/// ### START BETA POPUP ### ///

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpenAvr").click();
document.getElementById("defaultOpenFullTab").click();

// if betaWarn is True in localStorage, set the checkbox to none
if (localStorage.getItem("betaWarn") == "true") {
    document.getElementById("BetaWarn").style.display = "none";
    // increment the betaWarnCount
    localStorage.setItem("betaWarnCount", parseInt(localStorage.getItem("betaWarnCount")) + 1);
    // if NaN set to 0
    if (isNaN(parseInt(localStorage.getItem("betaWarnCount")))) {
        localStorage.setItem("betaWarnCount", 1);
    }
    if (parseInt(localStorage.getItem("betaWarnCount")) >= 5) {
        localStorage.setItem("betaWarn", "false");
        localStorage.setItem("betaWarnCount", 0);
    }
}

/// ### END BETA POPUP ### ///



/// ### CLEANUP ### ///

// find all elements with id selfDestruct
var selfDestruct = document.querySelectorAll('#selfDestruct');
// loop through all elements with id selfDestruct
for (var i = 0; i < selfDestruct.length; i++) {
    // remove the element
    selfDestruct[i].remove();
}

/// ### END CLEANUP ### ///