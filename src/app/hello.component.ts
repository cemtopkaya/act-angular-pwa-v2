import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  template: `<h1 style='color:red'>
  Naber?
  <p>Hello {{name}}!</p>
  <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"/>
  </h1>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;
}
