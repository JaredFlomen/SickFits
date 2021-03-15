import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import DisplayError from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SignUp() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
  });
  const [signup, { data, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // Refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signup();
    console.log(res);
    resetForm();
    // Send the email and password to the graphQL API
  }
  return (
    <Form method="post" onSubmit={handleSubmit}>
      <h2>Sign Up For An Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email} - Please Sign In</p>
        )}
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
          <button type="submit">Sign In</button>
        </label>
      </fieldset>
    </Form>
  );
}
