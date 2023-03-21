import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  styleUrls: ['./farmers.component.css']
})
export class FarmersComponent {


  formdata: any;
  result: any;
  id = "";
  p:number =1;
  itemsPerPage:number =3;


  constructor(private api: ApiService) { }


  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = "";
    this.api.get("farmers").subscribe((result: any) => {
      // console.log(result);

      this.result = result.data;

    })
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required])),
      mobileno: new FormControl("", Validators.compose([Validators.required])),
      landspace: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))

    })
  }

  edit(id: any) {
    this.id = id;
    // console.log(id);
    this.api.get("farmers/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.data.name, Validators.compose([Validators.required])),
        email: new FormControl(result.data.email, Validators.compose([Validators.required])),
        mobileno: new FormControl(result.data.mobileno, Validators.compose([Validators.required])),
        landspace: new FormControl(result.data.landspace, Validators.compose([Validators.required])),
        password: new FormControl(result.data.password, Validators.compose([Validators.required])),

      })
      // console.log(result);

    })
  }
  // reset(){
  //   this.id ="";
  //   this.formdata = new FormGroup({
  //     name: new FormControl(result.data.name, Validators.compose([Validators.required])),
  //     email: new FormControl(result.data.email, Validators.compose([Validators.required])),
  //     mobileno: new FormControl(result.data.mobileno, Validators.compose([Validators.required])),
  //     landspace: new FormControl(result.data.landspace, Validators.compose([Validators.required])),
  //     password: new FormControl(result.data.password, Validators.compose([Validators.required])),

  //   })
  // }

  delete(id: any) {

    this.api.delete("farmers/" + id).subscribe((result: any) => {
      this.load();

    });

  }

  submit(data: any) {
    if (this.id == "") {
      this.api.post("farmers" + this.id, data).subscribe((result: any) => {
        console.log(result);

        if (result.status == "success") {
          this.load()
          let element: HTMLElement = document.getElementById('btnclose') as HTMLElement;
          element.click();
        }
      })
    }
    else {
      this.api.put("farmers/" + this.id, data).subscribe((result: any) => {
        if (result.status == "success")
          this.load();
          let element: HTMLElement = document.getElementById('btnclose') as HTMLElement;
          element.click();



      })
    }
  }
}






