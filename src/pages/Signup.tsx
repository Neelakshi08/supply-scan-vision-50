
import React from "react";
import Layout from "@/components/Layout";
import SignupForm from "@/components/SignupForm";

const Signup = () => {
  return (
    <Layout className="py-24 px-4 flex items-center justify-center min-h-screen bg-gradient-to-tr from-background to-muted/50">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default Signup;
