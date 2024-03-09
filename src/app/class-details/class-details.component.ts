import { Component, inject } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {ClassService} from "../class.service";
import {ClassInfo} from "../class-info";

@Component({
  selector: 'app-class-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article>
      <p>Title: {{classInfo?.classTitle}}</p>
      <p>Instructor: {{classInfo?.instructorName}}</p>
      <p>Description: {{classInfo?.description}}</p>
      <p>Date: {{classInfo?.date}}</p>
      <p>Time: {{classInfo?.time}}</p>
      <p>Location: {{classInfo?.meetingLocation}}</p>
    </article>
  `,
  styleUrl: './class-details.component.css'
})
export class ClassDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  classService = inject(ClassService);
  classInfo: ClassInfo | undefined;

  constructor() {
    const classInfoID = Number(this.route.snapshot.params["id"]);
    console.log("class: ",classInfoID);
    this.classService.getClassInfoByID(classInfoID).then(classInfo => {
      this.classInfo = classInfo;
    });
  }

}
