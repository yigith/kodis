import { Button, Card, Form } from "react-bootstrap";

function StartScreenCard({ headerTitle, buttonText, children}) {
  return (
    <Card className='h-100'>
      <Card.Header as="h4" className='text-center p-3'>{headerTitle}</Card.Header>
      <Card.Body>
        <Form className='d-flex flex-column h-100'>
          <div className="flex-fill d-flex flex-column justify-content-center mt-2 mb-3">
            {children}
          </div>
          <div className='d-grid mt-auto'>
            <Button size="lg">{buttonText}</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default StartScreenCard;