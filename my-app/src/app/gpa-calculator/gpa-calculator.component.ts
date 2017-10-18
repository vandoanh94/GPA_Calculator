import { Component, Input } from '@angular/core';
import { Course } from "./Course";
import { Transcript } from "./mock-data-course";
import { GpaCalculatorService } from "./gpa-calculator.service";

@Component({
    selector: 'gpa-calculator',
    templateUrl: './gpa-calculator.component.html',
    styleUrls: ['./gpa-calculator.component.css']
})
export class GpaCalculatorComponent {
    title = 'Gpa Calculator';
    @Input() transcript: any;
    constructor(private gpaCalculatorService: GpaCalculatorService){
        //gpaCalculatorService.getTranscript().then(res => this.transcript = res);
    }

    gpaCalculator(transcript): number {
        let gpa = 0;
        let sumGradePoints = 0;
        let sumCreditEarned = 0;
        transcript.forEach(course => {
            sumGradePoints += (this.convertGrade(course.Grade) * course.CreditEarned);
            sumCreditEarned += course.CreditEarned

        });
        return sumGradePoints / sumCreditEarned;
    }

    refreshData(){
        this.gpaCalculatorService.getTranscript().then(res => this.transcript = res);
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
    }
}

