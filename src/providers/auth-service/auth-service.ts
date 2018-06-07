import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import * as md5 from 'md5';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  constructor(private storage: Storage){}
  currentUser: User;


//Funzione per il login
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        this.storage.get(credentials.email).then(password => {

          if(password == md5(credentials.password)){
            observer.next(true);


        } else{
            observer.next(false);

        }
        observer.complete();
          });

      });
    }
  }
    //Creazione delle credenziali
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {

      return Observable.create(observer => {

        this.storage.set(credentials.email, md5(credentials.password));
        observer.next(true);
        observer.complete();
      });
    }
  }
  //funzione per ottenere le informazioni dell'utente corrente
  public getUserInfo() : User {
    return this.currentUser;
  }
  //Funzione di logout
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
}
