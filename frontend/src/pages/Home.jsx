import {useEffect, useState} from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateArea from "../components/CreateArea";
import api from "../api"
export default function Home() {
    const [notes, setNotes] = useState([]);
    // useEffect(()=>{
    //     getNotes()
    // }, [notes])
    async function getNotes(){
        try{
            const resp = await api.get('api/all/')
            setNotes(resp.data)
            console.log(notes)
        }
        catch(err){
            console.log(err)
        }
    }
    async function createNote(title, content){
        await api.post('api/posts/', {
            title:title, content: content
        })
        console.log('hi')
    } 
    function deleteNote(id){
        setNotes(prevNotes => {
            return prevNotes.filter((noteItem, index) => {
                return index !== id
            })
        })
    }

    return(
        <div>
            <Header />
               <CreateArea onCreate={createNote}/>
               {notes.map((noteItem, index) => {
                return <Note key = {index} id={index} onDelete={deleteNote} title={noteItem.title} content={noteItem.content} />
              })}
            <Footer />
        </div>
    )

}