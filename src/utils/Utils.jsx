 // validation function 
 export function validationFunc(e){
    const nextSibling = e.target.nextSibling;
    if (!e.target.value) {
      e.target.classList.add('not-valid');
      if(e.target.nextSibling){
          nextSibling.classList.add("active");
      }
    } else {
      e.target.classList.remove('not-valid');
      if(e.target.nextSibling){
        nextSibling.classList.remove("active");
    }
    }
  }