import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { DataService } from '../services/data.service';

enum UserInput  {
  
}

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

  data = {
    firstName:"",
    middleName:"",
    lastName:"",
    roleKey:1,
    address:"",
    email:"",
    phone:"",
    customerId:1
  }
  id:number
  error:boolean = false;
  created:boolean = false;

  constructor(private dataService:DataService,private route:ActivatedRoute) { }

  onSubmit(){

    console.log("data",this.data);
    for(var key in this.data){
      if(!(this.data as any)[key]){
        this.error = true;
        console.log("fill all values",key)
        return;
      }
    }

    console.log("ready to submit",this.data)
    this.dataService.createUser(this.data);
    this.error = false;
    this.created = true;
  }

  ngOnInit(): void {
    this.data.customerId = Number(this.route.snapshot.params['id']);
  }

}
