import { Injectable } from '@angular/core';
import {ClassInfo} from "./class-info";

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  url = 'http://localhost:3000/classInformation';
  constructor() { }

  async getAllClassInfo(): Promise<ClassInfo[]>{
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getClassInfoByID(id:number): Promise<ClassInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    console.log("ID: ",data, "  ---done");
    return await data.json() ?? {};
  }
}
