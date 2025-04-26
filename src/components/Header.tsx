import logo from '../logo.svg'
import { Link } from '@tanstack/react-router';

export default function Header() {

  return (
    <header className="bg-white shadow-md text-white text-[calc(10px+2vmin)] sticky top-0 z-10">
      <div className="max-w-[1400px] mx-auto flex px-4 flex-row items-center justify-between">
        <Link to="/">
          <img src={logo} className="h-16 pointer-events-none animate-[spin_20s_linear_infinite]" alt="logo" />
        </Link>
            
        <nav>
          <ul className="flex flex-row items-center gap-4">
            <li>
              <Link
                to="/hotels"

                activeProps={{ className: 'text-primary bg-muted' }}
                className='flex h-7 text-lg items-center justify-center rounded-full px-4 text-center font-medium text-muted-foreground transition-colors hover:text-primary'
                >
                Hoteles
              </Link>
            </li>
            <li>
              <Link
                to="/rooms"
                activeProps={{ className: 'text-primary bg-muted' }}
                className='flex h-7 text-lg items-center justify-center rounded-full px-4 text-center font-medium text-muted-foreground transition-colors hover:text-primary'
              >
                Acomodaciones
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}