import { api, LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import BOOKING_OBJECT from '@salesforce/schema/Car_Booking_Detail__c';

export default class ModalCarRental extends LightningElement {

    objectApiName = BOOKING_OBJECT;
    @api carobject;
    @api status;
    @api startdate;
    @api enddate;

    @api show() {
        this.status = true;
    }

    //hadling on clicking sumbit button  
    onSubmitHandler(event) {
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Car_Info__c = this.carobject.Id;
        fields.Start_Date__c = this.startdate;
        fields.End_Date__c = this.enddate;

        this.template
            .querySelector('lightning-record-edit-form').submit(fields);
        this.status = false;
    }

    //firing toast on success
    handleSuccess(event) {
        console.log(event.detail.id);
        const evt = new ShowToastEvent({
            title: 'Hola! Note: Booking Id ' + event.detail.id,
            message: 'Car Rented Successfully for ' + this.startdate + ' to ' + this.enddate + '. Enjoy the ride.',
            variant: 'success',
            mode: 'sticky'
        });
        this.dispatchEvent(evt);
    }

    //closing modal
    closeModal() {
        this.status = false;
    }
}