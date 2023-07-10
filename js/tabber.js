
  function openView(evt, viewName) {
    // from event target get tab_id from parent div if class tab in parent div
    parentDiv = evt.target.parentElement;
    if (parentDiv.classList.contains("tab")) {
      //<div class="tab" tab_id="FullView">
      tab_id = parentDiv.getAttribute("tab_id");
    }

    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    // filter tabcontent by tab_id in for= attribute
    tabcontent = Array.prototype.filter.call(tabcontent, function(tabcontent) {
      return tabcontent.getAttribute("for") == tab_id;
    });

    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    // filter tablinks by tab_id in parent div tab_id attribute
    tablinks = Array.prototype.filter.call(tablinks, function(tablinks) {
      return tablinks.parentElement.getAttribute("tab_id") == tab_id;
    });
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    // get elements by that match id=viewName and for=tab_id
    tabcontent = document.getElementsByClassName("tabcontent");
    tabcontent = Array.prototype.filter.call(tabcontent, function(tabcontent) {
      return tabcontent.getAttribute("for") == tab_id && tabcontent.id == viewName;
    });
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = tabcontent[i].getAttribute("display-type") || "block";  
    }

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


var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  // set style
  a.setAttribute("class", "select-selected");
  a.style = "--li-color: " + selElmnt.options[selElmnt.selectedIndex].getAttribute("li-color");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].value;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.style = "--li-color: " + selElmnt.options[j].getAttribute("li-color");
    c.value = selElmnt.options[j].value;
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            // set style
            h.style = "--li-color: " + s.options[i].getAttribute("li-color");
            h.innerHTML = this.value;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect); 