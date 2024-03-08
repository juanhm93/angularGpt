import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-assisten-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './assistenPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AssistenPageComponent { }
