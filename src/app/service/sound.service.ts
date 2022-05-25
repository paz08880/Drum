import { Injectable } from '@angular/core';
import { DrumsEnum , ISound } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor() { }

  private sound: HTMLAudioElement = new Audio();

  private _drumkit: Array<ISound> = [
    {
      key:"A",
      sound: DrumsEnum.Kick
    },
    {
      key:"S",
      sound: DrumsEnum.Ride
    },
    {
      key:"D",
      sound: DrumsEnum.Rim
    },
    {
      key:"F",
      sound: DrumsEnum.Tom2M
    },
    {
      key:"G",
      sound: DrumsEnum.Crash1
    },
    {
      key:"H",
      sound: DrumsEnum.GateKick
    },
    {
      key:"W",
      sound: DrumsEnum.Tom2M
    }
  ]

  public getDrumKit(): Array<ISound> {
    return this._drumkit;
  }


  public playSound(sound: DrumsEnum): void{
    const filePath:string = `assets/audio/${sound}`;
    this.sound = new Audio(filePath);
    this.sound.play().then(() => {
      this.sound.remove();
    });
  }

}
