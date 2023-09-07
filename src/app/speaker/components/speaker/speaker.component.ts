import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { speakers } from '@shared/jsons/speakers';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  public speakers = speakers;
  public speaker!: any | undefined;

  constructor(
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this._route.snapshot.paramMap.get('id')!;
    this.getSpeaker(id);
  }

  public getSpeaker(id: number) {
    this.speaker = this.speakers.find((s: any) => {
      return s.id === id;
    })
  }

}
