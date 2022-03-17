import React,{useState,useRef} from 'react'

const Noteitems = (props) => {
  var notesinital=[]
  const [notes, setnotes] = useState(notesinital);
  const {note}=props;
  
  // const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json'
  //    }
  //   });
  //   const json=await response.json()
  //   setnotes(json);
    // console.log("caleed getNotes",notes.notesinital);

  // const {updatenote}=props;
  
  // useEffect(() => {
  //   return () => {
  //     console.log("run kiya");
  //     getNotes();
  //   }
  // }, [])

  const ref=useRef(null);
  const refclose=useRef(null);

  const getNotes=async()=>{
    
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
         }
        });
        const json=await response.json()
        setnotes(json);
        console.log("caleed getNotes",notes);
    }
 


  const deleteNote=async(id)=>{
    getNotes();
    console.log(id);
    console.log('http://localhost:5000/api/notes/deletenote/'+id);
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


//uupdate wale 

var id="";
// var etitle="";
const [noteu, setNoteu] = useState({etitle2: ""})

const handleClicke = (e)=>{
  console.log("Updating the note...",id)
  editNote(noteu.etitle2,id);
  refclose.current.click();
}

const onChange = (e)=>{
  setNoteu({etitle2:e.target.value})
 

}
 


const updatenote=(currentNote,title)=>{
  ref.current.click();
  id=id+currentNote;
  // setNoteu({id:currentNote,etitle:title})
  setNoteu({etitle2:title});
  
  console.log("cliceked",id,currentNote);
}


const editNote=async(id,title)=>{
  console.log(id);
  
  const response = await fetch('http://localhost:5000/api/notes/updatenote/'+id, {
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
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={noteu.etitle2} aria-describedby="emailHelp" onChange={onChange} minLength={3}  required/>
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

        
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                        <h5 className="card-title">{note.title}</h5><button className="btn-primary" onClick={()=>{deleteNote(note._id)}}>delete</button>
                        <button className="btn-warning mx-2" onClick={()=>{updatenote(note._id,note.title)}}>Edit</button>
                    </div>
            </div>
        </div>
    </>
  )
}

export default Noteitems;