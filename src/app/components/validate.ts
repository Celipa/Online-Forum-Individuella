

export function validate(form:SubmitForm,selection:ThreadCategory | string,setError:React.Dispatch<React.SetStateAction<ErrorForm>>):boolean{

let titleError = ''
let descriptionError = ''
let selectionError = ''

if(form.title.length <= 2){
 titleError = 'Must fill a title with at least 3 characters long'
}

if(form.description.length <= 10){
    descriptionError = 'Description must be at least 10 characters long'
}

if(!selection){
    selectionError = 'Please select a category'
}

if(titleError || descriptionError){
    setError({
        title:titleError,
        description:descriptionError,
        selection:selectionError
    })
    return false
}
 return true
}