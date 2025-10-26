import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Консультант Admin - SignUpForm",
  description: "This is Консультант Admin SignUpForm Page",
};

export default function SignUp() {
  return <SignUpForm />;
}
    