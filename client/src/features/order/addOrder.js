import { Button } from "primereact/button"
import { Checkbox } from "primereact/checkbox"
import { Dialog } from "primereact/dialog"
import { Dropdown } from "primereact/dropdown"
import { InputTextarea } from "primereact/inputtextarea"
import { Toast } from "primereact/toast"
import React, { useEffect, useRef, useState } from "react"
import { useAddOrderMutation } from "./ordersApiSlice"
import { useGetProductsQuery } from "../product/productsApiSlice"
import { InputNumber } from "primereact/inputnumber"
import { useGetUsersQuery } from "../manager/usersApiSlice"

const AddOrder = () => {

    const [newOrder, setNewOrder] = useState({
        _id: '',
        userName: '',
        price: 0,
        paid: false,
        payment: 'מזומן',
        comment: '',
        productsList: []
    })

    const [addOrder] = useAddOrderMutation()
    const [orderDialog, setOrderDialog] = useState(false)
    const toast = useRef(null);
    const { data: products, isLoading: isLoad, isError: isErr, error: err, isSuccess } = useGetProductsQuery()
    const { data, isLoading, isError, error } = useGetUsersQuery()
    useEffect(() => {
        if (isSuccess) {
            const newList = []
            products.map(p => {
                newList.push({ prod: p, quantity: 0 })
            })
            setNewOrder({ ...newOrder, productsList: newList })
            console.log("lllllllll ", newOrder.productsList);
        }
    }, [products])
    if (isLoad) return <h1>Loading</h1>
    if (isErr) return <h2>{err}</h2>
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    const usernames = data.map(e => e.userName)
    const saveOrd = async () => {
        let price = 0
        const newList =newOrder.productsList.filter(p => Number(p.quantity) > 0)
        newList.map(p =>{
            debugger
            price = price + Number(p.quantity) * Number(p.prod.price)
            setNewOrder({...newOrder,price})
            console.log("price  " + newOrder.price);       
         })
       
        setNewOrder({ ...newOrder, productsList: newList,price })
        const { error: err } = await addOrder(newOrder)
        if (!err) {
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Ord Created', life: 3000 });
        }
        else toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
        setOrderDialog(false);

    };
    const handleChange = (prod) => {
        const quantity = Number(document.getElementById(prod.name).getElementsByTagName('input')[0].ariaValueNow)
        let newList = newOrder.productsList
        newList.map(p => {
            if (prod == p.prod)
                p.quantity = quantity
        })
        setNewOrder({ ...newOrder, productsList: newList });
    }

    const dialogFooter = (
        <React.Fragment>
            <Button label="ביטול" icon="pi pi-times" outlined onClick={() => setOrderDialog(false)} />
            <Button label="אישור" icon="pi pi-check" onClick={saveOrd} />
        </React.Fragment>
    )
    return (
        <>
            <Button label="הוספת הזמנה" icon="pi pi-plus" severity="success" onClick={() => setOrderDialog(true)} />
            <Toast ref={toast} />
            <Dialog visible={orderDialog} style={{ direction: 'rtl' }} header="הוסף הזמנה" modal className="p-fluid" footer={dialogFooter} onHide={() => setOrderDialog(false)}>
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        שם משתמש
                    </label>
                    <Dropdown name="userName" value={newOrder.userName} onChange={(e) => { setNewOrder({ ...newOrder, userName: e.target.value }) }}
                        rules={{ required: 'שדה חובה' }}
                        options={usernames}
                        className="w-full md:w-14rem" />
                </div>
                {products.map(e => {
                    return <div>
                        <div>{e.name}</div>
                        <InputNumber value={0} defaultValue={0} min={0} id={e.name} onChange={() => handleChange(e)}></InputNumber>
                    </div>
                })}
                <div className="field">
                    <label className="mb-3 font-bold">תשלום</label>
                    <Checkbox name="paid" checked={newOrder.paid} onChange={(e) => { setNewOrder({ ...newOrder, paid: e.checked }) }} />
                    <label htmlFor="paid">האם שולם</label>
                    <div className="field">
                        <div> <label className="font-bold" htmlFor="payment">אמצעי תשלום</label></div>
                        <Dropdown name="payment" value={newOrder.payment} onChange={(e) => { setNewOrder({ ...newOrder, payment: e.target.value }) }}
                            options={['נדרים פלוס', "צ'ק", 'מזומן']}
                            className="w-full md:w-14rem" />
                    </div>

                    <div className="field">
                        <label className="mb-3 font-bold">הוספת הערה</label>
                        <span className="p-float-label">
                            <InputTextarea id="description" value={newOrder.comment} onChange={(e) => setNewOrder({ ...newOrder, comment: e.target.value })} rows={3} cols={20} />
                        </span>
                    </div>
                </div>
            </Dialog ></>)
}
export default AddOrder