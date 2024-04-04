import NavbarManager from "../../components/NavbarManager"


import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tooltip } from 'primereact/tooltip';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import AddUserDialog from './addUserDialog';
import { useGetUsersQuery } from "./usersApiSlice";
import UpdateDialog from "./updateDialog";



const ManagerUsers = () => {

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const { data} = useGetUsersQuery()
    const dt = useRef(null);
    const cols = [
        { field: 'userName', header: 'שם' },
        { field: 'role', header: 'סוג' },
        { field: 'email', header: 'מייל' },
        { field: 'phone', header: ' טלפון' }
    ];

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <>
                <div className="flex justify-content-start">
                    <span className="p-input-icon-right">
                        <i className="pi pi-search" />
                        <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="חיפוש לקוח" />
                    </span>
                </div>
                <div className="flex align-items-center justify-content-end gap-2">
                    <AddUserDialog />
                    <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
                </div>
            </>
        );
    };
    const header = renderHeader();
    const updateTemplate = (user) => {
        return <UpdateDialog user={user} />
    }
    return (
        <>
            <nav style={{position:"fixed",width:"100%",zIndex:10}}>
            <NavbarManager/></nav>
            <div className="card" style={{direction:'rtl',padding:"150px",zIndex:1}}>
                <Tooltip target=".export-buttons>button" position="bottom" />
                <DataTable ref={dt} value={data} header={header} scrollable tableStyle={{ direction:'rtl',padding:"3%" }} showGridlines filters={filters} filterDisplay="row" >
                    {cols.map((col, index) => (
                        <Column style={{textAlign:'right'}} className='cul' key={index} field={col.field} header={col.header} />
                    ))}
                    <Column className='cul' body={updateTemplate} header='עריכה' style={{width:"50px"}}/>
                </DataTable>
            </div>
        </>
    );
}
export default ManagerUsers