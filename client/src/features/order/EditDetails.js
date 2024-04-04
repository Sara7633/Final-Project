import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

const EditDetails=(props)=>{
    const [visible,setVisible]=useState(false)
    return(<>
    <Button icon='pi pi-chevron-down' onClick={() => setVisible(true)}></Button>
    <Dialog visible={visible} onHide={() => setVisible(false)}>
                <DataTable value={props.order.productsList} showGridlines style={{ direction: "rtl" }} >
                    <Column style={{ textAlign: 'right' }} field="prod.name" header="שם הזמנה"></Column>
                    <Column style={{ textAlign: 'right' }} field="quantity" header="כמות"></Column>
                </DataTable>
            </Dialog>
    </>)
}

export default EditDetails