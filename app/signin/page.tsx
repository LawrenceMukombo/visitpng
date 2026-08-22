import SignInForm from "./SignInForm";
import { safeReturnPath } from "../auth";

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ return_to?: string }> }) {
  const params = await searchParams;
  return <SignInForm returnTo={safeReturnPath(params.return_to || "/")} />;
}
