import React, { useEffect, useState } from 'react';
import { useLoginMutation, useSendEmailMutation } from './authApiSlice';
import { setToken } from './authSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { useUpdateUserMutation } from '../manager/usersApiSlice';
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [loginFunc, { isError, isSuccess, data }] = useLoginMutation()
    const[sendEmail]=useSendEmailMutation()
    const [updateUser]=useUpdateUserMutation()

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [pass,setPass]=useState(0);
    const [code,setCode]=useState(0);
    const [newPass,setNewPass]=useState(0);

    const [sendEmailVisible,setSendEmailVisible]=useState(false)
    const [newPassVisible,setNewPassVisible]=useState(false);

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            if (data.role === "מנהל")
                navigate("/manager/orders")
            else navigate("/user")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            alert("השם או הסיסמא אינם נכונים")
        }

    }, [isError])
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
    const handleSubmit = (e) => {
        console.log({ userName, password });
        e.preventDefault();
        loginFunc({ userName, password })
    };
  
    const handleOK=async()=>{
       setSendEmailVisible(false) 
       if(code==pass)
       setNewPassVisible(true)
   }
   const handleNewPassword=async()=>{
        setNewPassVisible(false);
        
        const {data,isError}=await updateUser({userName,password:newPass})
  
        console.log(data);
   }
   const sendPassToEmail=async()=>{
       setSendEmailVisible(true)
       const { data } = await sendEmail({ userName });
       
       setPass(data.code)
       
   }
    const sendEmailFooter = (
        <React.Fragment>
            <div style={{ marginBottom:"4%"  }}>
                <InputText placeholder='קוד אימות' type='number' onChange={(e) => setCode(e.target.value)}/>
            </div>
            <Button style={{ width: "90%" }} label="אישור" icon="pi pi-check" autoFocus onClick={() => handleOK()} />
        </React.Fragment>
    );
    const newPassword = (
        <React.Fragment>
            <div style={{ marginBottom:"4%" }}>
                <InputText placeholder='סיסמא חדשה' type='number' onChange={(e) => setNewPass(e.target.value)} />
            </div>
            <Button style={{ width: "90%" }} label="אישור" icon="pi pi-check" autoFocus onClick={() => handleNewPassword()} />
        </React.Fragment>
    );

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
                                    style={{ width: 276 }}
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
                                    toggleMask/>
                            </div>
                        </div>
                        <Button type="submit" label="כניסה" onClick={handleSubmit} />
                    </form>

                </div>
                <br />
                <Link onClick={() =>sendPassToEmail()}>שכחתי סיסמא</Link>
            </Card>
        </div>
            {/* <Dialog visible={forgotVisible} style={{ direction: 'rtl' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="אימות משתמש" modal footer={forgotFooter} onHide={() => setForgotVisible(false)}>
                <div className="confirmation-content">
                    <span>
                        אנא הכנס כתובת מייל אליה תקבל קוד לאימות
                    </span>
                    <br />

                </div>
            </Dialog> */}
            <Dialog visible={sendEmailVisible} style={{ direction: 'rtl',alignContent:'center' }} breakpoints={{ '460px': '75vw', '641px': '90vw' }} header="אימות משתמש" modal footer={sendEmailFooter} onHide={() => setSendEmailVisible(false)}>
                <div className="confirmation-content">
                    <span>
                        אנא הכנס את קוד האימות שנשלח למייל השמור במערכת
                    </span>
                    <br />
                </div>
            </Dialog>
            <Dialog visible={newPassVisible} style={{ direction: 'rtl',alignContent:'center' }} breakpoints={{ '460px': '75vw', '641px': '90vw' }} header="אימות משתמש" modal footer={newPassword} onHide={() => setNewPassVisible(false)}>
                <div className="confirmation-content">
                    <span>
                    נא הכנס סיסמא חדשה
                    </span>
                    <br />
                </div>
            </Dialog>
            </>
            
    )
}
export default Login
