import React, { useEffect, useMemo } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { DeleteNote, listNotes } from "../../components/actions/notesAction";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const MyNotes = ({ search = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.noteList?.loading);
  const error = useSelector((state) => state.noteList?.error);
  const notes = useSelector((state) => state.noteList?.notes || []);
  const userInfo = useSelector((state) => state.userLogin?.userInfo);
  const loadingDelete = useSelector((state) => state.noteDelete?.loading);
  const errorDelete = useSelector((state) => state.noteDelete?.error);

  // Fetch notes whenever the user logs in or the notes state is updated
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      dispatch(listNotes()); // Fetch updated list of notes
    }
  }, [dispatch, navigate, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(DeleteNote(id)); // Delete the note and re-fetch
    }
  };

  // Filter notes based on the search input
  const filteredNotes = useMemo(
    () =>
      notes.filter((note) =>
        note.title?.toLowerCase().includes(search.toLowerCase())
      ),
    [notes, search]
  );

  const isLoading = loading || loadingDelete;
  const hasError = error || errorDelete;

  return (
    <MainScreen title={`Welcome Back ${userInfo?.name}..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>

      {hasError && <ErrorMessage variant="danger">{hasError}</ErrorMessage>}

      {isLoading ? (
        <Loading />
      ) : filteredNotes.length === 0 ? (
        <div>No notes found</div>
      ) : (
        // Render notes
        filteredNotes.reverse().map((note, index) => (
          <Accordion key={note._id} defaultActiveKey="">
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <Accordion.Button as="div">{note.title}</Accordion.Button>
                </span>
                <div>
                  <Link to={`/note/${note._id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>

              {/* Content of the note that will be shown when the Accordion is expanded */}
              <Accordion.Collapse eventKey={String(index)}>
                <Card.Body>
                  <h4>
                    <Badge bg="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer className="blockquote-footer">
                      Created on{" "}
                      <cite title="Source Title">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </cite>
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))
      )}
    </MainScreen>
  );
};

export default MyNotes;
