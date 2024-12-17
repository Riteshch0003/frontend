import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';

const MyNotes = () => {
  const [notes,setNotes]=useState([])
  const deletehandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // Add delete functionality here
    }
  };
  const fetchNotes=async()=>{
    const {data}=await axios.get('/api/notes')
    setNotes(data);
    console.log(data); 
  }
      console.log(notes); 

  useEffect(()=>{
      fetchNotes();
  },[])

  return (
    <MainScreen title="Welcome Back Ritesh Chopra">
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      <Accordion>
        {notes.map((note) => (
          <Accordion.Item eventKey={note._id} key={note._id}>
            {/* Note header with Edit and Delete buttons */}
            <Card.Header style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Accordion.Header as="span" style={{ fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
                {note.title}
              </Accordion.Header>
              <div>
                <Link to={`/note/${note._id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deletehandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>

            {/* Accordion Body (collapsing section) with content */}
            <Accordion.Body>
              <Card.Body>
                <h4>
                  <Badge bg="success">Category {note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    {/* Assuming note.date exists and is a valid date */}
                    Created on - {new Date(note.date).toLocaleDateString()}
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </MainScreen>
  );
};

export default MyNotes;
