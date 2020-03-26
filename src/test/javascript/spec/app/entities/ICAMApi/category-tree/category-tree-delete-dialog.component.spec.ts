import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IcamBackOfficeTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { CategoryTreeDeleteDialogComponent } from 'app/entities/ICAMApi/category-tree/category-tree-delete-dialog.component';
import { CategoryTreeService } from 'app/entities/ICAMApi/category-tree/category-tree.service';

describe('Component Tests', () => {
  describe('CategoryTree Management Delete Component', () => {
    let comp: CategoryTreeDeleteDialogComponent;
    let fixture: ComponentFixture<CategoryTreeDeleteDialogComponent>;
    let service: CategoryTreeService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [IcamBackOfficeTestModule],
        declarations: [CategoryTreeDeleteDialogComponent]
      })
        .overrideTemplate(CategoryTreeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CategoryTreeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CategoryTreeService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
