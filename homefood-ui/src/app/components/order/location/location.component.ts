import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

    locations = [];
    selectedLocation;
    onSelectionChange(locations) {
        this.selectedLocation = location;
        // post data, if required
    }
    getLocations() {
      // get delivery locations list
      const geturl = 'https://www.googleapis.com/getlocation';
      this.apiService.getData(geturl).subscribe((response) => {
        console.log(response);
        this.locations = [
          {
              id: 1,
              name: 'location 1',
              selected: false
          },
          {
              id: 2,
              name: 'location 2',
              selected: false
          },
          {
              id: 3,
              name: 'location 3',
              selected: false
          }
          ];
      });
    }
  constructor(private apiService: ApiService) { }

  ngOnInit() {
   this. getLocations();
  }

}
