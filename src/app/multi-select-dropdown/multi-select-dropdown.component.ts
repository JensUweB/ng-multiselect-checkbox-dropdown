import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-select-dropdown',
  templateUrl: './multi-select-dropdown.component.html',
  styleUrls: ['./multi-select-dropdown.component.scss']
})
export class MultiSelectDropdownComponent implements OnInit {
  @Input() data: any[];
  @Input() selected: any[] = [];
  @Input() labelKey = 'title';
  @Input() dataKey = 'id';
  @Input() groupBy: string;
  @Input() maxSelection = -1;
  @Input() onlyOneGroupSelectable = false;
  @Input() groupLabels: any;

  @Output() shareSelected = new EventEmitter();
  @Output() shareCurrentSelected = new EventEmitter();

  groups: string[] = [];
  group: string;
  showDropDown = false;

  constructor() {}

  ngOnInit() {
    if (this.groupBy) {
      this.data.forEach(item => {
        if (!this.groups.some(a => a === item[this.groupBy])) {
          this.groups.push(item[this.groupBy]);
          if (!this.group) {
            this.group = item[this.groupBy];
          }
        }
      });
    }
  }

  /**
   * Returns an array that contains all items that match the given group
   */
  getByGroup(group: string) {
    return this.data.filter(item => item[this.groupBy] === group);
  }

  /**
   * Item toggle - adds or removes the item based on this.selected
   */
  updateSelection(item) {
    if (this.selected.some(a => a[this.dataKey] === item[this.dataKey])) {
      this.removeItem(item);
    } else if (
      this.maxSelection < 0 ||
      this.selected.length < this.maxSelection
    ) {
      this.selected.push(item);
      if (!this.group) {
        this.group = item[this.groupBy];
      }
    }
  }

  /**
   * Checks if the provided item can be selected or not
   */
  canSelectItem(item) {
    if (this.group && this.onlyOneGroupSelectable) {
      return (
        (item[this.groupBy] === this.group &&
          (this.maxSelection > 0 &&
            this.selected.length < this.maxSelection)) ||
        this.isSelected(item) ||
        this.maxSelection < 0
      );
    }
    // TODO: fix
    // This second condition does not work properly
    return (
      (this.maxSelection > 0 && this.selected.length < this.maxSelection) ||
      this.isSelected(item) ||
      this.maxSelection < 0
    );
  }

  /**
   * Checks if the provided item is in this.selected
   */
  isSelected(item) {
    return this.selected.some(a => a[this.dataKey] === item[this.dataKey]);
  }

  /**
   * Removes the provided item from this.selected
   */
  removeItem(item) {
    this.selected = this.selected.filter(
      a => a[this.dataKey] !== item[this.dataKey]
    );
    if (this.selected.length === 0) {
      this.group = null;
    }
  }
}
