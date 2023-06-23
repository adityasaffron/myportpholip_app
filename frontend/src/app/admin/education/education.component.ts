import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  
  welcomeForm!: FormGroup;
  selectedFile: File | null = null;
  loader:boolean=true;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.welcomeForm = this.formBuilder.group({
      time: ["", Validators.required],
      course: ["", Validators.required],
      description: ["", Validators.required],
      
     
    });
    this.getHomePageData();
    this.loader=false;
  }
  Home:any;
  getHomePageData(): void {
    this.api.get('/admin/homePage').subscribe((data:any) => {
      
      this.Home=data.education;
      console.log(this.Home);
    })
  }
 

 



  onSubmit() {
    if (this.welcomeForm.invalid) {
      return;
    }

   console.log(this.welcomeForm.value);
   

    // Submit the form data to the API endpoint
    this.api.post('/admin/createEducation', this.welcomeForm.value).subscribe(
      (response: any) => {
        // Handle success
        console.log('Form submitted successfully:', response);
        this.getHomePageData();
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
            this.welcomeForm.get('image')?.setValue(response.data);
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
