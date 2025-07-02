import { Outlet } from 'react-router-dom';
import NavBar from './NavBar'

export default function Layout(){

    return(
        <div>
            <NavBar/>
            <main className="p-4">
                <Outlet /> {/* This is where PostList or PostForm will render */}
            </main>
        </div>
    )

}