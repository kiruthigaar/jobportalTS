import React from 'react';
import { Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { RootState } from './store'; // Adjust the path if necessary

interface FormValueItem {
  First_name: string;
  Last_name: string;
  email: string;
  option: string[];
  content?: string;
}

const Pdfcontent: React.FC = () => {
  // Access the array of form values from the Redux state
  const formValues = useSelector((state: RootState) => state.formvalue.items) as FormValueItem[];
  const content = useSelector((state: RootState) => state.formvalue.content);

  return (
    <div>
      {formValues.length > 0 ? (
        formValues.map((item, index) => (
          <Form key={index} style={{ marginTop: '50px' }}>
            <Form.Group controlId={`formFirstName-${index}`}>
              <Form.Label className='lableDetail'>First Name</Form.Label>
              <span className='details'>{item.First_name || 'N/A'}</span>
            </Form.Group>

            <Form.Group controlId={`formLastName-${index}`}>
              <Form.Label className='lableDetail'>Last Name</Form.Label>
              <span className='details'>{item.Last_name || 'N/A'}</span>
            </Form.Group>

            <Form.Group controlId={`formEmail-${index}`}>
              <Form.Label className='lableDetail'>Email</Form.Label>
              <span className='details'>{item.email || 'N/A'}</span>
            </Form.Group>

            <Form.Group controlId={`formSkills-${index}`}>
              <Form.Label className='lableDetail'>Skills</Form.Label>
              <span className='details'>{item.option.join(', ') || 'N/A'}</span> {/* Joining array values */}
            </Form.Group>

            {/* Uncomment and use if you have rich text content */}
            <Form.Group controlId={`formAboutMe-${index}`}>
              <Form.Label className='lableDetail'>About Me</Form.Label>
              <span className='details'>{content || 'N/A'}</span>
            </Form.Group>
          </Form>
        ))
      ) : (
        <p>No form values available.</p>
      )}
    </div>
  );
};

export default Pdfcontent;
