import React from 'react'
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
        </>
    )
}

export default Layout;