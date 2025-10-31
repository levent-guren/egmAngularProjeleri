import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../shared/service/user.service';
import { User } from '../../shared/model/user';
import { DatePipe, DecimalPipe, JsonPipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { BuyukHarfPipe } from '../../shared/pipe/buyuk-harf.pipe';
import { KisaltmaPipe } from '../../shared/pipe/kisaltma.pipe';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    UpperCasePipe,
    DatePipe,
    JsonPipe,
    SlicePipe,
    BuyukHarfPipe,
    KisaltmaPipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  users: User[] = [];
  tarih = new Date();

  private userService = inject(UserService);

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (resp) => {
        this.users = resp;
      }
    });
  }

}
