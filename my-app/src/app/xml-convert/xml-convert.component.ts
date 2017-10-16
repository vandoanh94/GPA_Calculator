import { Component } from '@angular/core';
import * as xml2js from "xml2js";
import { XmlModel } from "./xml-convert.model";

@Component({
    selector: 'xml-convert',
    templateUrl: './xml-convert.component.html',
    styleUrls: ['./xml-convert.component.css']
})
export class xmlConvertComponent {
    xml: any;
    title = 'XML CONVERT';
    xmlconvert: string;
    xmlModel : XmlModel[]=[];
    convert(any) {
        xml2js.parseString(any, function (err, result) {
            console.log("xml", result);
            console.log("model",result.Report.Table1["0"]);
            //this.xmlModel = JSON.parse(result.Report.Table1).json() as XmlModel[];
            //console.log("json",this.xmlModel);
            // result.Report.Table1.forEach(res => {
                
            // });
            //this.xmlconvert = result.Report.Table1["0"].TXTTENMON["0"];
            
            console.log("convert",result.Report.Table1["0"].TXTTENMON["0"]);
            Object.assign(this.XmlModel,result.Report.Table1);
            console.log("json",JSON.stringify(result.Report.Table1));
        });

    }
}
