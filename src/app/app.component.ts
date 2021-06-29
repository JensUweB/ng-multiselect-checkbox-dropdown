import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  list : any[];

  constructor(){
    this.list = 
      [
        {name :'India',id : '1'},
        {name :'US',id : '2'},
        {name :'China',id : '3'},
        {name :'France',id : '4'}
      ]
  }

  shareCheckedList(item:any[]){
    console.log(item);
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }

}
