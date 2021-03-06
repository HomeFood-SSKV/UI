import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../services/search.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  selectedAddressType: string;
  results: any;
  FilteredResults: any;
  queryField: FormControl = new FormControl();
  constructor(private _searchService: SearchService) { }

  ngOnInit() {
//     this._searchService.search().subscribe((response) => {
//       if (response && response.addressType) {
//       // this.results = response.addressType;
//       //  this.FilteredResults = response;
//        console.log('search success');
//       } else {
//        console.log('search fails');
//       }
//     });
//     this.queryField.valueChanges.subscribe(
//       val => {
//       if (val.length > 0 ) {
//         this.FilteredResults = [];
//         for (let x = 0 ; x < this.results.length; x++) {
//           if (this.results[x].addressTypeName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
//           this.FilteredResults.push(this.results[x]);
//           }
//          }
//       }
//       if (val.length === 0 ) {
//         this.FilteredResults = this.results;
//       }
//       }
//     );
//   }
//   getSelectedData(selectedField: any) {
//  this.selectedAddressType = selectedField.addressTypeName;
//  this.queryField.setValue(selectedField.addressTypeName);
   }
}
