import { Component, OnInit } from "@angular/core";

import {MessageService} from 'primeng/api';
import {
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule
} from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: "app-trainer-register",
  templateUrl: "./trainer-register.component.html",
  styleUrls: ["./trainer-register.component.css"]
})
export class TrainerRegisterComponent implements OnInit {
  TrainerRegister: FormGroup;
  skillData: Object;
  submitted = false;
  result1;
  techName;
  linked;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private messageService : MessageService
  ) {}

  ngOnInit() {
    this.TrainerRegister = this.fb.group({
      firstName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      lastName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      userName: ["", [Validators.required, Validators.pattern("[a-zA-Z ]*")]],
      email: ["",[
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]
      ],
      contactNumber: ['',[Validators.required, Validators.pattern("^([6-9]{1})([0-9]{9})$")]],
      Passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(4)]],
          confirmPassword: ['', Validators.minLength(4)]
        },
        { validator: this.comparePasswords }
      ),
      linkedinURL: ['', Validators.required],
      yearOfExperience: [
        '',
        [Validators.required, Validators.pattern("^[0-9]{1,2}$")]
      ],
      trainerTechnology: ['', Validators.required]
    });

    this.getAllSkillslogy();
  }

  getAllSkillslogy() {
    console.log("hello");
    this.auth.getAllSkills().subscribe(data => {
      console.log(data);
      this.skillData = data;
    });
  }

  comparePasswords(fb: FormGroup) {
    let confirmPassword = fb.get("confirmPassword");
    if (
      confirmPassword.errors == null ||
      "passwordMismatch" in confirmPassword.errors
    ) {
      if (fb.get("password").value != confirmPassword.value)
        confirmPassword.setErrors({ passwordMismatch: true });
      else confirmPassword.setErrors(null);
    }
  }

  onSubmit() {
    console.log("results");
    this.submitted = true;
    

    this.result1 = {
      
       
      mentorName: this.TrainerRegister.value.userName,
      email: this.TrainerRegister.value.email,
      mentorPhoneNo: this.TrainerRegister.value.contactNumber,
      startTime:this.TrainerRegister.value.firstName,
      endTime:this.TrainerRegister.value.lastName,
      password: this.TrainerRegister.value.Passwords.password,
      linkedIn: this.linked,
      experience: this.TrainerRegister.value.yearOfExperience,
      mentorProfile:"THis is the Trainer Which is Having Experience of 3 years",
      primaryTechnology: this.techName,
      mentorBlock:false
    };

    //alert(JSON.stringify(this.TrainerRegister.value));
    console.log("results"+this.result1);
    this.auth.saveMentor(this.result1).subscribe(data =>
      {
  
        console.log(data);
        if(data.message == "Registered Successfully")
        {
          this.messageService.add({
            severity: "success",
            detail: "Registered Successfully"
          });
          
          this.router.navigate(['login']);
        }
        else if( data.message == "Email Not Registered")
        {
  
          this.messageService.add({
            severity: "error",
            detail: "Email Not Registered"
          });
          
          this.router.navigate(['user-register']);
          return false;
  
        }
      });


    }
    
  onReset() {
    this.submitted = false;
    this.TrainerRegister.reset();
  }
}
