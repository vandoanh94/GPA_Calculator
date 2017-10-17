import { Injectable } from '@angular/core';
import { Course } from "./Course";
import { Transcript } from "./mock-data-course";


@Injectable()
export class GpaCalculatorService {
  getCourse(courseId: string): Promise<Course> {
  return this.getTranscript()
             .then(course => Transcript.find(course => course.CourseID === courseId));
}
  getTranscript(): Promise<Course[]> {
    return Promise.resolve(Transcript);
  }
}