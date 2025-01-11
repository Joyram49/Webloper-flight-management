import Link from "next/link";

const LandingPage = () => {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white'>
        <div className='container mx-auto text-center py-20 px-6'>
          <h2 className='text-5xl font-extrabold mb-6'>
            Streamline Your Workflow
          </h2>
          <p className='text-lg mb-8'>
            An all-in-one dashboard management tool to simplify your daily
            tasks, organize projects, and collaborate effortlessly.
          </p>
          <div className='flex justify-center space-x-4'>
            <Link
              href='/login'
              className='bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition'
            >
              Get Started
            </Link>
            <Link
              href='/register'
              className='bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-900 transition'
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 bg-gray-100'>
        <div className='container mx-auto text-center'>
          <h3 className='text-3xl font-bold mb-8'>Features</h3>
          <div className='grid md:grid-cols-3 gap-8'>
            <div className='p-6 bg-white shadow rounded-lg'>
              <h4 className='text-xl font-semibold mb-4'>Task Management</h4>
              <p>
                Organize your tasks efficiently with a user-friendly interface
                and real-time tracking.
              </p>
            </div>
            <div className='p-6 bg-white shadow rounded-lg'>
              <h4 className='text-xl font-semibold mb-4'>
                Collaboration Tools
              </h4>
              <p>
                Seamlessly collaborate with your team using chat, file sharing,
                and notifications.
              </p>
            </div>
            <div className='p-6 bg-white shadow rounded-lg'>
              <h4 className='text-xl font-semibold mb-4'>
                Analytics Dashboard
              </h4>
              <p>
                Get insights and detailed analytics to improve your project
                outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 bg-white'>
        <div className='container mx-auto text-center'>
          <h3 className='text-3xl font-bold mb-8'>What Our Users Say</h3>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            <div className='p-6 bg-gray-100 shadow rounded-lg'>
              <p className='italic'>
                &#34; This app has completely changed the way I manage my
                work!&#34;
              </p>
              <p className='mt-4 font-semibold'>- Sarah T.</p>
            </div>
            <div className='p-6 bg-gray-100 shadow rounded-lg'>
              <blockquote className='italic'>
                &#34;Highly recommend this tool for teams looking to increase
                productivity.&#34;
              </blockquote>
              <p className='mt-4 font-semibold'>- Mark R.</p>
            </div>
            <div className='p-6 bg-gray-100 shadow rounded-lg'>
              <p className='italic'>
                &#34;The best dashboard management app I&apos;ve ever used!&#34;
              </p>
              <p className='mt-4 font-semibold'>- Lisa K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white'>
        <div className='container mx-auto text-center'>
          <h3 className='text-3xl font-bold mb-6'>
            Ready to take your productivity to the next level?
          </h3>
          <Link
            href='/register'
            className='bg-white text-blue-600 px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition'
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
