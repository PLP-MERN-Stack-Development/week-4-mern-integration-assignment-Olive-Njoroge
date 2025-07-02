import {Link} from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/solid';
import {Button} from '@/components/ui/button'

export default function NavBar(){
    return (
        <nav className="bg-gray-200 px-6 py-4 flex items-center">
          <div className="ml-auto flex items-center gap-4">
            <Link to="/" className="text-xl font-medium text-gray-800 hover:underline">
              Posts
            </Link>
    
            <Button asChild>
              <Link to="/create" className="flex items-center gap-2">
                <PlusIcon className="h-5 w-5" />
                Create Post
              </Link>
            </Button>
          </div>
        </nav>
      );
};