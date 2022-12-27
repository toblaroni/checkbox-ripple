const width = window.innerWidth
const height = window.innerHeight
let boxes = 20;

let gapWidth = width / boxes

// Class that holds the radius of each ripple
class Ripple {
   radius

   constructor(incVal){
      this.radius = 0
   }
}


window.onload = function(){
   let container = document.getElementById('container')


   for(let x = 0; x <= width; x += gapWidth){
      for(let y = 0; y <= height + gapWidth; y += gapWidth){
         // Make checkbox
         let checkbox = document.createElement('input')
         checkbox.type = "checkbox"

         // Style
         let cWidth = gapWidth / 2
         checkbox.style.position = 'absolute'
         checkbox.style.width = cWidth + 'px'
         checkbox.style.height = cWidth + 'px'
         checkbox.style.left = (x - cWidth/2) + 'px' 
         checkbox.style.top = (y - cWidth/2) + 'px'

         // Add to the container
         container.appendChild(checkbox);

      }
   }

}

// Get the array of checkboxes
let checkboxes = document.getElementsByTagName('input')

document.body.addEventListener("click", () => {
   // Create a circle whoes radius expands 
   let ripple = new Ripple()


   // Increment the radius
   setInterval(function(){
      ripple.radius += gapWidth

      if(ripple.radius >= width && ripple.radius >= height){
         return
      }
   }, 100)
})
