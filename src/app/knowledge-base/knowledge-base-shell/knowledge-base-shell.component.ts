import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getQnAPairCount, State } from '../state';

@Component({
  templateUrl: './knowledge-base-shell.component.html',
})
export class KnowledgeBaseShellComponent implements OnInit {

   qnaPairCount$: Observable<number>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {

    this.qnaPairCount$ = this.store.select(getQnAPairCount);
  }

}
