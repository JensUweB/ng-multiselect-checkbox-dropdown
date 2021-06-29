import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular';
  list: any[];

  groupLabels = {
    '67/1': 'Spezial',
    '67/2': 'Nahrungsmittel'
  };

  constructor() {
    this.list = [
      { name: 'Kurzware, Wolle', id: '1', group: '67/1' },
      { name: 'Waren des täglichen Bedarfs', id: '2', group: '67/1' },
      { name: 'Uhren, Schmuck, Geschenkartikel', id: '3', group: '67/1' },
      { name: 'Besondere Waren des täglichen Bedarfs', id: '4', group: '67/1' },
      { name: 'Obst, Gemüse', id: '5', group: '67/2' },
      { name: 'Eier, Nudeln', id: '6', group: '67/2' },
      { name: 'Fleisch, Wurst', id: '7', group: '67/2' },
      { name: 'Geflügel', id: '8', group: '67/2' }
    ];
  }

  shareCheckedList(item: any[]) {
    console.log(item);
  }
  shareIndividualCheckedList(item: {}) {
    console.log(item);
  }
}
