import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  template: `
  `
})
export class LoadingComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/app/todo']); // Redirect to the desired page after 0 seconds
    }, 0);
  }
}
