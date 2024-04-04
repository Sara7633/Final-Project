import Navbar from "../../components/Navbar"
import React, { useEffect, useState } from 'react';
import { useCompleteMutation, useGetBasketQuery } from "./ordersApiSlice";
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";

const OkOrder = () => {
    const [selectedPayments, setSelectedPayments] = useState(null);
    const[price,setPrice]=useState(0)
    const payments = [  
        { name: 'מזומן'},
        { name: 'נדרים פלוס' },
        { name: "צ'ק" }

    ];
    const [comment,setComment]=useState("")
    const navigate = useNavigate()
    const [complete] = useCompleteMutation()
    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );
   
    const { data, isSuccess, isLoading, isError, error } = useGetBasketQuery()
    useEffect(()=>{
        data.map(item => {
        setPrice (price + item.quantity * item.prod.price)})
    },[])
    if (!isSuccess) return <h1>!success</h1>
    if (isError) return <h2>{error}</h2>
    if (isLoading) return <h1>Loading</h1>
    if (data.length === 0)
        return <h1>אין מוצרים בהזמנה</h1>
    
    

    return (
        <>
        <nav style={{position:"fixed",width:"100%",zIndex:10}}>
            <Navbar/></nav>
            <div className="card flex justify-content-center" style={{zIndex:1,padding:"150px"}} >
                <Card style={{textAlign:"center", direction: 'rtl' }} title="אשר הזמנה" subTitle="פרטי ההזמנה" header={header} className="md:w-25rem">
                    <DataTable value={data} showGridlines >
                        <Column style={{ textAlign: 'right' }} field="prod.name" header="שם מוצר"></Column>
                        <Column dataType="input" style={{ textAlign: 'right' }} field="quantity" header="כמות"></Column>
                    </DataTable>
                    <h1>סה"כ לתשלום {price}</h1>
                       
                    <div style={{margin:"10%"}}>
                         <h4>בחר אמצעי תשלום</h4>
                        <select onChange={e => {setSelectedPayments(e.target.value)}} required
                        style={{fontSize:"15pt"}}>
                            {payments.map((option, index) => {
                                return (
                                    <option key={index}>
                                        {option.name}
                                    </option>
                                );
                            })}
                        </select>
                        {selectedPayments==="נדרים פלוס"?<div><a href="https://www.matara.pro/nedarimplus/online/?mosad=7003662" target="_blank">לתשלום בנדרים פלוס בתוספת 2%</a></div>:""}
                    </div>
                    <div className="field">
                        <label className="mb-3 font-bold">הוספת הערה</label>
                        <span className="p-float-label">
                            <InputTextarea id="description" value={comment} onChange={(e) => setComment(e.target.value)} rows={3} cols={20} />
                        </span>
                    </div>
                    <Button label="ביטול" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }}
                        onClick={() => navigate("/user/orders")} />
                    <Button type="submit" label="אישור" className="mt-2" icon="pi pi-check" onClick={()=>{complete({ payment: selectedPayments ,price,comment});navigate("/user/orders")}}
                    />
                </Card>
            </div>

        </>
    )
}
export default OkOrder