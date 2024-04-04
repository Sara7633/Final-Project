import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";

const Comments = (props) => {
    const [visible, setVisible] = useState(false)
    // console.log(props.order);
    return (<>
        <Button icon='pi pi-chevron-down' onClick={() => setVisible(true)}></Button>
        <Dialog visible={visible} onHide={() => setVisible(false)}>
            {props.order.comments.map(c=><div>{c}</div>)}
        </Dialog>
    </>)
}

export default Comments