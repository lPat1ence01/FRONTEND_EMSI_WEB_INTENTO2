import { Injectable, inject } from '@angular/core';
import { Role } from '../model/role';
import { GenericService } from './generic.service';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends GenericService<Role> {

  private roleChange = new Subject<Role[]>();
  private messageChange = new Subject<string>();

  constructor() {
    super(
      inject(HttpClient),
      `${environment.HOST}/roles`
    );
  }

  setRoleChange(data: Role[]) {
    this.roleChange.next(data);
  }

  getRoleChange() {
    return this.roleChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
