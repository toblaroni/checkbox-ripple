const width = window.innerWidth
const height = window.innerHeight

const rippleWidth = 50

let boxes = 30;

let gapWidth = Math.round(width / boxes)

let rippleArr = []

// Class that holds the radius of each ripple
class Ripple {
   radius
   originX
   originY
   constructor(originX, originY){
      this.radius = 0
      this.originX = originX
      this.originY = originY
   }
}

window.onload = function(){
   let container = document.getElementById('container')

   for(let x = 0; x <= width; x += gapWidth){
      for(let y = 0; y <= height + gapWidth; y += gapWidth){
         // Make checkbox
         let checkbox = document.createElement('input')
         checkbox.classList.add(x.toString(), y.toString())
         checkbox.type = "checkbox"

         // Style
         let cWidth = gapWidth / 2
         checkbox.style.position = 'absolute'
         checkbox.style.width = cWidth + 'px'
         checkbox.style.height = cWidth + 'px'
         checkbox.style.left = (x - cWidth/2) + 'px' 
         checkbox.style.top = (y - cWidth/2) + 'px'

         // Set the class of each checkbox as the x and y

         // Add to the container
         container.appendChild(checkbox);
      }
   }
}

// Get the array of checkboxes
let checkboxes = document.getElementsByTagName('input')

// make a new ripple when the mouse is clicked
document.body.addEventListener("click", (e) => {
   if(e.target.type != 'checkbox') return
   // Value that increments untill it's larger than width and height
   let ripple = new Ripple()

   // Loop through all of the checkboxes
   for (let checkbox of checkboxes){
      if(checkbox.checked){
         if(checkbox.classList.length == 2){
            ripple.originX = checkbox.classList[0]
            ripple.originY = checkbox.classList[1]
         } else {
            ripple.originX = checkbox.classList[0]
            ripple.originY = checkbox.classList[0]
         }
      }
   }

   // If there's not already a ripple create one
   rippleArr.push(ripple)
})

setInterval(function(){
   console.log(rippleArr)
   // Check each of the boxes to see whether they should be on
   // Loop through checkboxes
   for(let checkbox of checkboxes){

      let x = checkbox.classList[0]
      let y
      if(checkbox.classList.length == 1){
         y = checkbox.classList[0]
      } else {
         y = checkbox.classList[1]
      }
      
      // Loop through each ripple to see if the checkbox is within the ripple range
      for(let r of rippleArr){
         // Calculate the distance from the current box and the checked box
         // Pythagoras
         let chosenX = r.originX
         let chosenY = r.originY
         console.log('ChosenX, ChosenY, x, y = ', chosenX, chosenY, x , y)

         let X = Math.abs(chosenX - x)
         let Y = Math.abs(chosenY - y)

         // Distance from the clicked checkbox
         let dist = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2))
         console.log("X Y and Dist = ", X, Y, dist)

         // If the distance is the same -> check the box. Else uncheck.
         if(Math.abs(dist - r.radius) <= rippleWidth){
            checkbox.checked = true
         } else {
            checkbox.checked = false
         }       
      }
   }

   // Increment the ripples radius
   for(let r of rippleArr){
      if(r.radius >= width * 1.5 && r.radius >= height * 1.5){
         rippleArr.shift()
      } else {
         r.radius += 10
      }
   }
}, 10)