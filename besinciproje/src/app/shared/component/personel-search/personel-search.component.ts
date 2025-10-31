import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { PersonelSearch } from '../../model/personel-search.model';

@Component({
  selector: 'app-personel-search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personel-search.component.html',
  styleUrl: './personel-search.component.scss'
})
export class PersonelSearchComponent {
  @Output('search')
  searchEmitter = new EventEmitter<PersonelSearch>();

  fb = inject(FormBuilder);
  searchForm = this.fb.nonNullable.group({
    id: '',
    name: '',
    surname: ''
  });

  search() {
    const id = this.searchForm.get('id')!.value;
    const name = this.searchForm.get('name')!.value;
    const surname = this.searchForm.get('surname')!.value;
    const event = new PersonelSearch(id, name, surname);
    this.searchEmitter.emit(event);
  }
}
