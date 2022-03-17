import React,{useState,useEffect,useRef} from "react";
import Noteitems from "./Noteitems";

export const Home = () => {
  useEffect(() => {
    return () => {
      console.log("home se hu bhaii");
      getNotes();
    }
  }, [])

const [note,setnote] = useState({etitle:""});
const notesinital=[]
const [notes, setnotes] = useState(notesinital);

const getNotes=async()=>{
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
         }
        });
         const json=await response.json()
       
         setnotes(json);
    }
const addNote=async(title)=>{
  const response = await fetch('http://localhost:5000/api/notes/addnote', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
},
   body: JSON.stringify({title})
  });
  const note=await response.json();
  console.log(note)
  setnotes(notes.concat(note))
  console.log("done added d")

}
const onchange=(e)=>{
  setnote(e.target.value)
  
}

const handleclick=(e)=>{
  console.log("update notes....",note)
  e.preventDefault();
  addNote(note);
  getNotes();
  console.log(notes);
  setnote({etitle:""})
}

//dwelete 
const deleteNote=async(id)=>{
  const response = await fetch('http://localhost:5000/api/notes/deletenote/'+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
      }
  });
  const jsonresponse= await response.json(); 
  console.log("delete note with id"+id);
  console.log(jsonresponse);
  const newNotes=await notes.filter((notes)=>{return notes._id!==id})
  setnotes(newNotes)
  getNotes();
}

//update wale 
const ref=useRef(null);
const refclose=useRef(null);
const [note2, setNote2] = useState({eid:"", etitle: ""})

const onChangee = (e)=>{
  setNote2({...note2, [e.target.name]: e.target.value})
}
 
const handleClicke = (e)=>{
  console.log("Updating the note...", note2)
  editNote(note2);
  refclose.current.click();
}

const updateNote=(currentNote)=>{
  ref.current.click();
  console.log("cliceked",currentNote._id,currentNote.title);
  setNote2({eid:currentNote._id,etitle: currentNote.title})
  
}


const editNote=async(note2)=>{
  
  const id=note2.eid;
  const title=note2.etitle;
  console.log("from edinotw",id,title);
  const response = await fetch('http://localhost:5000/api/notes/update/'+id, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
     
    },
    body: JSON.stringify({title})
  });
  const jsonresponse=await response.json(); 


  let newNotes=JSON.parse(JSON.stringify(notes))
 //logic to edit
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
      newNotes[index].title=title;
      break;
    }
  
    
  }
  setnotes(newNotes);
}

return (
    <>
    <div className="container my-3">
      <h1 className="text-primary">TODO_APPLICATION</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            TODO ITEM
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
         
            aria-describedby="emailHelp"
            onChange={onchange}
          />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          Submit
        </button>
      </form>
    </div>


<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
               </button>
               <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                   <div className="modal-dialog">
                       <div className="modal-content">
                           <div className="modal-header">
                               <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                           </div>
                           <div className="modal-body">
                               <form className="my-3">
                                   <div className="mb-3">
                                       <label htmlFor="title" className="form-label">Title</label>
                                       <input type="text" className="form-control" id="etitle" name="etitle" value={note2.etitle} aria-describedby="emailHelp" onChange={onChangee} minLength={3}  required/>
                                   </div>
                                  
    
                               </form>
                           </div>
                           <div className="modal-footer">
                               <button type="button" ref={refclose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                               <button onClick={handleClicke} type="button" className="btn btn-primary">Update Note</button>
                           </div>
                       </div>
                   </div>
                   </div>

   
    <div className="row mx-3">
        <h2>Your notes</h2>
        {notes.length===0 && 'No notes to display'}
        {notes.map((note) => {
          return <>
             <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                        <h5 className="card-title">{note.title}</h5><button className="btn-primary"  onClick={()=>{deleteNote(note._id)}}>delete</button>
                        <button className="btn-warning mx-2" onClick={()=>{updateNote(note)}}>Edit</button>
                    </div>
            </div>
        </div>
          </>
        })}
        
      </div>

    </>
  );
};
