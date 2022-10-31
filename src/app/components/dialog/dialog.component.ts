import { Component, OnInit, Inject } from '@angular/core';
import { ColorRGB } from 'src/app/models/textData';
import { ColorEvent } from 'ngx-color/color-wrap.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public defaultTextColor: ColorRGB = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  };

  public changedTextColor: ColorRGB = this.defaultTextColor;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {}

  public canvasTextColor($event: ColorEvent): ColorRGB {
    return (this.changedTextColor = $event.color.rgb);
  }

  public saveChanges(data: string) {
    this.dialogRef.close({
      data: this.changedTextColor,
    });
  }

  public cancelChanges() {
    this.dialogRef.close({
      data: this.defaultTextColor,
    });
  }
}
