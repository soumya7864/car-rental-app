import { api, LightningElement, track, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import FILTER_MESSAGE from '@salesforce/messageChannel/filterMessageChannel__c';
import filteredCarList from '@salesforce/apex/CarInfoController.filteredCarList';


export default class CarSearchList extends LightningElement {

    seater = '';
    group = '';
    transmission = '';
    startdate = null;
    enddate = null;
    searchData;
    error;

    @api
    carObject;
    isOpen = false;

    @wire(MessageContext)
    messageContext;

    //handling event fired from carDetailCard
    handleBookingEvent(event) {
        this.carObject = event.detail;
        const modal = this.template.querySelector('c-modal-car-rental');
        modal.show();
    }

    //Subscribing the datas earned from LMS
    connectedCallback() {
        this.subscribeMessageChannel();

    }

    subscribeMessageChannel() {
        subscribe(this.messageContext, FILTER_MESSAGE, (result) => this.handleMessage(result));
    }

    handleMessage(result) {
        if (result.seater != undefined) {
            this.seater = result.seater;
        }
        if (result.group != undefined) {
            this.group = result.group;
        }
        if (result.transmission != undefined) {
            this.transmission = result.transmission;
        }
        if (result.startdate != undefined) {
            this.startdate = result.startdate;
        }
        if (result.enddate != undefined) {
            this.enddate = result.enddate;
        }
    }

    //Apex calling to retrieve criteria based car list result 
    @wire(filteredCarList, {
        seater: '$seater',
        groupOpt: '$group',
        transmissionOpt: '$transmission',
        startDate: '$startdate',
        endDate: '$enddate'
    })
    wiredData({ error, data }) {
        if (data) {
            this.searchData = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.searchData = undefined;
        }
    }
}