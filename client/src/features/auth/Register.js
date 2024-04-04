import React, { useEffect, useState } from 'react';
import { useRegisterMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [registerFunc, { isError,isSuccess, data }] = useRegisterMutation()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    useEffect(() => {
        if (isSuccess) {
            console.log("data in is sucssess",data);
            dispatch(setToken(data))
            navigate("/user")
        }
    }, [isSuccess])
    
    useEffect(() => {
        if (isError) {
            alert("שם משתמש קיים כבר במערכת")
        }
        
    }, [isError])
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const handleSubmit = (e) => {
        console.log({ userName, password });
        e.preventDefault();
        registerFunc({ userName, password,phone,email })
    };
    return (
        <><div className="card flex justify-content-center" style={{ margin: '5%', direction: 'rtl' }}>
            <Card title="כניסה למערכת" subTitle="אנא הכנס פרטי משתמש" header={header} className="md:w-25rem" >
                <div className="card flex justify-content-center">
                    <form className="flex flex-column gap-2">
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>
                                <label>שם משתמש</label>
                                <InputText 
                                autoFocus
                                required
                                 rules={{ required: 'שדה חובה' }}
                                 style={{ width: 276}}
                                 onChange={(e) => setUserName(e.target.value)} />
                            </div>
                        </div>
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>
                                <label>סיסמא</label>
                                <Password 
                                required  
                                onChange={(e) => setPassword(e.target.value)} 
                                feedback={false} 
                                tabIndex={1} 
                                toggleMask />
                            </div>
                        </div>
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>
                                <label htmlFor="username">מס' טלפון</label>
                                <InputText 
                                 required
                                 style={{ width: 276 }}
                                 onChange={(e) => setPhone(e.target.value)}/>
                                
                            </div>
                        </div>
                        <div className="card flex justify-content-center">
                            <div className="flex flex-column gap-2" dir='rtl'>
                                <label htmlFor="username">כתובת מייל</label>
                                <InputText
                                type='email' 
                                 style={{width: 276}}
                                 onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <Button 
                        type="submit" 
                        label="כניסה" 
                        style={{ width: 276,marginTop:'20px'}}
                        onClick={handleSubmit} />
                    </form>
                </div>
            </Card>
        </div></>
    )
}
export default Register
