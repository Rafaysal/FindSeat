
async function enterName() {
    //Obtaining data from HTML submission
    let name = document.getElementById('input').value;
    let data = {name: name}
    let firstName = data.name.split(" ")[0]  // Extracting the first name 
    //Post fetch request with name sent in the body
    const response = await fetch('/', {
      method: 'POST', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrer: 'no-referrer', 
      body: JSON.stringify(data) 
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
 
    let information = JSON.parse(json.newObj);
    let info1 = document.getElementById('info1')
    let info2 = document.getElementById('info2')
    let info3 = document.getElementById('info3')
    let wrongName = document.getElementById('wrong-name');
    
    //Conditional response if a match is found
    if(information[0]){
    info1.innerHTML = information[0].first_name + ' is seated on'
    info2.innerHTML = 'Floor ' +information[0].floor 
    info3.innerHTML = 'Seat ' +information[0].seat 
    wrongName.innerHTML = ''
    //Fade in animation
    let fadeElem1 = document.getElementById('container')
    fadeElem1.classList.add('fade')
    setTimeout(()=>{
      fadeElem1.classList.remove('fade')
      },1000)
    }// Conditional response if a match is not found
    else{
    //Shaking bad request animation
    let animatedElem = document.getElementById('heading');
    animatedElem.classList.add('animate')
    setTimeout(()=>{
    animatedElem.classList.remove('animate')
    },600)
    //Fade in animation
    let fadeElem2 = document.getElementById('wrong-name')
    fadeElem2.classList.add('fade')
    setTimeout(()=>{
      fadeElem2.classList.remove('fade')
      },1000)
    
    info1.innerHTML = ''
    info2.innerHTML = ''
    info3.innerHTML = ''
    //Condition if something was entered in to the input field
    if(firstName){
    wrongName.innerHTML = `Sorry, cannot find ${name} in the system`
    } // Condition if nothing was entered in to the input field
    else{ 
      wrongName.innerHTML = 'Please enter a name!'
    }
    }
  }