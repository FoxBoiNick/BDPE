function openAvr(evt, avrName) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(avrName).style.display = "block";
    evt.currentTarget.className += " active";
  } 


// get HelpModalActivator
var modalActivator = document.getElementById('HelpModalActivator');
// apply onclick event listener
modalActivator.addEventListener('click', function() {
    // get modal
    var modal = document.getElementById('HelpModal');
    var mcontent = document.getElementById('HelpModalContent');
    // apply active class to modal
    modal.classList.add('active');
    // apply active class to modal content
    mcontent.classList.add('active');
}
);
// get HelpModalCloser
var modalCloser = document.getElementById('HelpModalCloser');
// apply onclick event listener
modalCloser.addEventListener('click', function() {
    // get modal
    var modal = document.getElementById('HelpModal');
    var mcontent = document.getElementById('HelpModalContent');
    // remove active class from modal content
    mcontent.classList.remove('active');
    // remove active class from modal
    modal.classList.remove('active');
}
);
// get HelpModal
var modal = document.getElementById('HelpModal');
// apply onclick event listener
modal.addEventListener('click', function() {
    // remove active class from modal
    modal.classList.remove('active');
    // get modal content
    var mcontent = document.getElementById('HelpModalContent');
    // remove active class from modal content
    mcontent.classList.remove('active');

}
);