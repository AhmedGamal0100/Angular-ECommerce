import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleProductComponent } from './single-product.component';

describe('SingleProductComponent', () => {
  let component: SingleProductComponent;
  let fixture: ComponentFixture<SingleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
