import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Entity} from '../models/entity';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {environment} from '../../../../../../environments/environment';

// import { environment } from '../../../../environments/environment';
// import { Entity } from '../../product';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    // private productsUrl = environment.server_url + '/products';
    dataChange: BehaviorSubject<Entity[]> = new BehaviorSubject<Entity[]>([]);
    // Temporarily stores entityData from dialogs
    dialogData: any;

    constructor(private httpClient: HttpClient) {
    }

    get data(): Entity[] {
        return this.dataChange.value;
    }

    getDialogData() {
        return this.dialogData;
    }

    /** CRUD METHODS */
    getAllIssues() {
        return this.httpClient.get<Entity[]>(environment['url_' + 'auth_signup'] + '/' + 'entity');
        // this.httpClient.get<Entity[]>('/assets/entity.json').subscribe(data => {
        //     console.log('data', data);
        //     this.dataChange.next(data);
        //   },
        //   (error: HttpErrorResponse) => {
        //     console.log(error.name + ' ' + error.message);
        //   });
    }

    // DEMO ONLY, you can find working methods below
    addIssue(issue: Entity): void {
        this.dialogData = issue;
    }

    updateIssue(issue: Entity): void {
        this.dialogData = issue;
    }

    deleteIssue(id: number): void {
        this.httpClient.delete(environment['url_' + 'auth_signup'] + '/' + 'entity', {
            params: new HttpParams().set('entityid', String(id))
        }).subscribe(entityData => {
                console.log(entityData);
                // this.toasterService.showToaster('Successfully deleted', 3000);
            },
            (err: HttpErrorResponse) => {
                // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
            }
        );
    }
}


/* REAL LIFE CRUD Methods I've used in my projects. ToasterService uses Material Toasts for displaying messages:

    // ADD, POST METHOD
    addItem(kanbanItem: KanbanItem): void {
    this.httpClient.post(this.API_URL, kanbanItem).subscribe(entityData => {
      this.dialogData = kanbanItem;
      this.toasterService.showToaster('Successfully added', 3000);
      },
      (err: HttpErrorResponse) => {
      this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
    });
   }

    // UPDATE, PUT METHOD
     updateItem(kanbanItem: KanbanItem): void {
    this.httpClient.put(this.API_URL + kanbanItem.id, kanbanItem).subscribe(entityData => {
        this.dialogData = kanbanItem;
        this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  // DELETE METHOD
  deleteItem(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe(entityData => {
      console.log(entityData['']);
        this.toasterService.showToaster('Successfully deleted', 3000);
      },
      (err: HttpErrorResponse) => {
        this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }
*/
