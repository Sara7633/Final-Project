import React from 'react';
import { useGetProductsQuery } from './productsApiSlice';
import { Card } from 'primereact/card';
import Navbar from '../../components/Navbar';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { useAddBasketMutation } from '../order/ordersApiSlice';
const ProductsList = () => {
    const[addBasket]=useAddBasketMutation()
    
    const addToBasket=(prod)=>{
        const quantity=document.getElementById(prod.name).getElementsByTagName('input')[0].ariaValueNow
        addBasket({prod,quantity})
    }

    const { data, isLoading, isError, error } = useGetProductsQuery()
    if (isLoading) return <h1>Loading</h1>
    if (isError) return <h2>{error}</h2>
    return (
        <>
            <nav style={{position:"fixed",width:"100%",zIndex:10}}>
            <Navbar/></nav>
                <div style={{margin:'auto', textAlign: "center",maxWidth:"80%",zIndex:1,padding:"150px" }}
                    class="flex flex-wrap">
                    {data.map((product) =>
                        <Card
                        class="flex align-items-center justify-content-center font-bold m-2 border-round"
                            title={product.name} className="md:w-25rem"
                            style={{ margin: '5%' ,minWidth:"40%"}}>
                            <p></p>
                            <p>ש"ח {product.price}</p>
                            <div className="card flex justify-content-center">
                                <InputNumber id={product.name} min={1} value={1}  showButtons buttonLayout="vertical" style={{ width: '4rem' }}
                                    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                            </div>
                            <Button style={{marginTop:'10%'}}
                            icon="pi pi-shopping-cart" 
                            label="הוסף לסל"
                            onClick={()=>addToBasket(product)}></Button>
                        </Card>
                    )}
                </div>
        </>
    );
};
export default ProductsList;

