import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';
// imported useQuery and useMutation. As well as Remove_book and Get_me from queries/mutations
import { useQuery, useMutation } from '@apollo/client'
import { REMOVE_BOOK } from '../utils/mutations'
import { GET_ME } from '../utils/queries'

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // useQuery that save GET_ME info to userData variable, if there is none it returns an empty object
  const { loading, error, data } = useQuery(GET_ME);
  const userData = data?.me || { savedBooks: [] };

  const [removeBookMutation] = useMutation(REMOVE_BOOK);

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getProfile() : null;

    if (!token) {
      return false;
    }
    
    const coolerBookId = bookId

    try {
      // calls the remove mutation using the variable of bookId, then requeries GET_ME
      await removeBookMutation({
        variables: { 
          user: token.data._id,
          bookId: coolerBookId
        },
        refetchQueries: [{ query: GET_ME }],
      });

      // upon success, remove book's id from localStorage
      removeBookId(bookId);

    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // if an error exists, say so
  if (error) {
    console.error(error);
    return <h2>Error loading data</h2>;
  }

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks?.map((book) => {
            return (
              <Col key={book.bookId} md="4">
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
