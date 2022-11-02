import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ColorEvent } from 'ngx-color/color-wrap.component';

import { ColorRGB } from 'src/app/models/text-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public defaultTextColor: ColorRGB = {
    r: 255,
    g: 255,
    b: 255,
    a: 1
  };

  public changedTextColor: ColorRGB = this.defaultTextColor;

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  public canvasTextColor($event: ColorEvent): ColorRGB {
    return (this.changedTextColor = $event.color.rgb);
  }

  public saveChanges(data: string) {
    this.dialogRef.close({
      data: this.changedTextColor
    });
  }

  public cancelChanges() {
    this.dialogRef.close({
      data: this.defaultTextColor
    });
  }
}
