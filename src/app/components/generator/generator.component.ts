import { Component, OnInit } from '@angular/core';
import { ColorRGB } from 'src/app/models/textData';
import { MatDialog } from '@angular/material/dialog';
import * as p5 from 'p5';
import { DialogComponent } from '../dialog/dialog.component';
import { Font, FontInterface } from 'ngx-font-picker';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements OnInit {
  private canvas: any;
  private canvasInstance: any;
  private img: any;
  private _presetFonts = [
    'Arial',
    'Times',
    'Courier',
    'Lato',
    'Open Sans',
    'Roboto Slab',
  ];

  public presetFonts = this._presetFonts;
  public topText = '';
  public bottomText = '';

  public topFont: FontInterface = new Font({
    family: 'Roboto',
    size: '50px',
    style: 'regular',
    styles: ['regular'],
  });

  public bottomFont: FontInterface = new Font({
    family: 'Roboto',
    size: '50px',
    style: 'regular',
    styles: ['regular'],
  });

  public defaultColor: ColorRGB = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  };

  public defaultTopTextColor: ColorRGB = this.defaultColor;

  public defaultBottomTextColor: ColorRGB = this.defaultColor;

  constructor(public dialog: MatDialog) {}

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
          s.text(this.topText, 100, 50, 400, 400);
          s.textFont(this.bottomFont.family);
          s.textStyle(this.bottomFont.style);
          s.textSize(parseFloat(this.bottomFont.size));
          s.fill(
            this.defaultBottomTextColor.r,
            this.defaultBottomTextColor.g,
            this.defaultBottomTextColor.b
          );
          s.text(this.bottomText, 100, 300, 400, 400);
        }
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
      data: 'top',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.defaultTopTextColor = res.data;
    });
  }

  public openBottomTextDialog() {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: 'bottom',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.defaultBottomTextColor = res.data;
    });
  }
}
