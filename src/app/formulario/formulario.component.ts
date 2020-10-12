import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer.model';
import { Component, OnInit, Output } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromStore from '../store';
import { NgForm } from '@angular/forms';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})



export class FormularioComponent implements OnInit{
  customers: Customer[];
  display:string='none';
  isEditModeEnabled:boolean = false;
  persona: Customer = {};
 

  

 usuarioInput:string;
  constructor(private store : Store<fromStore.AppState>){
      store.select(fromStore.getCustomers).subscribe(rs => {
          this.customers = rs;
      }); 

      store.select(fromStore.getCustomerById(2)).subscribe(rs => {
          //console.log(rs);
      }); 
  }
  @Output()
  send=new EventEmitter();
  ngOnInit(){
    this.store.dispatch(new fromStore.LoadCustomer());
  }

  editClient(customer){
    this.isEditModeEnabled = true;
    this.persona =  {...customer};
    this.display = 'block';
  }

  updateCustomer(myForm: NgForm){
    this.store.dispatch(new fromStore.UpdateCustomer(myForm.value));
    this.closeModal(myForm);
  }

  addCustomer(myForm : NgForm){
    let userId = new Date().getTime();
    let newCustomer = myForm.value; 
    newCustomer['id'] = userId;

    if(newCustomer.name !== null && newCustomer !== undefined){
        this.store.dispatch(new fromStore.AddCustomer(newCustomer));
        this.closeModal(myForm);
    }
  }

  deleteClient(customerId){
      if(customerId !== undefined){
          if(confirm('¿Estas seguro de borrar a este usuario?')){
              this.store.dispatch(new fromStore.DeleteCustomer(customerId));
          }
      }
  }
  
  openModalDialog(){
    this.isEditModeEnabled = false;
    this.display ='block';
  }

  closeModal(myForm: NgForm){
    myForm.reset();
    this.display = 'none';
  }
  changeInput( input:string ){
    this.send.emit(input);
  }
}
