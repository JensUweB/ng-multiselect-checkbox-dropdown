import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';

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
  @Input() placeholder = 'Bitte auswählen...';
  @Input() disabled: boolean;

  @Output() shareSelected = new EventEmitter();

  groups: string[] = [];
  group: string = null;
  showDropDown = false;

  constructor() {}

  ngOnInit() {
    this.initGroups();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (changes.data || changes.selected) {
        this.initGroups();
      }
    }
  }

  initGroups() {
    if (this.groupBy) {
      this.groups = [];
      this.data.forEach(item => {
        if (!this.groups.some(a => a === item[this.groupBy])) {
          this.groups.push(item[this.groupBy]);
          if (!this.group && item[this.groupBy]) {
            this.group = item[this.groupBy];
          }
        }
      });
    }
    if (this.selected && this.selected.length > 0) {
      this.group = this.selected[0][this.groupBy];
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
      item.checked = true;
      this.selected.push(item);
      if (!this.group) {
        this.group = item[this.groupBy];
      }
    }
    this.shareSelected.next(this.selected);
  }

  /**
   * Checks if the provided item can be selected or not
   */
  canSelectItem(item) {
    if (this.group && this.onlyOneGroupSelectable) {
      return ((item[this.groupBy] === this.group
          && (this.maxSelection > 0 && this.selected.length < this.maxSelection ||  this.maxSelection < 0)) ||  this.isSelected(item)
      );
    }
    // TODO: fix
    // This second condition does not work properly
    return ((this.maxSelection > 0 && this.selected.length < this.maxSelection) ||
      this.isSelected(item) || this.maxSelection < 0);
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
