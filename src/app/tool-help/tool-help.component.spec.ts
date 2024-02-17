import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolHelpComponent } from './tool-help.component';

describe('ToolHelpComponent', () => {
  let component: ToolHelpComponent;
  let fixture: ComponentFixture<ToolHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToolHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
