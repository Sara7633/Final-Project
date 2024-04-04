
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import React, {  useState } from 'react';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { removeToken } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const NavbarManager = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const[logoutVisible,setLogoutVisible]=useState(false)
    const itemRenderer = (item) => (

        <a className="flex align-items-center p-menuitem-link" onClick={() => myNavigate(item)}>
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );

    const myNavigate = (item) => {
        switch (item.label) {
            case "מוצרים":
                navigate('/manager/products')
                break;
            case "משתמשים":
                navigate('/manager/users')
                break;
            case 'כלל ההזמנות':
                navigate('/manager/orders')
                break;
            case 'סיכום':
                navigate('/manager/conclude')
                break;
            default:
                break;
        }
    }
    const items = [
        {
            label: 'מוצרים',
            icon: 'pi pi-th-large',
            template: itemRenderer
        },
        {
            label: 'כלל ההזמנות',
            icon: 'pi pi-history',
            template: itemRenderer
        },
        {
            label: 'משתמשים',
            icon: 'pi pi-envelope',
            template: itemRenderer
        },
        {
            label: 'סיכום',
            icon: 'pi pi-envelope',
            template: itemRenderer
        }
    ];
    const start = (
        <div className="flex align-items-center gap-2">
            <img src={require("../picture/trans.png")} width="150" />
        </div>
    );
    const end = (
        <div style={{ position: 'absolute', left: "3%",top:"20%" }} >
            <div className="flex align-items-center gap-2">
                <Button icon='pi pi-user' label='יציאה' onClick={() => setLogoutVisible(true)} ></Button>
            </div></div>

    );
    const logoutDialogFooter = (
        <React.Fragment>
            <Button label="אישור" icon="pi pi-check" autoFocus onClick={()=>{logout()}} />
            <Button label="ביטול" icon="pi pi-times" outlined onClick={()=>setLogoutVisible(false)} />
        </React.Fragment>
    );
    const logout=()=>{
        setLogoutVisible(false); 
        dispatch(removeToken())
        navigate('/')
    }

    return (
<>
        <div className="card">
            <Menubar  model={items} start={start} end={end} style={{direction:'rtl'}} />
        </div>
         <Dialog visible={logoutVisible} style={{direction:'rtl'}} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="אזהרה" modal footer={logoutDialogFooter} onHide={()=>setLogoutVisible(false)}>
         <div className="confirmation-content">
             <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                 <span>
                     האם אתה בטוח שברצונך לצאת מהמערכת?
                 </span>
         </div>
     </Dialog></>
    )
}
export default NavbarManager
