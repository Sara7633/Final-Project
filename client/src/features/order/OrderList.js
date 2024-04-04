import React, { useState } from 'react';
import { useAddCommentMutation, useGetOrdersQuery } from './ordersApiSlice';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Navbar from '../../components/Navbar';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
const OrderList = () => {
    const { data, isLoading, isError, error } = useGetOrdersQuery()
    const [addComment] = useAddCommentMutation()
    const [comment, setComment] = useState("")
    const [id, setId] = useState(null)
    const [visibleComment, setVisibleComment] = useState(false)
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    const commentAdd = () => {
        addComment({ _id: id, comment })
        setId(null)
        setVisibleComment(false)
    }
    return (
        <>
            <nav style={{ position: "fixed", width: "100%",zIndex:10 }}>
                <Navbar /></nav>
            <div style={{ padding: "150px",zIndex:1 }}>
                {data.map(e => {
                    return <div style={{ direction: 'rtl' }} className="card">
                        <div>{e.orderDate}</div>
                        <div>{e.price}</div>
                        <div>{e.paid}</div>
                        <div>{e.price - e.paid}</div>
                        <div>{e.payment}</div>
                        <div>
                            <Button label="להוספת הערה" icon="pi pi-plus" onClick={() => { setVisibleComment(true); setId(e._id) }}></Button>
                        </div>
                        <DataTable value={e.productsList} showGridlines >
                            <Column style={{ textAlign: 'right' }} field="prod.name" header="שם מוצר"></Column>
                            <Column style={{ textAlign: 'right' }} field="prod.price" header="מחיר ליחידה"></Column>
                            <Column style={{ textAlign: 'right' }} field="quantity" header="כמות"></Column>
                        </DataTable>
                    </div>
                })}
                <Dialog visible={visibleComment} onHide={() => setVisibleComment(false)}>
                    <div className="field" style={{ direction: 'rtl' }}>
                        <label className="mb-3 font-bold">הוספת הערה</label>
                        <span className="p-float-label">
                            <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} cols={20} />
                            <div>
                                <Button label="אישור ההערה" icon="pi pi-plus" onClick={() => commentAdd()}></Button>
                            </div>
                        </span>
                    </div>
                </Dialog>
            </div>
        </>
    );
};
export default OrderList;

