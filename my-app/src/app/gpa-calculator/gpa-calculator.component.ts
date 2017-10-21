import { Component, Input, SimpleChanges } from '@angular/core';
import { Course } from "./Course";
import { GpaCalculatorService } from "./gpa-calculator.service";

@Component({
    selector: 'gpa-calculator',
    templateUrl: './gpa-calculator.component.html',
    styleUrls: ['./gpa-calculator.component.css']
})

export class GpaCalculatorComponent {
    title = 'Gpa Calculator';
    @Input() transcript: any;
    transcript_default: any;
    hopeGPA: any = null;
    constructor(private gpaCalculatorService: GpaCalculatorService) {
    }
    setColor(grade): string {
        if (grade < this.hopeGPA - 0.7) {
            return "red";
        }
        if (grade < this.hopeGPA) {
            return "yellow";
        }
        if (grade >= this.hopeGPA) {
            return "green";
        }
    }
    ngOnChanges(changes: SimpleChanges) {
        changes.transcript.currentValue;
        this.transcript_default = this.deepCopy(this.transcript);
    }
    modifiedCourses(transcript): any {
        // let modifiedTranscript : any;
        // for (let i = 0; i < this.transcript_default.length(); i++){
        //     if(this.transcript_default[i].Grade != this.transcript[i].Grade){
        //         modifiedTranscript.push(this.transcript[i]);
        //     }
        // }
        // return modifiedTranscript;
        let modifiedTranscript : any[] = [];
        for (var i in this.transcript_default) {
            if(this.convertGrade(this.transcript_default[i].Grade) != this.convertGrade(transcript[i].Grade)){
                 modifiedTranscript.push(transcript[i]);
            }
        }
        return modifiedTranscript;
    }
    refreshData() {
        this.transcript = this.deepCopy(this.transcript_default);
    }
    deepCopy(oldObj: any) {
        var newObj = oldObj;
        if (oldObj && typeof oldObj === "object") {
            newObj = Object.prototype.toString.call(oldObj) === "[object Array]" ? [] : {};
            for (var i in oldObj) {
                newObj[i] = this.deepCopy(oldObj[i]);
            }
        }
        return newObj;
    }
    gpaCalculator(transcript): number {
        if (transcript != null) {
            let gpa = 0;
            let sumGradePoints = 0;
            let sumCreditEarned: number = 0;
            transcript.forEach(course => {
                sumGradePoints += Number(this.convertGrade(course.Grade) * course.CreditEarned);
                sumCreditEarned += Number(course.CreditEarned);
            });
            return sumGradePoints / sumCreditEarned;
        }
    }

    convertGrade(grade): number {
        switch (grade) {
            case ("A"): { return 4.0 }
            case ("A-"): { return 3.7 }
            case ("B+"): { return 3.3 }
            case ("B"): { return 3.0 }
            case ("B-"): { return 2.7 }
            case ("C+"): { return 2.3 }
            case ("C"): { return 2.0 }
            case ("C-"): { return 1.7 }
            case ("D+"): { return 1.3 }
            case ("D"): { return 1.0 }
            case ("D-"): { return 0.7 }
            case ("F"): { return 0 }
            case ("a"): { return 4.0 }
            case ("a-"): { return 3.7 }
            case ("a+"): { return 3.3 }
            case ("b"): { return 3.0 }
            case ("b-"): { return 2.7 }
            case ("c+"): { return 2.3 }
            case ("c"): { return 2.0 }
            case ("c-"): { return 1.7 }
            case ("d+"): { return 1.3 }
            case ("d"): { return 1.0 }
            case ("d-"): { return 0.7 }
            case ("f"): { return 0 }
        }
        return 0;
    }
}

