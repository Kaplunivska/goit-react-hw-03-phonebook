import FormInput from 'components/FormInput';
import { Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { StyledFormButton, StyledForm } from './ContactForm.styled';
import { ContactFormPropTypes } from './ContactForm.type';

const initialValue = { name: '', number: '' };
const contactSchema = object({
  name: string()
    .min(3, ({ min }) => `Name must be at least ${min} characters`)
    .max(30, ({ max }) => `Name must be at most ${max} characters`)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces.'
    )
    .required('Name is a required'),
  number: string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Phone is a required'),
});

export default function ContactForm({ onSubmit }) {
  const submitHandler = (values, actions) => {
    onSubmit(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValue}
      validationSchema={contactSchema}
      onSubmit={submitHandler}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <StyledForm as={Form} autoComplete="off">
          <Field
            name="name"
            type="text"
            component={FormInput}
            placeholder="Name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          >
            Name
          </Field>
          <Field
            type="tel"
            name="number"
            component={FormInput}
            placeholder="Phone number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          >
            Phone number
          </Field>

          <StyledFormButton
            type="submit"
            disabled={!(isValid && dirty) || isSubmitting}
          >
            Add contact
          </StyledFormButton>
        </StyledForm>
      )}
    </Formik>
  );
}

ContactForm.propTypes = ContactFormPropTypes;