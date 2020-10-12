import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { Store } from "@ngrx/store";
import * as fromStore from '../store';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  customers: Customer[];
  display:string='none';
  isEditModeEnabled:boolean = false;
  persona: Customer = {};
  @Input()
  usuarioInput:string;
  constructor(private store : Store<fromStore.AppState>){
    store.select(fromStore.getCustomers).subscribe(rs => {
        this.customers = rs;
    }); 

    store.select(fromStore.getCustomerById(2)).subscribe(rs => {
        //console.log(rs);
    }); 
}
  ngOnInit() {
    console.log(this.usuarioInput);

  }

  editClient(customer){
    this.isEditModeEnabled = true;
    this.persona =  {...customer};
    this.display = 'block';
  }
  deleteClient(customerId){
    if(customerId !== undefined){
        if(confirm('¿Estas seguro de borrar a este usuario?')){
            this.store.dispatch(new fromStore.DeleteCustomer(customerId));
        }
    }
}
}
