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
var helpModal = document.getElementById("helpModal");
var openBtn = document.getElementById("HelpModalActivator");
var closeBtn = document.getElementById("HelpModalCloser");
openBtn.onclick = function() {helpModal.style.display = "block";};
closeBtn.onclick = function() {helpModal.style.display = "none";};
window.onclick = function(event) {if (event.target == helpModal) {helpModal.style.display = "none";}}; 

// get copyRequestMessage
var copyRequestMessage = document.getElementById("copyRequestMessageButton");

// apply on click copy
copyRequestMessage.onclick = function() {
  // create a new textarea element and give it id='temp_element'
  var textarea = document.createElement('textarea');
  textarea.id = 'temp_element';
  // Optional step to make less noise on the page, if any!
  textarea.style.opacity = 0;
  textarea.style.position = 'fixed';
  // Now append it to helpModal or any other element in your page
  helpModal.appendChild(textarea);
  // Give our textarea a value of whatever inside the div of id=containerid
  textarea.value = document.getElementById('copyRequestMessage').innerText;
  // Now copy whatever inside the textarea to clipboard
  var selector = document.querySelector('#temp_element');
  selector.select();
  selector.setSelectionRange(0, 99999); /*For mobile devices*/

  navigator.clipboard.writeText(selector.value);
  // Remove the textarea
  helpModal.removeChild(textarea);

  // set copyRequestMessage text to copied
  copyRequestMessage.innerText = "Message Copied!";
  // revert copyRequestMessage text to copy
  setTimeout(function(){
    copyRequestMessage.innerText = "Copy Message";
  }, 1000);
}