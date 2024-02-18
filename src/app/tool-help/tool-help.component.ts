import { Component } from '@angular/core';

@Component({
  selector: 'tool-help',
  standalone: true,
  imports: [],
  templateUrl: './tool-help.component.html',
  styleUrl: './tool-help.component.scss'
})
export class ToolHelpComponent {
  pdfs = [
    { title:"Tutorial.pdf", pages:7 },
    { title:"Taxes1.pdf", pages:9 },
    { title:"Taxes2.pdf", pages:25 },
    { title:"Presentation.pdf", pages:11 }
  ]
}
