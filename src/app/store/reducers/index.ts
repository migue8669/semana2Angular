import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCustomerReducer from './app.reducer';

export interface AppState {
    customers : fromCustomerReducer.CustomerState
}

export const reducers = {
    customers : fromCustomerReducer.reducer
}

export const getState = (state) => state;

export const getCustomersState = createFeatureSelector<fromCustomerReducer.CustomerState>('customers');
//export const getCustomers = createSelector(getCustomersState, fromCustomerReducer.getCustomers);

export const getCustomers = createSelector(getCustomersState, 
    fromCustomerReducer.customerAdapter.getSelectors().selectAll);

export const getCustomerById = (id) => createSelector(getCustomers, (customers) => {
    if(customers){
        var customerFound = customers.find(persona => persona.id === id);

        return customerFound || {};
    }else{
        return {};
    }
});


