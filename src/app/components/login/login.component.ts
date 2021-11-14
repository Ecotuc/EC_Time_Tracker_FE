import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterEvent } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup:FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router,
              private data: DataSharingService) { 
    this.formGroup = this.fb.group({
      usuario: [''],
      password: ['']
    });
    this.data.sharedCurrentUser.subscribe(x =>{
      if (x.id != 0) {
        this.router.navigateByUrl("/main");
      }
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.backend.login(this.formGroup.controls['usuario'].value, this.formGroup.controls['password'].value).subscribe(result => {
      if (result.status != 0) {
        this.data.setCurrentUser(result.values[0]);
      } else {
        alert(result.message);
      }
    })
    /*
    this.backend.login(this.formGroup.controls['usuario'].value, this.formGroup.controls['password'].value).subscribe(resultado => {
        if (resultado.status != 0) {
          this.data.setIsLogged(resultado.values);
          this.router.navigateByUrl("/home");
          
        } else {
          alert(resultado.mensaje);
        }
    });
    */
  }

}
