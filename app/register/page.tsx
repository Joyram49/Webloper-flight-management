import RegistrationForm from "./components/registration-form";

function RegistrationPage() {
  return (
    <main className='w-screen h-screen overflow-hidden'>
      <div className='container h-full  mx-auto'>
        <div className='w-full h-full flex justify-center items-center '>
          <RegistrationForm />
        </div>
      </div>
    </main>
  );
}

export default RegistrationPage;
