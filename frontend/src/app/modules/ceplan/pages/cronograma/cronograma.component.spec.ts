import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaComponent } from './cronograma.component';

describe('CronogrAMAComponent', () => {
  let component: CronogramaComponent;
  let fixture: ComponentFixture<CronogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronogramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CronogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
