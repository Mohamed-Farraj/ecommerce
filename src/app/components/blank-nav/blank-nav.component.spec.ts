import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankNavComponent } from './blank-nav.component';

describe('BlankNavComponent', () => {
  let component: BlankNavComponent;
  let fixture: ComponentFixture<BlankNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlankNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
