import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { InputText } from 'primereact/inputtext';
import { useForm } from "react-hook-form";
import { Dropdown } from 'primereact/dropdown';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useUpdateUserMutation } from "./usersApiSlice";
import { useFormik } from "formik/dist/formik.cjs.production.min";


export default function UpdateDialog(props) {

    const roles = [{ role: "משתמש" }, { role: "מנהל" }];
    const [visible, setVisible] = useState(false);
    const { register,  formState: { errors } } = useForm();
    const [updateUser] = useUpdateUserMutation()
    const formik = useFormik({
        initialValues: {
            userName: props.user.userName,
            email: props.user.email,
            role: props.user.role,
            phone: props.user.phone
        },
        validate: (data) => {
            let errors = {};
            if (!data.userName) {
                errors.userName = 'זהו שדה חובה';
            }
            return errors;
        },
        onSubmit: (data) => {


            if (!data.role)
                data.role = props.user.role
            const data2 = { ...data, _id: props.user._id }
            updateUser(data2)
            formik.resetForm();
        }
    });


    // const onSubmit = (data1) => {
    //     console.log('dddddddddddddddd');
    //     if (!data1.role)
    //         data1.role = props.user.role
    //     const data2 = { ...data1, _id: props.user._id }
    //     updateUser(data2)
    // };

    return (
        <>
            <Button label="" icon="pi pi-user-edit" onClick={() => setVisible(true)} text size="small" />
            <>
                <Dialog header="עריכת משתמש" visible={visible} style={{ width: '50vw', direction: 'rtl' }} onHide={() => setVisible(false)} >
                    <p className="m-0">
                        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2" style={{ alignItems: 'center' }}>

                            <div className="p-float-label p-input-icon-right" style={{ margin: "5%" }}>
                                <InputText placeholder="שם משתמש"
                                    {...register("userName", {})}
                                    value={formik.values.userName}
                                    onChange={(e) => {
                                        formik.setFieldValue('userName', e.target.value);
                                    }}
                                />
                                <i className="pi pi-user" />

                            </div>
                            <div className="p-float-label p-input-icon-right" style={{ margin: "5%" }}>
                                <i className="pi pi-phone"></i>
                                <InputText placeholder="טלפון"
                                    {...register("phone", {
                                        required: true
                                    })}
                                    value={formik.values.phone}
                                    onChange={(e) => {
                                        formik.setFieldValue('phone', e.target.value);
                                    }}
                                />
                            </div>
                            {errors?.phone?.type === "required" && <p>זהו שדה חובה</p>}
                            <div className="p-float-label p-input-icon-right" style={{ margin: "5%" }}>
                                <i className="pi pi-at"></i>
                                <InputText placeholder="מייל"
                                    {...register("email", {
                                    })}
                                    value={formik.values.email}
                                    onChange={(e) => {
                                        formik.setFieldValue('email', e.target.value);
                                    }}
                                />
                            </div>
                            <div className="p-float-label p-input-icon-right" style={{ margin: "5%" }}>
                                <i className="pi pi-check"></i>
                                <Dropdown className="w-full md:w-17rm"
                                    options={roles}
                                    optionLabel="role"
                                    name="role"
                                    defaultValue={formik.values.role} 
                                    value={formik.values.role}                                 
                                    {...register("role", {
                                    })}
                                    onChange={(e) => {
                                        formik.setFieldValue('role', e.target.value);
                                    }}
                                />
                            </div>

                            <div className="flex justify-content-center " >
                                <Button type='submit' label="עדכן" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus />
                            </div>
                        </form>
                    </p>
                </Dialog>
            </>
        </>
    )
}
