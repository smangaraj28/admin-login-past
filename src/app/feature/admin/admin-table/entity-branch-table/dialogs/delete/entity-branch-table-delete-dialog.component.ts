import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-entity-branch-table-delete',
  templateUrl: './entity-branch-table-delete-dialog.component.html',
  styleUrls: ['./entity-branch-table-delete-dialog.component.scss']
})
export class EntityBranchTableDeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<EntityBranchTableDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteIssue(this.data.entityId, this.data.entityBranchId);
  }
}
