import Form from './styles/Form';
import useForm from '../lib/useForm';

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
  });
  return (
    <Form method="post">
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
          />
          <button type="submit">Sign In</button>
        </label>
      </fieldset>
    </Form>
  );
}
