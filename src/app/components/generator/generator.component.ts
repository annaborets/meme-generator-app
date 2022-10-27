import { Component, OnInit } from '@angular/core';
import { ColorEvent } from 'ngx-color/color-wrap.component';
import { ColorRGB, SliderObj } from 'src/app/models/textData';
import * as p5 from 'p5';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss'],
})
export class GeneratorComponent implements OnInit {
  private isClicked = false;
  private canvas: any;
  private canvasInstance: any;
  private img: any;

  public slider: SliderObj = {
    autoTicks: false,
    disabled: false,
    invert: false,
    max: 150,
    min: 20,
    showTicks: false,
    step: 1,
    thumbLabel: false,
    vertical: false,
    tickInterval: 1,
  };
  public topText = '';
  public bottomText = '';
  public textSize = 50;
  public textColor: ColorRGB = {
    r: 255,
    g: 255,
    b: 255,
    a: 1,
  };

  constructor() {}

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
          s.text(this.topText, 100, 50, 400, 400);
          s.text(this.bottomText, 100, 300, 400, 400);
          s.textSize(this.textSize);
          s.textAlign('center');
          s.textFont('Comic Sans MS');
          s.fill(this.textColor.r, this.textColor.g, this.textColor.b);
        }
      };
      // s.redraw = () => {
      //   if (this.isClicked) {
      //     // this.img = null;
      //     this.isClicked = false;
      //   }
      // };
      s.gotFile = (file: any) => {
        let image = s.createImg(file.data).hide();
        this.img = image;
      };
    };

    this.canvasInstance = new p5(sketch);
  }

  public getSliderTickInterval(): number | 'auto' {
    if (this.slider.showTicks) {
      return this.slider.autoTicks ? 'auto' : this.slider.tickInterval;
    }
    return 0;
  }

  public canvasTextColor($event: ColorEvent): ColorRGB {
    return (this.textColor = $event.color.rgb);
  }

  public toDownload() {
    this.canvasInstance.saveCanvas('myMeme', 'jpg');
  }

  public reloadPage() {
    window.location.reload();
  }
}
