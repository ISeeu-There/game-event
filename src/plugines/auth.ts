import { auth } from "../plugines/firebase";

export const requireAuth = (to: any, from: any, next: any) => {
  const user = auth.currentUser;

  if (!user) {
    // user not logged in
    next({ path: "/" }); // redirect to login
  } else {
    next(); // allow access
  }
};
