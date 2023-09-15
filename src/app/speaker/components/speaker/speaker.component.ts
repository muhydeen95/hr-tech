import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { speakers } from '@shared/jsons/speakers';
import { HelperService } from '@shared/services/helper.service';
import { Speaker } from 'app/models/response.model';
import { SpeakersService } from 'app/speakers/services/speaker.service';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  public speakers = speakers;
  public speaker!: Speaker | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _helper: HelperService,
    private _speaker: SpeakersService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0);
    const id = this._route.snapshot.paramMap.get('id')!;
    this.getOneAttendant(id);
  }

  // public getSpeaker(id: number) {
  //   this.speaker = this.speakers.find((s: any) => {
  //     return s.id === id;
  //   })
  // }

  public getOneAttendant(id: string) {
    this._helper.startSpinner();
    this._speaker.getOneSpeaker(id).subscribe({
      next: (res: any) => {
          // console.log(res);
          this._helper.stopSpinner();
          if(res.response) {
            this.speaker = res.response;
          };
        }, error: (e: any) => {
          this._helper.stopSpinner();
          console.log(e);
        }
    });
  }

}
