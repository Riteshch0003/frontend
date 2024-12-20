import { useState } from "react";
import MainScreen from "../../components/MainScreen";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { createNoteAction } from "../../components/actions/notesAction";
import ReactMarkdown from "react-markdown";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Form,
} from "react-bootstrap";

function CreateNote({}) {
  const naviagate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;
  console.log(note);
  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
  const submitHanler = (e) => {
    e.preventDefault();
    if (!title || !content || !category) return;
    dispatch(createNoteAction(title, content, category));

    resetHandler();
    naviagate("/mynotes");
  };
  return (
    <MainScreen title="Create a Note">
      <Card>
        <CardHeader>Create a new Note</CardHeader>
        <CardBody>
          <Form onSubmit={submitHanler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </CardBody>
        <Card.Footer className="text-muted">
          {" "}
          Creating on-{new Date().toLocaleDateString}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}
export default CreateNote;
