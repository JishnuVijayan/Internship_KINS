import { CommonModule } from '@angular/common';
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-name-details',
  imports: [HttpClientModule, CommonModule, FormsModule],
  templateUrl: './name-details.component.html',
  styleUrls: ['./name-details.component.css'],
})
export class NameDetailsComponent implements OnInit {
  authToken: string = '';
  countries: any[] = [];
  selectedCountry: string = '';
  states: any[] = [];

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
        environment.new_api_url + '/getaccesstoken',
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
      Authorization: `Bearer ${this.authToken}`,
    });
    this.http
      .get<any>(environment.new_api_url + '/countries/', {
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
  getStates(countryName: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    this.http
      .get<any[]>(environment.new_api_url + `/states/${countryName}`, {
        headers,
      })
      .subscribe(
        (response) => {
          this.states = response;
          console.log(this.states);
        },
        (error) => {
          console.error('Error Fetching countires:', error);
        }
      );
  }
}
