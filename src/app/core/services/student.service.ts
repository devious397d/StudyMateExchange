import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Student} from "../types/student";
import {StudySession} from "../types/study-session";
import {FormControl} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentURL = 'assets/studentDB.json';
  private sessionsURL = 'assets/sessionsDB.json';

  public tabs = [];
  public selected = new FormControl(0);
  public logInDisable = false;
  public loggedEmail: string;
  public profileInfo = [];

  constructor(private http: HttpClient) {
  }

  getStudents(text: string = ''): Observable<Student[]> {
    return this.http.get<{ students: Student[] }>(this.studentURL).pipe(
        map(({students}) => this.filterStudents(students, text))
    );
  }

  filterStudents(students: Student[], text: string): Student[] {
    if (text == '') {
      return students;
    }

    let student: Student[] = [];
    let temp_arr: Student[] = [];
    let temp_txt = text.toLowerCase();

    temp_arr = students.filter(students => students?.firstName.toLowerCase().includes(text.toLowerCase()));

    return students.filter(students => students?.firstName.toLowerCase().includes(temp_txt)
    || students?.lastName.toLowerCase().includes(temp_txt) || students?.language.toLowerCase().includes(temp_txt)
    );;
  }


  getSessions(text: string = ''): Observable<StudySession[]>{
    return this.http.get<{ sessions: StudySession[] }>(this.sessionsURL).pipe(
        map(({sessions}) => this.filterSessions(sessions, text))
    );
  }

  filterSessions(sessions: StudySession[], text: string) {
    if (text == '') {
      return sessions;
    }

    let student: Student[] = [];
    let temp_txt = text.toLowerCase();

    return sessions.filter(sessions => sessions?.title.toLowerCase().includes(temp_txt)
        || sessions?.language.toLowerCase().includes(temp_txt) || sessions?.instructor.toLowerCase().includes(temp_txt)
        || sessions?.description.toLowerCase().includes(temp_txt) || sessions?.meetinglocation.toLowerCase().includes(temp_txt)
    );;
  }
  addTab(name:string) {
    this.tabs.push(name);
  }
  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.selected.setValue(index);
  }
}






