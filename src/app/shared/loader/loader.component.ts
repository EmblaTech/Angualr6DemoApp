import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  public visible = false;
  public width = '0%';
  constructor() { }

  ngOnInit() {
  }

  public show(): void {
    this.visible = true;
    this.width = '100%';
  }

  public hide(): void {
    this.visible = false;
    this.width = '0%';
  }

}
