import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApplicationStepRoute } from '../models/step.model';
import { CurrentStepService } from '../services/current-step.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public currentRoute!: string;
  public currentStep!: number;
  constructor(
    private _step: CurrentStepService,
    private router: Router,
    private _location: Location
  ) {
    this.currentStep = 1;
    this.setStep();
  }

  ngOnInit(): void {
    this._step.getRouteNumber().subscribe((current_step) => {
      this.currentStep = current_step;
    });
  }

  public back(): void {
    this._location.back();
    switch (true) {
      case this.currentStep == 1:
        this.router.navigate(['application']);
        break;
      case this.currentStep == 2:
        this.router.navigate([ApplicationStepRoute.step_one]);
        break;
      case this.currentStep == 3:
        this.router.navigate([ApplicationStepRoute.step_two]);
        break;
      case this.currentStep == 4:
        this.router.navigate([ApplicationStepRoute.step_three]);
        break;
      case this.currentStep == 5:
        this.router.navigate([ApplicationStepRoute.step_four]);
        break;

      default:
        this.router.navigate(['application']);
        break;
    }
  }
  public setStep() {
    this.router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        let url = route.url;
        switch (true) {
          case url.includes(ApplicationStepRoute.step_one):
            this._step.addRouteNumber(1);
            break;
          case url.includes(ApplicationStepRoute.step_two):
            this._step.addRouteNumber(2);
            break;
          case url.includes(ApplicationStepRoute.step_three):
            this._step.addRouteNumber(3);
            break;
          case url.includes(ApplicationStepRoute.step_four):
            this._step.addRouteNumber(4);
            break;
          case url.includes(ApplicationStepRoute.final):
            this._step.addRouteNumber(5);

            break;
        }
      }
    });
  }

  public setIsCompleted(num: number): boolean {
    return num < this.currentStep ? true : false;
  }

  public step(step: number): void {
    switch (true) {
      // case step == 1:
      //   this.router.navigate([ApplicationStepRoute.step_one]);
      //   break;
      // case step == 2:
      //   this.router.navigate([ApplicationStepRoute.step_two]);
      //   break;
      // case step == 3:
      //   this.router.navigate([ApplicationStepRoute.step_three]);
      //   break;
      // case step == 4:
      //   this.router.navigate([ApplicationStepRoute.step_four]);
      //   break;

      default:
        break;
    }
  }

  public setIsCurrent(num: number): boolean {
    return num === this.currentStep ? true : false;
  }
}
