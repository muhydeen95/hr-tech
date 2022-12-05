import {
  HttpErrorResponse,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BaseComponent } from '@core/base/base/base.component';
// import { CurrentUserService } from '@core/services/current-user.service';
import { ResponseModel } from 'app/models/response.model';
import { ChangePasswordDialogComponent } from 'app/profile/dialogs/change-password-dialog/change-password-dialog.component';
import { Profile } from 'app/profile/models/user-profile.model';
import { ProfileService } from 'app/profile/services/profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private sub: Subscription = new Subscription();
  public isLoading: boolean = false;
  public isFetchingProfile: boolean = false;
  public isUploading: boolean = false;
  public isEditing: boolean = false;
  public updateProfileForm!: UntypedFormGroup;
  public profile!: Profile;
  public fileUploadProgress: number = 0;
  public error_message: string = '';
  public isError: boolean = false;
  public uploadedImage: boolean = false;
  public imageFile: any;
  public image: string = '';
  public imageSrc: string = '';

  constructor(
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private _profile: ProfileService,
    private _base: BaseComponent
  ) {}

  ngOnInit() {
    this.getUserProfile();
    this.initUpdateProfileForm();
    // this.updateProfileForm.disabled();
  }

  initUpdateProfileForm() {
    this.updateProfileForm = this.fb.group({
      firstName: [this.profile?.firstName ? this.profile?.firstName : ''],
      middleName: [this.profile?.middleName ? this.profile?.middleName : ''],
      lastName: [this.profile?.lastName ? this.profile?.lastName : ''],
      phoneNumber: [this.profile?.phoneNumber ? this.profile?.phoneNumber : ''],
      alternatePhoneNumber: [
        this.profile?.alternatePhoneNumber
          ? this.profile?.alternatePhoneNumber
          : '',
      ],
      email: [this.profile?.email ? this.profile?.email : ''],
      AlternateEmail: [
        this.profile?.alternateEmail ? this.profile?.alternateEmail : '',
      ],
      organizationName: [
        this.profile?.organizationName ? this.profile?.organizationName : '',
      ],
    });
  }

  toggleEdit() {
    this.isEditing = true;
  }

  public getUserProfile(): void {
    this.isFetchingProfile = true;
    this.sub.add(
      this._profile.getProfile().subscribe({
        next: (res: any) => {
          // console.log(res)
          this.isFetchingProfile = false;
          this.profile = res?.response;
          this.initUpdateProfileForm();
        },
        error: (error: ResponseModel<null>) => {
          this.isFetchingProfile = false;
        },
      })
    );
  }

  getInitials() {
    return (
      this.profile.firstName?.charAt(0).toUpperCase() +
      this.profile.lastName?.charAt(0).toUpperCase()
    );
  }

  public changeProfilePic(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const [file] = event.target.files;
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
      this.imageFile = event.target.files[0];
      this.image = event.target.files[0].name;
      this.uploadedImage = true;
    }
    this.uploadImage();
  }

  public uploadImage() {
    if (this.imageFile != null) {
      this.isUploading = true;
      const payload = this.imageFile;
      this.sub.add(
        this._profile.addProfilePicture(payload).subscribe({
          next: (event: any) => {
            console.log(event);
            if (event.type === HttpEventType.UploadProgress) {
              this.fileUploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event instanceof HttpResponse) {
              const res = event.body;
              // console.log(res)
              this.isUploading = false;
              this.profile.profilePictureUrl =
                res['response'].emailSignatureUrl;
              this._base.openSnackBar(
                'Great...!!!, Your action was successful',
                'success'
              );
            }
          },
          error: (e: any) => {
            this.isUploading = false;
            console.log(e);
            this.error_message = e.error.message;
          },
        })
      );
    } else {
      // this.alertHelper.showOkAlert("Error", "Please select a file!");
    }
  }

  public openModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '480px';
    dialogConfig.width = '700px';
    const dialogRef = this.dialog.open(
      ChangePasswordDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  public submit() {
    this.isLoading = true;
    const payload = this.updateProfileForm.value;
    this.sub.add(
      this._profile.updateProfile(payload).subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.isEditing = false;
          this._base.openSnackBar(
            'Great...!!!, Your action was successful',
            'success'
          );
          this.profile = payload;
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.isError = true;
          this.error_message = error?.error?.Id[0];
        },
      })
    );
  }
}
