import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Customer } from "../models/customer.model";

@Injectable()
export class DataService {
    fetchData = new EventEmitter<any[]>();
    fetchCustomer = new EventEmitter<Customer>();

    private data:any[]=[]

    constructor(private http:HttpClient){}

    getUsers(){
        // make api call

        this.http.get("http://127.0.0.1:3000/users?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22firstName%22%3A%20true%2C%0A%20%20%20%20%22middleName%22%3A%20true%2C%0A%20%20%20%20%22lastName%22%3A%20true%2C%0A%20%20%20%20%22email%22%3A%20true%2C%0A%20%20%20%20%22phone%22%3A%20true%2C%0A%20%20%20%20%22address%22%3A%20true%2C%0A%20%20%20%20%22customerId%22%3A%20true%2C%0A%20%20%20%20%22roleKey%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%0A%20%20%20%20%22customer%22%0A%20%20%5D%0A%7D").subscribe((data)=>{
            // console.log(,data);
            this.data = data as any;
            console.log("another",this.data)
            this.fetchData.emit(this.data);

        });
        // console.log("get from server",a)
    }

    getCustomerUsers(id:number){
        this.http.get(`http://127.0.0.1:3000/customers/${id}/users?filter=%7B%0A%20%20%22additionalProp1%22%3A%20%7B%7D%0A%7D`).subscribe((data)=>{
            console.log("customer users",data);
            this.data = data as any;
            this.fetchData.emit(this.data);
        })
    }

    createUser(UserInput:any){
        this.http.post(`http://127.0.0.1:3000/users`,UserInput).subscribe((data)=>{
            console.log("created user",data);
            this.getUsers();
        })
    }

    updateUser(inputUser:any,id:number){
        // this.appolo.mutate({
        
        this.http.put(`http://127.0.0.1:3000/users/${id}`,inputUser).subscribe(data=>{
            console.log("update data",data);

            this.getUsers();
        })

    }
    updateCustomerUser(inputUser:any,id:number){
        // this.appolo.mutate({
        
        this.http.put(`http://127.0.0.1:3000/users/${id}`,inputUser).subscribe(data=>{
            console.log("update data",data);

            this.getCustomerUsers((inputUser as any).customerId);
        })

    }


    deleteUser(id:number){
        //make call to delete data

        this.http.delete(`http://127.0.0.1:3000/users/${id}`).subscribe(data=>{

            console.log("deleted",data);
            this.getUsers();

        })

    }

    getCustomers(){
        // make api call
        
        console.log("call made");
        this.http.get("http://127.0.0.1:3000/customers?filter=%7B%0A%20%20%22offset%22%3A%200%2C%0A%20%20%22limit%22%3A%20100%2C%0A%20%20%22skip%22%3A%200%2C%0A%20%20%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22additionalProp1%22%3A%20%7B%7D%0A%20%20%7D%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22id%22%3A%20true%2C%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22website%22%3A%20true%2C%0A%20%20%20%20%22address%22%3A%20true%0A%20%20%7D%2C%0A%20%20%22include%22%3A%20%5B%0A%20%20%20%20%0A%20%20%20%20%22users%22%0A%20%20%5D%0A%7D").subscribe((data)=>{
            // console.log(,data);
            this.data = data as any;
            console.log("another",this.data)
            this.fetchData.emit(this.data);

        });
        // console.log("get from server",a)
    }

    getCustomer(id:number){
        this,this.http.get(`http://127.0.0.1:3000/customers/${id}`).subscribe((data)=>{
            this.data = data as any;
            this.fetchCustomer.emit(this.data as any);
        })
    }

    
    createCustomer(CustomerInput:any){
        this.http.post(`http://127.0.0.1:3000/customers`,CustomerInput).subscribe((data)=>{
            console.log("created customer",data);
            this.getCustomers();
        })
    }

    updateCustomer(inputCustomer:any,id:number){
        // this.appolo.mutate({
        
        this.http.put(`http://127.0.0.1:3000/customers/${id}`,inputCustomer).subscribe(data=>{
            console.log("update data",data);

            this.getCustomers();
        })

    }

    deleteCustomer(id:number,customerId:number){
        //make call to delete data

        

    }

    deleteCustomerUser(customerId:number,id:number){
        // this.appolo.mutate({
        console.log("ids",customerId,id);
            this.http.delete(`http://127.0.0.1:3000/users/${id}`).subscribe(data=>{

                console.log("deleted",data);
                this.getCustomerUsers(customerId);
    
            })

    }
}