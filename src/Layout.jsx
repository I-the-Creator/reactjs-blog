import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { DataProvider } from "./context/dataContext"

const Layout = ({ search, setSearch }) => {

    return (
        <div className="App">
            <Header title="I-The-Creator. React JS Blog" />
            <DataProvider>
                <Nav />
                <Outlet />
            </DataProvider>
            <Footer />
        </div>
    )
}

export default Layout
