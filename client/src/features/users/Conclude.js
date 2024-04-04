import React, { useEffect, useState } from 'react';
import NavbarManager from '../../components/NavbarManager';
import { useGetOrdersQuery } from '../order/ordersApiSlice';
import { useGetProductsQuery } from '../product/productsApiSlice';

const Conclude = () => {
    const { data: orders, isSuccess, isLoading, isError, error } = useGetOrdersQuery()
    const { data: products, isSuccess: isSuccess1, isLoading: isLoading1, isError: isError1, error: error1 } = useGetProductsQuery()

    const [product, setProduct] = useState([])
    const [payment,setPayment]=useState([{payment:"מזומן",sum:0},{payment:"צ'ק",sum:0},{payment:"נדרים פלוס",sum:0}])
    useEffect(() => {
        if (isSuccess1) {
            setProduct(products.map(p => { return { prod: p, quantity: 0 } }))
            console.log(product + "kkkkkkkkkkkkkk");
        }

    }, [isSuccess1])

    useEffect(() => {
        if (isSuccess) {
            if(product.length>0)
            {
                debugger
                let findProduct = [...product]
                let payments=[...payment]
                orders.map(ord => 
                    
                    {
                        payments.forEach(pay=>{
                            if(pay.payment===ord.payment)
                                pay.sum=pay.sum+1
                            
                        })
                       
                        ord.productsList.map(e => {
                    // let findProd=product.find(p=>p.prod._id==e.prod._id)
                    // findProd.quantity=findProd.quantity+e.quantity
                    let findP = []
                    findProduct.forEach((p) => {
                        let prod = p;
                        if (p.prod._id == e.prod._id)
                            prod.quantity = p.quantity + e.quantity
                        findP.push(prod)
                    })
                    findProduct = [...findP]
                })}
                )
                setProduct(findProduct)
                setPayment(payments)
                console.log(product);
            }
            
        }

    }, [orders])

    if (!isSuccess) return <h1>!success</h1>
    if (isError) return <h2>{error}</h2>
    if (isLoading) return <h1>Loading</h1>

    if (!isSuccess1) return <h1>!isSuccess1</h1>
    if (isError1) return <h2>{error}</h2>
    if (isLoading1) return <h1>Loading</h1>


    return (
        <>
             <nav style={{position:"fixed",width:"100%",zIndex:10}}>
            <NavbarManager/></nav>
            <div style={{padding:"100px",zIndex:1}}>
                {product.map(p => {
                return <> <div>{p.prod.name}</div>
                    <div>{p.quantity}</div></>
            })} 
            </div>
            <div  style={{padding:"100px",zIndex:1}}>
                {payment.map(p => {
                return <> <div>{p.payment}</div>
                    <div>{p.sum}</div></>
            })} 
            </div>
           
        </>
    )
}
export default Conclude