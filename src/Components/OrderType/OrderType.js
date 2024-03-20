import React, { useState } from "react";
import { enableRipple } from '@syncfusion/ej2-base';
import { useNavigate } from 'react-router-dom';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ButtonComponent, CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import Button from 'react-bootstrap/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './OrderType.css';
enableRipple(true);

const OrderType = () => {

    const [formData, setFormData] = useState({
        orderType: '',
        isDivVisible: false
    });

    const navigate = useNavigate();

    const orderTypeDataSource = [
        { text: 'Consumption Order', value: '1' },
        { text: 'Portal Order', value: '2' },
        { text: 'Rental Order', value: '3' },
        { text: 'Shrink Order', value: '4' },
    ];

    const handleClick = () => {

        const selectedValue = formData.orderType;
        if (selectedValue == '2') {
            navigate('/claim');
        }
        else {
            formData.isDivVisible = true;
        }
    };

    const handleDropdownChange = (e, dropdownName) => {
        const selectedValue = e.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [dropdownName]: selectedValue,
        }));
    };

    return (
        <div>
            <Header />
            <main className="ordertypecontainer">
                <div className="ordertypeform">
                    <h3>Hello Admin!</h3>
                    <div className="d-flex flex-column gap-2">
                        <div className="mb-4">
                            <label for="inputEmail4" className="form-label">Please select an Order Type</label>
                            <DropDownListComponent id="ddlOrderType" name="orderType" dataSource={orderTypeDataSource} fields={{ text: 'text', value: 'value' }} value={formData.orderType} placeholder="Select" change={(e) => handleDropdownChange(e, 'orderType')} />
                        </div>
                        <div className="form-check">
                            <CheckBoxComponent name="patientPay" />
                            <span className=""> Mark as Test Claim </span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <Button className="claimbtn" onClick={handleClick}>Create Claim</Button>
                    </div>
                    <div className="disclaimer">
                        <p>
                            Please be aware that by clicking on "Create Claim" Button, it will create a new blank claim which can not be deleted and only supervisor can cancel it.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );

}

export default OrderType;