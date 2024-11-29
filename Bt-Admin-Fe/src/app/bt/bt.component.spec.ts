import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtComponent } from './bt.component';

describe('BtComponent', () => {
  let component: BtComponent;
  let fixture: ComponentFixture<BtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
