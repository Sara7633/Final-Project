
import React from 'react';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import Login from '../features/auth/Login'
const Home = () => {
    const navigate = useNavigate()
   
    const handleRegister = () => {
        navigate('/register')
    }
    return (<>
        <div className="card" style={{ marginTop: '10%' }}>
            <div className="flex flex-column md:flex-row">
                <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                    <Button 
                    label="משתמש חדש" 
                    icon="pi pi-user-plus" 
                    severity="success" 
                    className="w-10rem"
                    onClick={handleRegister}></Button>
                </div>
                <div className="w-full md:w-2">
                    <Divider layout="vertical" className="hidden md:flex">
                        <b>או</b>
                    </Divider>
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
                    <Login/>
                </div>
            </div>
        </div>
    </>)
}
export default Home
