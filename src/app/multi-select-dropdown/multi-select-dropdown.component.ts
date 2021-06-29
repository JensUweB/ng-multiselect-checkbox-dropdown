import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropdownComponent {
  @Input() data: any[];
  @Input() selected: any[] = [];
  @Input() labelKey = 'title';
  @Input() dataKey = 'id';
  @Input() groupBy: string;
  @Input() maxSelection = -1;
  @Input() onlyOneGroupSelectable = false;

  @Output() shareSelected = new EventEmitter();
  @Output() shareCurrentSelected = new EventEmitter();

  currentSelected: {};

  constructor() {
  }

  getSelectedValue(status: Boolean, value) {
    if (status) {
      this.selected.push(value);
    } else {
      var index = this.selected.indexOf(value);
      this.selected.splice(index, 1);
    }

    this.currentSelected = { checked: status, item: value };

    //share checked list
    this.shareSelected.emit(this.selected);

    //share individual selected item
    this.shareCurrentSelected.emit(this.currentSelected);
  }

  updateSelection(item) {
    if (this.selected.some(a => a[this.dataKey] === item[this.dataKey] )) {
      this.selected.splice(this.selected.indexOf(item), 1);
    } else if (this.maxSelection < 0 || this.selected.length < this.maxSelection){
      this.selected.push(item);
    }
  }

  canSelectItem(item) {
    return this.selected.some(a => a[this.dataKey] === item[this.dataKey] ||
      (this.maxSelection > 0 && this.selected.length < this.maxSelection));
  }
}
