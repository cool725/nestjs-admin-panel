import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostageProductOverviewComponent } from './postage-product.overview.component';

describe('ItemServiceComponent', () => {
  let component: PostageProductOverviewComponent;
  let fixture: ComponentFixture<PostageProductOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostageProductOverviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostageProductOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
