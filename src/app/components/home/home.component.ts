import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APIResponseModel, Iname } from '../../model/interface/name';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  nameAndEmailList: Iname[] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getNames();
  }
  getNames() {
    this.http
      .get<APIResponseModel[]>(environment.api_url + '/1/comments')
      .subscribe((response: APIResponseModel[]) => {
        this.nameAndEmailList = response.map((item) => ({
          name: item.name,
          email: item.email,
        }));
      });
  }
}
