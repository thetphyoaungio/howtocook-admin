import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class TPADateTimeService {
    //Apr,Jun, Sep, Nov => 30
    dayCountsForMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    month_index:any = {
        Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11
    };

    constructor() {}

    //'2022-05-12 04:30 PM'
    createDateForSafariMac(timeinYangon:string){
        const tmp = timeinYangon.split('-');//0>yr 1>month
        const tmp1 = tmp[2].split(' ');//0>day 2>AM or PM
        const hm = tmp1[1].split(':');//0>hrs 1>min

        return new Date(+tmp[0], (+tmp[1])-1, +tmp1[0], (tmp1[2]==='PM' && +hm[0]<12)? ((+hm[0])+12) : +hm[0], +hm[1], 0);
    }

    //'2022-05-12 04:30 PM'
    convertDateToLocalForSafariMac(timeinYangon:string){
        const tmp = timeinYangon.split('-');//0>yr 1>month
        const tmp1 = tmp[2].split(' ');//0>day 2>AM or PM
        const hm = tmp1[1].split(':');//0>hrs 1>min

        let yr = +tmp[0];
        let mth = (+tmp[1])-1;
        let dy = +tmp1[0];
        let hrs = (tmp1[2]==='PM' && +hm[0]<12) ? ((+hm[0])+12) : +hm[0];// => 24 format
        let min = +hm[1];

        if(min + 30 >= 60 ) {
            hrs += 1;

            if(hrs + 6 >= 24) {
                dy += 1;

                if(dy >= (this.dayCountsForMonths[mth])) {
                    mth += 1;

                    if(mth === 11) {
                        yr += 1;
                    }
                }
            } else {
                hrs += 6;
            }
        } else {
            min += 30;
        }

        return new Date(yr, mth, dy, hrs, min, 0);
    }

    //'2022-05-05 01:08:36' (createddate/updateddate)
    createDateForSafariMac_2(dateString:string){
        const tmp = dateString.split('-');//0>yr 1>month
        const tmp1 = tmp[2].split(' ');//0>day 1>hr:min:sec
        const hm = tmp1[1].split(':');//0>hrs 1>min 2>sec

        return new Date(+tmp[0], (+tmp[1])-1, +tmp1[0], +hm[0], +hm[1], +hm[2], 0);
    }

    //2022-05-16
    createDateForSafariMac_3(dateString:string){
        const tmp = dateString.split('-');//0>yr 1>month 2>day

        return new Date(+tmp[0], (+tmp[1])-1, +tmp[2]);
    }

    //"1899-11-30T00:00:00.000Z"
    createDateForSafariMac_4(dateString:string){
        const tmp = dateString.split('-');//0>1899 1>11 2>30T00:00:00.000Z
        const tmp1 = tmp[2].split('T');//0>30 1>00:00:00.000Z

        return new Date(+tmp[0], (+tmp[1])-1, +tmp1[0]);
    }


    //"2022-08-01T20:26:06.000Z"
    createDateForSafariMac_5(dateString:string){
        const tmp = dateString.split('-');//0>2022 1>08 2>01T20:26:06.000Z
        const tmp1 = tmp[2].split('T');//0>01 1>20:26:06.000Z
        const tmp2 = tmp1[1].split(':'); //0>20 1>26 2>:06.000Z
        const tmp3 = tmp2[2].split('Z'); //0>06.000 1>empty!

        return new Date(+tmp[0], (+tmp[1])-1, +tmp1[0], +tmp2[0], +tmp2[1], +tmp3[0]);
    }

    //11:15:00
    createDateTimeForSafariMac_6(timeOnlyString:string) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        const tmp = timeOnlyString.split(':');
        const hr = +tmp[0];
        const min = +tmp[1];
        const sec = +tmp[2];

        return new Date(year, month, day, hr, min, sec);
    }

    //24/02/2023
    createDateForSafariMac_7(dateString:string){
        const tmp = dateString.split('/');
        //*0=day, 1=month, 2=yr

        return new Date(+tmp[2], (+tmp[1])-1, +tmp[0]);
    }

    //Tue Aug 15 2023 06:30:00 GMT+0630 (Myanmar Time)
    createDateForSafariMac_8(dateString:string){
        if(dateString) {
            const tmp = dateString.split(' ');

            return new Date(+tmp[3], +this.month_index[tmp[1]], +tmp[2]);
        }
        return null;
    }

    createDateForSafariMac_8_datepicker_start(dateString:string){
        if(dateString) {
            const tmp = dateString.split(' ');

            return new Date(+tmp[3], +this.month_index[tmp[1]], +tmp[2], 0, 0, 0);
        }
        return null;
    }

    createDateForSafariMac_8_datepicker_end(dateString:string){
        if(dateString) {
            const tmp = dateString.split(' ');

            return new Date(+tmp[3], +this.month_index[tmp[1]], +tmp[2], 23, 59, 59);
        }
        return null;
    }

    //2022-05
    createDateForSafariMac_9(dateString:string){
        const tmp = dateString.split('-');//0>yr 1>month

        return new Date(+tmp[0], (+tmp[1])-1, 1);
    }

    //28 Aug 2023
    createDateForSafariMac_10(dateString:string){
        const tmp = dateString.split(' ');//0>day 1>month 2>year

        return new Date(+tmp[2], this.month_index[`${tmp[1]}`], +tmp[0]);
    }

    //Jun 2023
    createDateForSafariMac_11(dateString:string){
        const tmp = dateString.split(' ');//0>month 1>year

        return new Date(+tmp[1], this.month_index[`${tmp[0]}`], 1);
    }
}