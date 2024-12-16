import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-details',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './name-details.component.html',
  styleUrls: ['./name-details.component.css'],
})
export class NameDetailsComponent implements OnInit {
  authToken: string = '';
  countries: any[] = [];

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.getAuthToken();
  }

  getAuthToken() {
    const headers = new HttpHeaders({
      'api-token':
        '1cMA3yNYCvJ3PL2FW86o-gtrIFHnZbkFZyJ3Q6X7uwoUvWvbuabro4G0nKTXfLzxWpo',
      'user-email': 'sreerajkarippala@gmail.com',
    });

    this.http
      .get<{ auth_token: string }>(
        'https://www.universal-tutorial.com/api/getaccesstoken',
        { headers }
      )
      .subscribe(
        (response) => {
          this.authToken = response.auth_token;
          console.log('Auth Token:', this.authToken);
          this.getCountries();
        },
        (error) => {
          console.error('Error Fetching auth token:', error);
        }
      );
  }

  getCountries() {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ${this.authToken}',
    });
    this.http
      .get<any>('https://www.universal-tutorial.com/api/countries/', {
        headers,
      })
      .subscribe(
        (response) => {
          this.countries = response;
          console.log(this.countries);
        },
        (error) => {
          console.error('Error Fetching countires:', error);
        }
      );
  }
}
