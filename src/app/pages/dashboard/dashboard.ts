import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AgGridAngular } from 'ag-grid-angular';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
  CommonModule,
  Header,
  RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AgGridAngular
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {


  constructor(private socketService: SocketService) {}

ngOnInit() {

  this.socketService.connect('/roster');

  this.socketService.messages$.subscribe(msg => {
    if (msg) {
      console.log('Socket Event:', msg);
    }
  });
}


}
