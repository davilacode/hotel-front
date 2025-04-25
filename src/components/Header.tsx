import logo from '../logo.svg'
import { Link, useMatchRoute } from '@tanstack/react-router';

export default function Header() {
  
  const matchRoute = useMatchRoute();
  const hotelsParams = matchRoute({ to: '/hotels' });

  const roomsParams = matchRoute({ to: '/rooms' });

  return (
    <header className="flex px-4 flex-row items-center justify-between bg-[#282c34] text-white text-[calc(10px+2vmin)]">
      <img src={logo} className="h-[6vmin] pointer-events-none animate-[spin_20s_linear_infinite]" alt="logo" />
      <nav>
        <ul className="flex flex-row gap-4">
          <li>
            <Link
              to="/hotels"
              className={hotelsParams ? 'text-blue-500' : ''}
            >
              Hoteles
            </Link>
          </li>
          <li>
            <Link
              to="/rooms"
              className={roomsParams ? 'text-blue-500' : ''}
            >
              Habitaciones
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}