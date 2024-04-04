import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Student} from "../types/student";
import {StudySession} from "../types/study-session";


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentURL = 'assets/studentDB.json';
  private sessionsURL = 'assets/sessionsDB.json';


  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<{ students: Student[] }>(this.studentURL).pipe(
      map(({students}) => students)
    );
  }
  getSessions(): Observable<StudySession[]>{
    return this.http.get<{ sessions: StudySession[] }>(this.sessionsURL).pipe(
      map(({sessions}) => sessions)
    );
  }
}
