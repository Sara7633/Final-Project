import React, { useState, useRef } from 'react';
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from './productsApiSlice';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import NavbarManager from '../../components/NavbarManager';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';

const ProductsManager = () => {
    const [deleteProduct] = useDeleteProductMutation()
    const [addProduct] = useAddProductMutation()
    const [updateProduct] = useUpdateProductMutation()
    const[productData,setProductData]=useState({})
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0
    })
    const [editProduct, setEditProduct] = useState({
        name: '',
        price: 0
    })
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);


    const toast = useRef(null);
    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'המוצר נמחק', life: 3000 });
    }
    const showInfo = () => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: 'המחיקה נדחתה', life: 3000 });
    }
    const showError = () => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'לא ניתן למחוק מוצר שהוזמן ', life: 3000 });
    }
    const handleDelete = async () => {
        const { error } = await deleteProduct({ _id:productData._id })
        if (error)
            showError()
        else showSuccess();
        setVisibleDelete(false);
    }

    const handleEdit = () => {
        updateProduct({ _id:productData._id,name: editProduct.name,price:editProduct.price});
        setVisibleEdit(false)
    }

    const { data, isLoading, isError, error } = useGetProductsQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>

    const footerContent = (
        <div>
            <Button label=" אישור" icon="pi pi-check" onClick={() => { addProduct(newProduct); setVisible(false) }} />
            <Button label=" ביטול" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
        </div>
    );

    return (
        <>
            <nav style={{position:"fixed",width:"100%",zIndex:10}}>
            <NavbarManager/></nav>
            <Toast ref={toast} />
            <div class="flex align-items-center justify-content-center" style={{padding:"100px",zIndex:1}}>
                <div className="card flex justify-content-center">
                    <Button icon="pi pi-plus" label='הוסף מוצר' onClick={() => setVisible(true)} />
                    <Dialog
                        header="הוספת מוצר חדש"
                        visible={visible}
                        onHide={() => setVisible(false)}
                        footer={footerContent}
                        style={{ direction: "rtl" }}>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="username">שם מוצר</label>
                            <InputText id="name" aria-describedby="username-help" autoFocus onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                        </div>

                        <div className="flex flex-column gap-2">
                            <label htmlFor="username">מחיר</label>
                            <InputNumber id="price" aria-describedby="username-help" onChange={e => setNewProduct({ ...newProduct, price: e.value })} />
                        </div>
                    </Dialog>
                </div>
            </div>

            <div style={{ margin: 'auto', textAlign: "center", maxWidth: "50%" }}
                class="flex flex-wrap">
                {data.map((product) =>
                    <Card
                        class="flex align-items-center justify-content-center font-bold m-2 border-round"
                        title={product.name} className="md:w-25rem"
                        style={{ fontSize: "24pt", margin: '5%', minWidth: "45%", minHeight: "200px", border: 'solid', maxWidth: "150px" }}>
                        <p></p>
                        <p>ש"ח {product.price}</p>

                        <Button style={{ marginRight: '2%', marginBottom: '5%', minWidth: "60px", minHeight: "60px" }}
                            icon="pi pi-pencil"
                            rounded
                            onClick={() =>{setProductData(product);setVisibleEdit(true)}} >
                        </Button>
                        <Button style={{ marginLeft: '2%', marginBottom: '5%', minWidth: "60px", minHeight: "60px" }}
                            icon="pi pi-trash"
                            rounded
                            onClick={() => {setProductData(product);setVisibleDelete(true)}}>
                        </Button>
                        <div class="flex align-items-center justify-content-center">
                            <div className="card flex justify-content-center">
                                <Dialog
                                    header="עדכון מוצר"
                                    visible={visibleEdit}
                                    onHide={() => setVisibleEdit(false)}
                                    style={{ direction: "rtl" }}>
                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="username">שם מוצר</label>
                                        <InputText defaultValue={productData.name} id="nameEdit" aria-describedby="username-help" autoFocus
                                        onChange={(e)=>{setEditProduct({...editProduct,name:e.target.value})}} />
                                    </div>

                                    <div className="flex flex-column gap-2">
                                        <label htmlFor="username">מחיר</label>
                                        <InputNumber value={productData.price} id="priceEdit" aria-describedby="username-help"
                                        onChange={(e)=>{setEditProduct({...editProduct,price:e.value})}} />
                                    </div>
                                    <div>
                                        <Button label=" אישור" icon="pi pi-check" onClick={() => { handleEdit() }} />
                                        <Button label=" ביטול" icon="pi pi-times" onClick={() => setVisibleEdit(false)} className="p-button-text" />
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <div className="card flex justify-content-center">
                                <Dialog header="אזהרה" visible={visibleDelete} style={{ direction: 'rtl' }} onHide={() => setVisibleDelete(false)}>
                                    <p>
                                        האם אתה בטוח שברצונך למחוק את המוצר?
                                    </p>
                                    <div>
                                        <Button label="ביטול" icon="pi pi-times" onClick={() => { showInfo(); setVisibleDelete(false); }} className="p-button-text" />
                                        <Button label="אישור" icon="pi pi-check" onClick={() => { handleDelete() }} autoFocus />
                                    </div>
                                </Dialog>
                            </div>
                        </div>

                    </Card>
                )}
            </div>

        </>
    );
};
export default ProductsManager;








