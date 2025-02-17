import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className='bg-neutral-100 border-b-2'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center px-3 py-4'>
          <nav>
            <ul className='flex items-center gap-2  '>
              <li>
                <Link to='/'>首頁</Link>
              </li>
            </ul>
          </nav>
          <Link to='/login'>
            <Button>登入</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
