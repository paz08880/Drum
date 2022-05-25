import { ISound } from './../../models/sound.interface';
import { SoundService } from './../../service/sound.service';
import { Component, OnDestroy, OnInit , Input} from '@angular/core';
import { DrumsEnum } from 'src/app/models';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {  filter, tap, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.scss']
})
export class KeyComponent implements OnInit, OnDestroy {

  @Input() set sound(sound: ISound){
    this._sound = sound;
  }

  private _sound: ISound = {
    key: "",
    sound: DrumsEnum.Kick
  }

  private subscription: Subscription = new Subscription();

  public keyDown$: Observable<KeyboardEvent>;

  public isPlaying:boolean = false;

  get sound(){
    return this._sound;
  }

  constructor(private SoundService: SoundService) {
    this.keyDown$ = fromEvent(document, "keypress").pipe(
      map(data => data as KeyboardEvent),
      filter(data => data.key === this.sound.key.toLocaleLowerCase()),
      tap(data => {
        SoundService.playSound(this.sound.sound);
        this.isPlaying = true;
      }),
      debounceTime(200),
      tap(data => {
        this.isPlaying = false;
      })
      );


  }




  public mouseClick(dd:string) {
    this.SoundService.playSound(this.sound.sound);
    this.isPlaying = true;
  }


  ngOnInit(){
    this.subscription.add(this.keyDown$.subscribe());
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
