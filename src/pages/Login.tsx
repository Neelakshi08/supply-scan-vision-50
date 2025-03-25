
import React from "react";
import Layout from "@/components/Layout";
import LoginForm from "@/components/LoginForm";

const Login = () => {
  return (
    <Layout className="py-24 px-4 flex items-center justify-center min-h-screen bg-gradient-to-tr from-background to-muted/50">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
