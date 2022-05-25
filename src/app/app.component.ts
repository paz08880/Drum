import { ISound } from './models/sound.interface';
import { SoundService } from './service/sound.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'מערכת נגינה';

  public drumKit: Array<ISound>;

  constructor(private SoundService: SoundService){
    this.drumKit = this.SoundService.getDrumKit();
  }
}
