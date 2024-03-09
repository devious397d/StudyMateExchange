import { Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";
import {SideBarComponent} from "../side-bar/side-bar.component";
import {ClassInfo} from "../class-info";
import {ClassHomeComponent} from "../class-home/class-home.component";
import {CommonModule} from "@angular/common";
import {ClassService} from "../class.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SideBarComponent,
    RouterLink,
    ClassHomeComponent
  ],
  template: `
    <app-side-bar></app-side-bar>
    <section class = 'side-bar-move'>
        <app-class-home *ngFor="let classInfo of classInfoList" [classInfo]="classInfo"></app-class-home>
    </section>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  classInfoList: ClassInfo[] = [];
  classService: ClassService=inject(ClassService);

  constructor() {
    this.classService.getAllClassInfo().then((classInfoList: ClassInfo[]) => {
      this.classInfoList = classInfoList;
    })
  }

}
