import LoginForm from "./components/login-form";

function LoginPage() {
  return (
    <main className='w-screen h-screen overflow-hidden'>
      <div className='container h-full  mx-auto'>
        <div className='w-full h-full flex justify-center items-center '>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
