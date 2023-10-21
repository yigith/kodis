import { Button, Card, Form } from "react-bootstrap";

function StartScreenCard({ headerTitle, buttonText, children, onSubmit}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit)
      onSubmit();
  };

  return (
    <Card className='h-100'>
      <Card.Header as="h5" className='text-center'>{headerTitle}</Card.Header>
      <Card.Body>
        <Form className='d-flex flex-column h-100' onSubmit={handleSubmit}>
          <div className="flex-fill d-flex flex-column justify-content-center mt-sm-1 mb-2">
            {children}
          </div>
          <div className='d-grid mt-auto'>
            <Button type="submit">{buttonText}</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default StartScreenCard;