import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TYPE_ENTRY_EXIT, EntryExit } from '../models/entry-exit.model';
import { EntryExitService } from '../services/entry-exit.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-entry-exit',
  templateUrl: './entry-exit.component.html',
  styleUrls: ['./entry-exit.component.scss']
})
export class EntryExitComponent implements OnInit {


  entryExitForm: FormGroup;
  type: TYPE_ENTRY_EXIT;

  constructor(private fb: FormBuilder, private entryExitService: EntryExitService,
    private alertService: AlertService, private store: Store<AppState>) {

    this.entryExitForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
    this.type = TYPE_ENTRY_EXIT.entry;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.entryExitForm.invalid) {
      console.error('Form entry exit invalid');
      return;
    }

    console.log(this.entryExitForm.value);
    console.log(this.entryExitForm.valid);
    console.log(this.entryExitForm.errors);
    console.log(this.type);
    this.store.dispatch(isLoading());
    const entryExit: EntryExit = {
      ... this.entryExitForm.value,
      type: this.type
    };

    console.log(entryExit);

    this.entryExitService.create(entryExit).then(() => {
      this.alertService.message('Create', 'Ok');
      this.resetForm();
      })
      .catch(error => {
        this.alertService.error(error.message);
        console.error(error);
      })
      .finally(() => this.store.dispatch(stopLoading()));
  }

  onChangeType(type: TYPE_ENTRY_EXIT): void {
    this.type = type;
  }

  resetForm(): void {
    this.entryExitForm.reset();
  }

}
