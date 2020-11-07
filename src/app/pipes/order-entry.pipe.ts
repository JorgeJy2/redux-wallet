import { Pipe, PipeTransform } from '@angular/core';
import { EntryExit, TYPE_ENTRY_EXIT } from '../models/entry-exit.model';

@Pipe({
  name: 'orderEntry'
})
export class OrderEntryPipe implements PipeTransform {

  transform(items: EntryExit[]): EntryExit[] {
    // console.log(items)
    // return items;
    return items.slice().sort((a,b) =>  {
      return (a.type === TYPE_ENTRY_EXIT.entry) ? -1 : 1;
    });
  }

}
