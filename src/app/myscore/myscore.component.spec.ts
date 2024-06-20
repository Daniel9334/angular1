import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyscoreComponent } from './myscore.component';

describe('MyscoreComponent', () => {
  let component: MyscoreComponent;
  let fixture: ComponentFixture<MyscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyscoreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
