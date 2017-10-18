import { Component, Output, EventEmitter } from '@angular/core';
import * as xml2js from "xml2js";
import { Course } from '../gpa-calculator/Course';
import { HttpModule } from '@angular/http';

@Component({
    selector: 'xml-convert',
    templateUrl: './xml-convert.component.html',
    styleUrls: ['./xml-convert.component.css']
})

export class xmlConvertComponent {
    xml: any;
    title = 'XML CONVERT';
    xmlconvert:string = "";
    courses : Course[] =[];
    @Output()transcript: EventEmitter<any> = new EventEmitter<any>();
    constructor(private http: HttpModule){

    }
    convert(any) {
        let obj4 : string = "";
        let data : Course[] =[];
        xml2js.parseString(any, function (err, result) {
            let table = result.Report.Table1;
            table.forEach(element => {
                obj4 += element.TXTTENMON[0];
                data.push({Day: element.TEXT33[0],CourseID: element.TEXT34[0],CourseTitle: element.TXTTENMON[0],Grade: element.TEXT36[0],CreditEarned: element.TEXT4[0]});
            });
            
        });
        this.xmlconvert = obj4;
        this.courses = data;
        this.transcript.emit(this.courses);
    }
    public previewFile(event) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log('xmlresult', e.target.result);
          let a =  e.target.result.toString();
          console.log('string', a);
          //console.log('decode',atob(a.split("data:text/xml;base64,")[1]));
          //decodeURI(a.split("data:text/xml;base64,")[1]);

          console.log('decode',decodeURI(a.split("data:text/xml;base64,")[1]));
          //this.convert(atob(a.split("data:text/xml;base64,")[1]));
        };
        let data = reader.readAsDataURL(event.target.files[0]);
        //reader.readAsText(event.target.files[0]);
        console.log('info', event.target.files[0]);
        let string = reader.toString();
        //console.log('string', string);

        // reader.onloadstart = (e:any) => {
        //     console.log('e', e);
        // };

        // reader.onloadend = (e:any) => {
        //     console.log('end', e.result);
        // };
        //reader.readAsBinaryString(event.target.files[0]);

        //console.log('info', event.target.files[0].currentTarget);

        // xml2js.parseString(event.target.files[0].currentTarget.readAsBinaryString() , function (err, result) {
        //     console.log('xml', result);
        // });

        
      }
}
