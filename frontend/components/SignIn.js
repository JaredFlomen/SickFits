import Form from './styles/Form';

export default function SignIn() {
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
