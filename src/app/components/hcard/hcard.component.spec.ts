import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcardComponent } from './hcard.component';

describe('HcardComponent', () => {
  let component: HcardComponent;
  let fixture: ComponentFixture<HcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
