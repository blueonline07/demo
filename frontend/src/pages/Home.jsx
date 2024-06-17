import {useEffect, useState} from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import api from "../api"
export default function Home() {
    const [notes, setNotes] = useState([]);
    useEffect(()=>{
        getNotes()
    }, [])
    async function getNotes(){
        try{
            const resp = await api.get('api/all/')
            setNotes(resp.data) 
        }
        catch(err){
            console.log(err)
        }
    }
    async function createNote(title, content){
        const resp = await api.post('api/posts/', {
            title:title, content: content
        })
        const {title:x, content:y} = resp.data
        setNotes([...notes, {title:x, content:y}])
    } 
    function deleteNote(id){
        api.delete(`api/posts/${id}/`)
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem) => {
                return noteItem.id != id
            })
        })
    }
    return(
        <div>
            <Header />
               <CreateArea onCreate={createNote}/>
               {notes.map((noteItem, index) => {
                return <Note key = {index} id={noteItem.id} onDelete={deleteNote} title={noteItem.title} content={noteItem.content} />
              })}
            <Footer />
        </div>
    )

}