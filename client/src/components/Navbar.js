
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import React, { useRef, useState } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel'
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import Basket from '../features/order/Basket';
import { Dialog } from 'primereact/dialog';
import { Image } from 'primereact/image';
import { removeToken } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutVisible, setLogoutVisible] = useState(false)
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
                navigate('/user/products')
                break;
            case 'אזור אישי':
                navigate('/user/contact')
                break;
            case "ההזמנות שלי":
                navigate('/user/orders')
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
            label: 'ההזמנות שלי',
            icon: 'pi pi-history',
            template: itemRenderer
        },
        {
            label: 'אזור אישי',
            icon: 'pi pi-envelope',
            template: itemRenderer
        }
    ];
    const op = useRef(null);
    const start = (
        <div className="flex align-items-center gap-2">
            <img src={require("../picture/trans.png")} width="150" />
        </div>
    );

    const end = (
        <div style={{ position: 'absolute', left: "5%",top:"20%" }} >
            <div className="flex align-items-center gap-2">
                <Button icon="pi pi-shopping-cart" badge='3' rounded aria-label="Filter" onClick={(e) => op.current.toggle(e)} />
                <OverlayPanel ref={op}>
                    <Basket />
                </OverlayPanel>
                <Button icon='pi pi-user' label='יציאה' onClick={() => setLogoutVisible(true)} ></Button>
            </div></div>

    );
    const logout=()=>{
        setLogoutVisible(false); 
        dispatch(removeToken())
        navigate('/')
    }
    const logoutDialogFooter = (
        <React.Fragment>
            <Button label="אישור" icon="pi pi-check" autoFocus onClick={() => {logout()}} />
            <Button label="ביטול" icon="pi pi-times" outlined onClick={() => setLogoutVisible(false)} />
        </React.Fragment>
    );

    return (
        <>
            <div className="card">
                <Menubar style={{ direction: 'rtl' }} model={items} start={start} end={end} />
            </div>
            <Dialog visible={logoutVisible} style={{ direction: 'rtl' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="אזהרה" modal footer={logoutDialogFooter} onHide={() => setLogoutVisible(false)}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>
                        האם אתה בטוח שברצונך לצאת מהמערכת?
                    </span>
                </div>
            </Dialog>
        </>
    )
}
export default Navbar
