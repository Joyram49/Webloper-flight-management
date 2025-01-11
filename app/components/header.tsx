import Link from "next/link";

function Header() {
  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <nav className='container mx-auto flex justify-between items-center py-4 px-6'>
        <Link href='/'>
          <h1 className='text-2xl font-bold text-blue-600'>Dashboard Pro</h1>
        </Link>
        <ul className='flex space-x-6'>
          <li>
            <Link
              href='/login'
              className='text-gray-700 hover:text-blue-600 transition'
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href='/register'
              className='text-gray-700 hover:text-blue-600 transition'
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              href='/dashboard'
              className='text-gray-700 hover:text-blue-600 transition'
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
