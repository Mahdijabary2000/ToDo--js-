//variabel
const modal = document.querySelector("#myModal");
const btn = document.querySelector("#myBtn");
const span = document.getElementsByClassName("close")[0];
const noteList=document.querySelector('#list')
const input=document.querySelector('input')
const moudal=document.querySelector('.moudal')




//eventlistener

eventlisteners()
function eventlisteners(){
    btn.addEventListener('click',function(){
        modal.style.display = "block";
        
})

span.addEventListener('click',function(){
    modal.style.display = "none";
})

window.addEventListener ('click', function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  })

  document.querySelector('#form').addEventListener('submit',newNote)
  document.addEventListener('click',removeNote)   
  document.addEventListener('DOMContentLoaded',onloadLocalStorage)
  

}



//function


//search
function searchResult(){
	var search = document.getElementById('todo-text').value.toLowerCase();
	var target = document.getElementById("list");
	var list = target.getElementsByTagName('li');
	for(var i=0; i < list.length; i++){
		var text = list[i].innerHTML;
		if(text.toLowerCase().indexOf(search) > -1){
			list[i].style.display = "";
            
		}else{
			list[i].style.display = "none";
		}
	}
}


//add note

function newNote(e){
    e.preventDefault()
    

    const note=document.querySelector('.activity-input').value

    const removeBtn=document.createElement('a')
        removeBtn.textContent='X'
        removeBtn.classList='remove-note'

    const li=document.createElement('li')
    li.className='list animate__bounceIn'
    li.appendChild(document.createTextNode(note))

    li.appendChild(removeBtn)

    noteList.appendChild(li)

    this.reset()

    modal.style.display = "none";
    
    addLocalstorag(note)

}

//remove note
function removeNote(e){
    if(e.target.classList.contains('remove-note')){
        e.target.parentElement.remove()
    }
    removeLocalStorage(e.target.parentElement.textContent)
    
}

// add note to local
function addLocalstorag(note){
    const notes= getLocalStorage()
    notes.push(note)
    localStorage.setItem('notes',JSON.stringify(notes))
}

//check local
function getLocalStorage() {
    let notes;
    let getLS=localStorage.getItem('notes')
    if (getLS===null) {
        notes=[]
    }
    else{
        notes=JSON.parse(getLS)
    }
    return notes
}

// loaded local
function onloadLocalStorage() {
    const notes=getLocalStorage()
    notes.forEach(function(note){

        const removeBtn=document.createElement('a')
        removeBtn.textContent="X"
        removeBtn.classList='remove-note'
    


        const li=document.createElement('li')
        li.className='list animate__bounceIn'
    li.appendChild(document.createTextNode(note))

    li.appendChild(removeBtn)

    noteList.appendChild(li)
    
    
});
}
 
//remove note in local
function removeLocalStorage(noteremove){
    const deletenote=noteremove.substring(0, noteremove.length-1)
    
    
   
    const noteLS=getLocalStorage()

    noteLS.forEach(function(note , index){
        if(note==deletenote){
            noteLS.splice(index,1)
            
        }

    });
    localStorage.setItem('notes', JSON.stringify(noteLS))
}




