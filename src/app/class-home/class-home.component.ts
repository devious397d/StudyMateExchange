import { Component,Input } from '@angular/core';
import {ClassInfo} from "../class-info";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-class-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  template: `
    <section class="the-class">
      <p>Class Title: {{classInfo.classTitle}}</p>
      <p>Instructor: {{classInfo.instructorName}}</p>
      <p>Description: {{classInfo.description}}</p>
      <a [routerLink]="['/classInfo', classInfo.id]">
        More Information!
      </a>
      <br><br>
    </section>
  `,
  styleUrl: './class-home.component.css'
})
export class ClassHomeComponent {
  @Input() classInfo!:ClassInfo;
}
