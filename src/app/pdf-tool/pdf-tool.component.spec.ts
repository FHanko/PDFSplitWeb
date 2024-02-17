import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfToolComponent } from './pdf-tool.component';

describe('PdfToolComponent', () => {
  let component: PdfToolComponent;
  let fixture: ComponentFixture<PdfToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
