import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "bootstrap-autocomplete",
  templateUrl: "./autocomplete.component.html",
  styleUrls: ["./autocomplete.component.css"]
})

export class AutocompleteComponent implements OnInit {
  @Input() entries: Array<any>;
  @Input() entryProperty: string;
  @Input() inputPlaceholder: string = "Search..."
  @Input() inputId: string | number = 0;
  @Output() onEntrySelected = new EventEmitter();
  showResults: boolean = false;
  filteredEntities: any;
  filter: string;

  constructor() {
  }

  ngOnInit() {
    this.filteredEntities = this.entries;
  }

  filterEntries(filter: string) {
    if (typeof this.entryProperty != 'undefined') {
      this.filteredEntities = this.entries.filter(item => item[this.entryProperty].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    } else {
      this.filteredEntities = this.entries.filter(item => item.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
  }


  inputFieldFocused() {
    let inputId = 'inputField' + this.inputId;
    let menuId = '#menu' + this.inputId + ' ' + 'a';
    console.log(menuId);
    document.getElementById(inputId).addEventListener('keydown', function (e) {
      if (e.key == "ArrowDown") {
        (document.querySelectorAll(menuId)[0] as any).focus();
      }
    });
  }

  selectEntry(entry) {
    this.filter = entry[this.entryProperty];
    this.showResults = false;
    this.onEntrySelected.emit(entry);
  }

}
