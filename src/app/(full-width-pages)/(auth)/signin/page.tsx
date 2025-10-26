import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Консультант Admin - Signin",
  description: "This is Консультант Admin Signin Page",
};

export default function SignIn() {
  return <SignInForm />;
}
