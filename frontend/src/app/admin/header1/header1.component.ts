import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-header1',
  templateUrl: './header1.component.html',
  styleUrls: ['./header1.component.css'],
})
export class Header1Component implements OnInit {
  welcomeForm!: FormGroup;
  selectedFile: File | null = null;
  loader:boolean=true;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.api.get('/admin/homePage').subscribe((data: any) => {
      this.welcomeForm = this.formBuilder.group({
        welcomeText: [data.welcomeText, Validators.required],
        name: [data.name, Validators.required],
        designation: [data.designation, Validators.required],
        headerImage: [data.headerImage, Validators.required],
        WhoAmIheading: [data.WhoAmIheading, Validators.required],
        WhoAmIDescription: [data.WhoAmIDescription, Validators.required],
        dob: [data.dob, Validators.required],
        email: [data.email, Validators.required],
        phone: [data.phone, Validators.required],
        skype: [data.skype, Validators.required],
        address: [data.address, Validators.required],
        facebookLink: [data.facebookLink, Validators.required],
        twitterLink: [data.twitterLink, Validators.required],
        googleLink: [data.googleLink, Validators.required],
        instagramLink: [data.instagramLink, Validators.required],
        discordLink: [data.discordLink, Validators.required],
       
      });

      // Populate existing expertise groups
    
      this.loader=false;
    });
  }

  
 

 



  onSubmit() {
    if (this.welcomeForm.invalid) {
      return;
    }

   console.log(this.welcomeForm.value);
   

    // Submit the form data to the API endpoint
    this.api.post('/admin/createHomePageData', this.welcomeForm.value).subscribe(
      (response: any) => {
        // Handle success
        console.log('Form submitted successfully:', response);
      },
      (error: any) => {
        // Handle error
        console.error('An error occurred:', error);
      }
    );
  }
  onUpload(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.api.upload('/admin/uploadAndGetUrl', this.selectedFile).subscribe(
        (response: any) => {
          if (response && response.data) {
            this.welcomeForm.get('headerImage')?.setValue(response.data);
          }
        },
        (error) => {
          console.error('File upload failed:', error);
          // Handle the error
        }
      );
    }
   
  }


  
}
