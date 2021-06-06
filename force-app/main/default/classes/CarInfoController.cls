public with sharing class CarInfoController {


    @AuraEnabled(cacheable=false)
    public static Decimal getPriceOfRecord(Id recordId){
        List<Car_Booking_Detail__c> bookingDet = [SELECT Total_Price__c FROM Car_Booking_Detail__c WHERE 
                                                   Id= :recordId ];
        Decimal price = bookingDet[0].Total_Price__c;
        return price;
    }

    @AuraEnabled(cacheable=true)
    public static List<Car_Info__c> filteredCarList(String seater,String groupOpt,String transmissionOpt ,Date startDate, Date endDate){
        
        if(startDate == null){
            startDate = Date.newInstance(1970,01,01);
        }
        if(endDate == null){
            endDate = Date.newInstance(1970,02,01);
        }

        if(seater == 'None' || seater ==''){
            seater = '%';
        }
        if(groupOpt == 'None' || groupOpt ==''){
           groupOpt = '%'; 
        }
        if(transmissionOpt == 'None' || transmissionOpt ==''){
            transmissionOpt ='%';
        }
        
         //Subquery = Find all Bookings in Range of SearchPickupDate and SearchDropoffDate
	    return [SELECT Name__c, Seater__c, Group__c, Transmission__c, Picture_URL__c,Charges_Per_Day__c
                                FROM Car_Info__c 
                                WHERE Id NOT IN 
                                (SELECT Car_Info__c 
                                FROM Car_Booking_Detail__c
                                WHERE ((Start_Date__c <= :startDate AND End_Date__c >= :startDate) OR
                                (Start_Date__c<= :endDate AND End_Date__c>= :endDate) OR
                                (Start_Date__c > :startDate AND End_Date__c<= :endDate) ))
                                AND Seater__c LIKE :seater
                                AND Group__c  LIKE :groupOpt
                                AND Transmission__c LIKE :transmissionOpt];
 
    }
}