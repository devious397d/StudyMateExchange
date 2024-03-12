import {Time} from "@angular/common";

export interface StudySession {
  id: number;
  title: string;
  language: string;
  instructor: string;
  date: Date;
  time: Time;
}
