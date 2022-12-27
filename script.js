const width = window.innerWidth
const height = window.innerHeight
let boxes = 40;

let gapWidth = Math.round(width / boxes)

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

document.body.addEventListener("click", (e) => {
   if(e.target.type != 'checkbox') return
   // Create a circle whoes radius expands 
   let ripple = new Ripple()

   // Loop through all of the checkboxes
   for (let checkbox of checkboxes){
      if(checkbox.checked){
         ripple.originX = checkbox.classList[0]
         ripple.originY = checkbox.classList[1]
      }
   }

   setInterval(function(){
      // Check each of the boxes to see whether they should be on
      // Loop through checkboxes
      for(let checkbox of checkboxes){
         // Calculate the distance from the current box and the checked box
         // Pythagoras
         let chosenX = ripple.originX
         let chosenY = ripple.originY
         let x = checkbox.classList[0]
         let y = checkbox.classList[1]

         if(y == undefined) y = 0;
         if(chosenY == undefined) chosenY = 0;

         let X = Math.abs(x - chosenX)
         let Y = Math.abs(y - chosenY)

         let dist = Math.sqrt(Math.pow(X, 2) + Math.pow(Y, 2))
         
         // If the distance is the same -> check the box. Else uncheck.
         if(Math.abs(dist - ripple.radius) <= 50){
            checkbox.checked = true
         } else {
            checkbox.checked = false
         }
      }
      // Increment the ripples radius
      ripple.radius += 10
      if(ripple.radius >= width && ripple.radius >= height){
         ripple = null
      }
   }, 10)
})
