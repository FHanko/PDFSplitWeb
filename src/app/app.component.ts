import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PdfToolComponent } from './pdf-tool/pdf-tool.component';
import { ToolHelpComponent } from './tool-help/tool-help.component';

export enum Page { Home, Help }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PdfToolComponent, ToolHelpComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pdfsplit';
  Page = Page
  currentPage = Page.Home;
}
