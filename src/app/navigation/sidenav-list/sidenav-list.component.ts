import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  user$: Observable<firebase.User>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authService.getAfUser();
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }
}
