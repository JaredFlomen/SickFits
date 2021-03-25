// Simplest, it's a yes or no depending on session

export function isSignedIn({ session }) {
  //If session is undefined (double !!) will return false (not signed in)
  return !!session;
}