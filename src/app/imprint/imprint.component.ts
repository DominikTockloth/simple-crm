import { Component } from '@angular/core';
import { MatCardContent, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardContent,
   
  ],
  templateUrl: './imprint.component.html',
  styleUrl: './imprint.component.scss'
})
export class ImprintComponent {

}
