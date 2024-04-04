import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderMutation } from './ordersApiSlice';
import EditDetails from './EditDetails';
import NavbarManager from '../../components/NavbarManager';
import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import Comments from './Comments';
import AddOrder from './addOrder';


const OrdersManager = () => {
    let emptyOrd = {
        _id: '',
        userName: '',
        price: 0,
        paid: false,
        payment: 'מזומן',
        comment: '',
        productsList: []
    };
    // const [comment,setComment]=useState("")
    const [orders, setOrders] = useState(null);
    const [ordDialog, setOrdDialog] = useState(false);
    const [deleteOrdDialog, setDeleteOrdDialog] = useState(false);
    const [ord, setOrd] = useState(emptyOrd);
    const [selectedOrders, setSelectedOrders] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [updateOrder] = useUpdateOrderMutation()
    const [deleteOrder] = useDeleteOrderMutation()

    const { data, isLoading, isError, error } = useGetOrdersQuery()

    useEffect(() => {
        setOrders(data)
    }, [data]);


     if (isLoading) return <h1>Loading</h1>
     if (isError) return <h2>{error}</h2>
    const hideDialog = () => {
        setOrdDialog(false);
    };

    const hideDeleteOrdDialog = () => {
        setDeleteOrdDialog(false);
    };

    const updateList = async (oldProd, newQuantity) => {
        let tempList = [...ord.productsList]
        tempList = await tempList.filter(p => {
            if (p.prod._id === oldProd.prod._id)
                p = { prod: p.prod, quantity: Number(newQuantity) }
            return p.quantity > 0
        })
        setOrd({ ...ord, productsList: tempList });
    }
    const saveOrd = async () => {
        debugger

        console.log(ord);
        const { error: err } = await updateOrder(ord)
        if (!err) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ord Created', life: 3000 });
        }
        else toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
        setOrdDialog(false);
        setOrd(emptyOrd);

    };

    const editOrd = (order) => {
        setOrd({ _id: order._id, userName: order.user.userName, price: order.price, paid: order.paid, payment: order.payment, productsList: order.productsList, comment: "" });
        console.log(ord);
        setOrdDialog(true);
    };

    const confirmDeleteOrd = (rowData) => {
        setOrd({ ...ord, _id: rowData._id })

        setDeleteOrdDialog(true);
    };

    const deleteOrd = () => {
        const { error: e } = deleteOrder({ _id: ord._id })
        setDeleteOrdDialog(false);
        setOrd(emptyOrd);
        if (!e) toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ord Deleted', life: 3000 });
        else toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };


    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
               <AddOrder/>
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };


    const priceBodyTemplate = (rowData) => {
        return "₪" + rowData.price
    };



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editOrd(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteOrd(rowData)} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between" style={{ direction: 'rtl' }}>
            <h4 className="m-0">ניהול הזמנות</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="חיפוש..." />
            </span>
        </div>
    );
    const ordDialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="אישור" icon="pi pi-check" onClick={saveOrd} />
        </React.Fragment>
    );
    const deleteOrdDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteOrdDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteOrd} />
        </React.Fragment>
    );

    const bodyDetails = (rowData) => {
        return (

            <EditDetails order={rowData} />)

    }
    const bodyComments = (rowData) => {
        return (

            <Comments order={rowData} />)

    }
    const paid = (rowData) => {
        if (rowData.paid === true) {
            return <Button icon='pi pi-check' disabled></Button>
        }
        else return <Button icon='pi pi-times' disabled></Button>
    }

    return (
        <div>
           <nav style={{position:"fixed",width:"100%",zIndex:10}}>
            <NavbarManager/></nav>
            <Toast ref={toast} />
            <div className="card" style={{ direction: "rtl", padding: "150px" ,zIndex:1}}>
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={orders} selection={selectedOrders} onSelectionChange={(e) => setSelectedOrders(e.value)}
                    globalFilter={globalFilter} header={header}>
                    <Column field="user.userName" header="שם משתמש" sortable style={{ textAlign: "right" }}></Column>
                    <Column field="orderDate" header="תאריך הזמנה" sortable style={{ textAlign: "right" }}></Column>
                    <Column field="price" header="מחיר" body={priceBodyTemplate} style={{ textAlign: "right" }}></Column>
                    <Column style={{ textAlign: 'right' }} field="paid" header="האם שולם" body={paid} dataType='boolean'></Column>
                    <Column field="payment" header="אמצעי תשלום" style={{ textAlign: "right" }}></Column>
                    <Column header="פירוט הזמנה" bodyClassName="text-right" field="_id" body={bodyDetails} />
                    <Column header="הערה" bodyClassName="text-right" body={bodyComments} />
                    <Column body={actionBodyTemplate} exportable={false} style={{ textAlign: "right" }}></Column>
                </DataTable>
            </div>
            <Dialog visible={ordDialog} style={{ direction: 'rtl' }} header="עדכן פרטי הזמנה" modal className="p-fluid" footer={ordDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        שם משתמש
                    </label>
                    <InputText id="name" value={ord.userName} disabled />
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">תשלום</label>
                    <Checkbox name="paid" checked={ord.paid} onChange={(e) => { setOrd({ ...ord, paid: e.checked }) }} />
                    <label htmlFor="paid">האם שולם</label>
                <div className="field">
                   <div> <label className="font-bold" htmlFor="payment">אמצעי תשלום</label></div>
                    <Dropdown name="payment" value={ord.payment} onChange={(e) => { setOrd({ ...ord, payment: e.target.value }) }}
                        options={['נדרים פלוס', "צ'ק", 'מזומן']}
                        className="w-full md:w-14rem" />
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">עדכון מוצרים</label>
                    {ord.productsList.map(item => {
                        return <>
                            <div>{item.prod.name}</div>
                            <InputNumber value={item.quantity} onChange={(e) => { updateList(item, e.value) }} />
                        </>
                    })}
                </div>
                <div className="field">
                    <label className="mb-3 font-bold">הוספת הערה</label>
                    <span className="p-float-label">
                        <InputTextarea id="description" value={ord.comment} onChange={(e) => setOrd({ ...ord, comment: e.target.value })} rows={3} cols={20} />
                    </span>
                </div>
        </div>
            </Dialog >
    <Dialog visible={deleteOrdDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteOrdDialogFooter} onHide={hideDeleteOrdDialog}>
        <div className="confirmation-content">
            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
            {ord && (
                <span>
                    האם אתה בטוח שברצונך למחוק את ההזמנה?
                </span>
            )}
        </div>
    </Dialog>


        </div >
    );
}



export default OrdersManager
