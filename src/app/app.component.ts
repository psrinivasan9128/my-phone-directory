import { Component, OnInit } from '@angular/core';
import { phoneObjectModel } from './models/phoneModel';
import { FilereaderService } from './services/filereader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-phone-directory';
  listPhone: phoneObjectModel[];
  combinationPhoneList: phoneObjectModel[];
  displayList: phoneObjectModel[];
  totalNumberOfPages: number;
  currentPageNumber: number;
  pagesPerView: number;
  newPhone: string;
  pageList: number[];

  public constructor(private _filereader: FilereaderService) {
    this.listPhone = [];
    this.totalNumberOfPages = 0;
    this.currentPageNumber = 1;
    this.pagesPerView = 10;
    this.newPhone = "";
    this.combinationPhoneList = [];
    this.pageList = [];
    this.displayList = [];
  }

  ngOnInit() {
  }

  onClickSubmit() {
    let phone: phoneObjectModel;

    phone = new phoneObjectModel(this.newPhone);
    this.listPhone.push(phone);
    this.calculateCombinations();
    this.calculatePaging();
    this.setDisplayList();

  }

  calculateCombinations() {
    let combinationPhone: phoneObjectModel;
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.listPhone.forEach(element => {
      for (var i = 0; i < alphabet.length; i++) {
        combinationPhone = new phoneObjectModel(element.phoneNumber + "-" + alphabet.charAt(i));
        this.combinationPhoneList.push(combinationPhone);
      }
    });


  }

  calculatePaging() {
    this.pageList = [];
    this.totalNumberOfPages = 0;

    if (this.combinationPhoneList.length > 1) {
      this.totalNumberOfPages = Math.ceil(this.combinationPhoneList.length / this.pagesPerView);
    } else if (this.combinationPhoneList.length === 1) {
      this.totalNumberOfPages = 1;
    }

    for (let i = 1; i <= this.totalNumberOfPages; i++) {
      this.pageList.push(i);
    }
  }

  setDisplayList() {
    let lowerbound: number = (this.currentPageNumber - 1) * this.pagesPerView;
    let upperbound: number = lowerbound + this.pagesPerView;
    this.displayList = [];
    for (lowerbound; lowerbound < upperbound; lowerbound++) {
      if (this.combinationPhoneList[lowerbound] != undefined) {
        this.displayList.push(this.combinationPhoneList[lowerbound]);
      }
    }
  }

  clear() {
    this.combinationPhoneList = [];
  }

  changePage(inpVal: any) {
    this.currentPageNumber = parseInt(inpVal.target.value);
    this.setDisplayList();
  }

  refresh() {
    this.currentPageNumber = 1;
    this.calculatePaging();
    this.setDisplayList();
  }

}
