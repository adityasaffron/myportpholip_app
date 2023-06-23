import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // Add any other headers as needed
    });

    // Get the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something went wrong; please try again later.');
  }

  get(url: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}${url}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  post(url: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}${url}`, data, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }


  upload(url: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = this.getHeaders();
    headers.delete('Content-Type'); // Let the browser set the content type automatically

    return this.http.post(`${this.apiUrl}${url}`, formData).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  // Add more HTTP methods as needed (e.g., PUT, DELETE, etc.)
}
