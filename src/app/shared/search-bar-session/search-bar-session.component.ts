import {Component, EventEmitter, Output} from '@angular/core';
import { StudentService } from "../../core/services/student.service";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-search-bar-session',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule
  ],
  providers: [StudentService],
  template: `
    <div class="search-container">
      <mat-form-field appearance="fill">
        <input matInput type="text" placeholder="Filter Results" #filter (keyup.enter)="getInput(filter.value)">
      </mat-form-field>
      <button mat-button (click)="getInput(filter.value)">Search</button>
    </div>


  `,
  styleUrl: './search-bar-session.component.css'
})
export class SearchBarSessionComponent {
  searchQuery: string = '';
  @Output() messageEvent = new EventEmitter<string>();

  constructor(private studentService: StudentService) {
  }

  getInput(text: string) {
    if (!text) {
      text = '';
    }
    this.messageEvent.emit(text);
  }

  search() {
    console.log('Search query:', this.searchQuery);
  }

}

