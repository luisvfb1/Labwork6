import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) {
  }
  ngOnInit() {
    setTimeout(() => {
      window.location.reload(); // Refresh the page after 0 seconds
    }, 0);
    setTimeout(() => {
      window.location.href = '/app'; // Redirect to /app after 0 seconds
    }, 0);

  }
}
