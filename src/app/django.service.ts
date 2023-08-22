import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DjangoService {

  constructor(private http: HttpClient) { }

  // Django
  url = "http://localhost:8000/api/tasks/"

  fetchTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  postTask(body: any): Observable<any> {
    return this.http.post<any>(this.url, body);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete<any>(this.url + id + "/");
  }

  putTask(id: number, body: any): Observable<any> {
    return this.http.put<any>(this.url + id + "/", body);
  }

}//class
