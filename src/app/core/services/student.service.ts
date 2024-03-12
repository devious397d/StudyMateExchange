import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Student} from "../types/student";


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'assets/studentDB.json';

  constructor(private http: HttpClient) {
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<{ students: Student[] }>(this.baseUrl).pipe(
      map(({students}) => students)
    );
  }
}
