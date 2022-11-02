import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import * as p5 from 'p5';
import { Font, FontInterface } from 'ngx-font-picker';

import { ColorRGB } from 'src/app/models/text-data';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})
export class GeneratorComponent implements OnInit {
  public topText = '';
  public bottomText = '';
  public topFont: FontInterface = new Font({
    family: 'Roboto',
    size: '50px',
    style: 'regular',
    styles: ['regular']
  });
  public bottomFont: FontInterface = new Font({
    family: 'Roboto',
    size: '50px',
    style: 'regular',
    styles: ['regular']
  });
  public defaultColor: ColorRGB = {
    r: 255,
    g: 255,
    b: 255,
    a: 1
  };
  public presetFonts = [
    'Arial',
    'Times',
    'Courier',
    'Lato',
    'Open Sans',
    'Roboto Slab'
  ];
  public defaultTopTextColor: ColorRGB = this.defaultColor;
  public defaultBottomTextColor: ColorRGB = this.defaultColor;

  private canvas: any;
  private canvasInstance: any;
  private img: any;
  private draggingTop = false;
  private draggingBottom = false;
  private textCoordinates = {
    xTop: 100,
    yTop: 50,
    xBottom: 100,
    yBottom: 300,
    topWidth: 400,
    bottomWidth: 400,
    topHeight: 400,
    bottomHeight: 400
  };

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const sketch = (s: any) => {
      s.setup = () => {
        this.canvas = s.createCanvas(600, 400);
        this.canvas.parent('canvasContainer');
        this.canvas.id('memeCanvas');
        this.canvas.background(220, 220, 220);
        this.canvas.textAlign('center');
        this.canvas.textSize(24);
        this.canvas.fill('white');
        this.canvas.text('Drop file from the device', 300, 200);
        this.canvas.drop(s.gotFile);
        this.canvas.mousePressed(s.pressed);
        this.canvas.mouseReleased(s.released);
      };

      s.draw = () => {
        if (this.img) {
          s.image(this.img, 0, 0, 600, 400);
          s.textFont(this.topFont.family);
          s.textStyle(this.topFont.style);
          s.textSize(parseFloat(this.topFont.size));
          s.fill(
            this.defaultTopTextColor.r,
            this.defaultTopTextColor.g,
            this.defaultTopTextColor.b
          );
          s.text(
            this.topText,
            this.textCoordinates.xTop,
            this.textCoordinates.yTop,
            this.textCoordinates.topWidth,
            this.textCoordinates.topHeight
          );
          s.textFont(this.bottomFont.family);
          s.textStyle(this.bottomFont.style);
          s.textSize(parseFloat(this.bottomFont.size));
          s.fill(
            this.defaultBottomTextColor.r,
            this.defaultBottomTextColor.g,
            this.defaultBottomTextColor.b
          );
          s.text(
            this.bottomText,
            this.textCoordinates.xBottom,
            this.textCoordinates.yBottom,
            this.textCoordinates.bottomWidth,
            this.textCoordinates.bottomHeight
          );
          s.update();
        }
      };

      s.update = () => {
        if (this.draggingTop) {
          this.textCoordinates.xTop = s.mouseX + s.offsetX;
          this.textCoordinates.yTop = s.mouseY + s.offsetY;
        }
        if (this.draggingBottom) {
          this.textCoordinates.xBottom = s.mouseX + s.offsetX;
          this.textCoordinates.yBottom = s.mouseY + s.offsetY;
        }
      };

      s.pressed = () => {
        if (
          s.mouseX > this.textCoordinates.xTop &&
          s.mouseX <
            this.textCoordinates.xTop + this.textCoordinates.topWidth &&
          s.mouseY > this.textCoordinates.yTop &&
          s.mouseY < this.textCoordinates.yTop + this.textCoordinates.topHeight
        ) {
          this.draggingBottom = false;
          this.draggingTop = true;
          s.offsetX = this.textCoordinates.xTop - s.mouseX;
          s.offsetY = this.textCoordinates.yTop - s.mouseY;
        }
        if (
          s.mouseX > this.textCoordinates.xBottom &&
          s.mouseX <
            this.textCoordinates.xBottom + this.textCoordinates.bottomWidth &&
          s.mouseY > this.textCoordinates.yBottom &&
          s.mouseY <
            this.textCoordinates.yBottom + this.textCoordinates.bottomHeight
        ) {
          this.draggingTop = false;
          this.draggingBottom = true;
          s.offsetX = this.textCoordinates.xBottom - s.mouseX;
          s.offsetY = this.textCoordinates.yBottom - s.mouseY;
        }
      };

      s.released = () => {
        this.draggingTop = false;
        this.draggingBottom = false;
      };

      s.gotFile = (file: any) => {
        let image = s.createImg(file.data).hide();
        this.img = image;
      };
    };

    this.canvasInstance = new p5(sketch);
  }

  public toDownload() {
    this.canvasInstance.saveCanvas('myMeme', 'jpg');
  }

  public reloadPage() {
    window.location.reload();
  }

  public handleTopFontChange(e: any): FontInterface {
    return this.topFont;
  }

  public handleBottomFontChange(e: any): FontInterface {
    return this.bottomFont;
  }

  public openTopTextDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: 'top'
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.defaultTopTextColor = res.data;
    });
  }

  public openBottomTextDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: 'bottom'
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.defaultBottomTextColor = res.data;
    });
  }
}
