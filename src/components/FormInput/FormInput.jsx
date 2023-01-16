import { ErrorMessage, getIn } from 'formik';
import {
  StyledErrorMessage,
  StyledFormInput,
  StyledFormLabel,
} from './FormInput.styled';

export default function FormInput({
  children,
  field,
  form: { touched, errors },
  ...props
}) {
  const checkIsValid = () => {
    const message = getIn(errors, field.name);

    return !message;
  };

  return (
    <StyledFormLabel>
      {children}
      <StyledFormInput
        {...field}
        {...props}
        isValid={checkIsValid()}
        touched={touched[field.name]}
      />

      <StyledErrorMessage>
        <ErrorMessage name={field.name} />
      </StyledErrorMessage>
    </StyledFormLabel>
  );
}