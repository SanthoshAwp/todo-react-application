import React, { useEffect, useState } from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const Table = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(0);


    useEffect(() => {
        if( data?.length != 0 ){localStorage.setItem("data", JSON.stringify(data))}
    }, [data])

    useEffect(() => {        
        setData(JSON.parse(localStorage.getItem("data")))
    }, [])

    const removeRow = (index) => {
        setData(data.filter((row, i) => i !== index))
    }

    const [editableItem, setEditableItem] = useState([])

    function ModalComponent({id}){

        const [name, setName] = useState(editableItem[0].name);
        const [age, setAge] = useState(editableItem[0].age);

        const handleSubmit = () => {
            const updatedData = data.map((item, index) => {
                if(id === index){
                    return {...item, name, age}
                }
                return item
            })

            setData(updatedData);
            setName("");
            setAge("");
            setShowModal(false)
        }

        return(
            <div style={{position: 'fixed',zIndex: '1',left: '0',top: '0',width: '100%', height: '100%',overflow: 'auto',backgroundColor: 'rgba(0,0,0,0.4)',}} onClick={() => setShowModal(false)}>
            <div style={{backgroundColor: '#fefefe',margin: '20% auto',padding: '20px',border: '1px solid #888',width: '80%', borderRadius: "10px", maxWidth:"280px"}}>
                
                <div style={{display:"flex", flexDirection:"column", gap:"5px",}}>
                    <label style={{alignSelf:"start"}}>Name<span style={{color:"red"}}>*</span></label>
                     <input onChange={(e) => setName(e.target.value)} value={name} style={{padding:"5px", border:"1px solid gray", borderRadius:"5px"}}/>
                     <label style={{alignSelf:"start"}}>Age<span style={{color:"red"}}>*</span></label>
                    <input onChange={(e) => setAge(e.target.value)} value={age} style={{padding:"5px", border:"1px solid gray", borderRadius:"5px"}}/>
                    <div style={{display: "flex", gap: "5px", justifyContent: "end", marginTop: "15px"}}>
                        <button style={{color: 'white', background:"green",cursor: 'pointer',border: "none", padding: "10px 20px",borderRadius: "5px"}} onClick={handleSubmit}>Update</button>
                        <button style={{color: 'white', background:"red",cursor: 'pointer',border: "none",  padding: "10px 20px",borderRadius: "5px"}} onClick={() => setShowModal(false)}>Close</button>
                    </div>
                </div>

               
            </div>
        </div>
        )
    }

    function handleEdit(id){
        setId(id)
        setShowModal(true);
        setEditableItem(data.filter((item, index) => index === id))
    }

    return (
        <div style={{maxWidth: "800px", margin: "auto"}}>
        <div style={{padding:"20px"}}>
            <h2 style={{color: "steelblue"}}>ToDo Application</h2>
                <div style={{background: "#d0c7af", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", flexDirection: "column", padding: "30px 0", border: "1px solid gray", maxWidth: "280px", margin: "20px auto", borderRadius: "10px"}}>
                    <div style={{display: "flex", flexDirection: "column",  gap: "5px"}}>
                        <label style={{alignSelf: "start"}}>Name<span style={{color:"red"}}>*</span> </label>
                        <input onChange={(e) => setName(e.target.value)} value={name} style={{borderRadius: "5px", padding: "5px", border: "1px solid gray"}} />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "5px" }}>
                        <label style={{alignSelf: "start"}}>Age<span style={{color:"red"}}>*</span></label>
                        <input onChange={(e) => setAge(e.target.value)} value={age} style={{borderRadius: "5px", padding: "5px",  border: "1px solid gray"}}/>
                    </div>
                    <button onClick={() => {if(name.trim() != "" && age.trim() != ""){setData([...data,{name:name, age:age}]); setName(''); setAge('');}}} style={{background: "steelblue", color: "white", padding: "10px 20px", border: "none", borderRadius: "10px", cursor:"pointer"}}>Save</button>
                </div>
            <table style={{width: "100%", padding:"2px",margin:"20px auto", overflow: "auto",}}>
                <thead style={{background: "steelblue", color: "white",}}>
                    <tr>
                        <th style={{ padding: "10px 5px"}}>No.</th>
                        <th style={{ padding: "10px 5px"}}>Name</th>
                        <th style={{ padding: "10px 5px"}}>Age</th>
                        <th style={{ padding: "10px 5px"}}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((row, index) => {
                            return (
                                <tr key={index} style={{background: "#edf7f6"}}>
                                    <td>{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.age}</td>
                                    <td style={{display: "flex", gap:"10px", justifyContent: "center"}}>
                                        <button onClick={() => handleEdit(index)} style={{padding: "2px", color: "white", background: "steelblue", border: "none", borderRadius: "5px", cursor:"pointer"}}> <IconEdit /> </button>
                                        <button onClick={() => removeRow(index)} style={{padding: "2px", color: "white", background: "red", border: "none", borderRadius: "5px", cursor:"pointer"}}> <IconTrash /> </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        { showModal &&  <ModalComponent id={id} /> }
        </div>
    )
}

export default Table
