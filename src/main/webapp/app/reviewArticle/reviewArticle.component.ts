import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../entities/ICAMApi/article/article.service';
import { RevisionService } from '../entities/ICAMApi/revision/revision.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryTreeService } from 'app/entities/ICAMApi/category-tree/category-tree.service';
import { Revision, IRevision } from 'app/shared/model/ICAMApi/revision.model';
import { Article } from 'app/shared/model/ICAMApi/article.model';
import { ArticleTypeService } from 'app/entities/ICAMApi/article-type/article-type.service';
import { IArticleType } from 'app/shared/model/ICAMApi/article-type.model';
import * as moment from 'moment';
import { ReviewState } from 'app/shared/model/enumerations/review-state.model';

const enum IS_PEER_REVIEWED {
  YES = 'yes',
  NO = 'no'
}

@Component({
  selector: 'reviewArticle',
  templateUrl: 'reviewArticle.component.html',
  styleUrls: ['./reviewArticle.scss']
})
export class ReviewArticleComponent implements OnInit {
  //Dropdown Categorias
  categoryDropdown: Array<any> = [];
  categorySelected: Array<any> = [];
  categoryDropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'itemName',
    enableCheckAll: false,
    allowSearchFilter: true
  };

  //Dropdown Tipo de Artigo
  aTypeDropdown: Array<any> = [];
  aTypeSelected: Array<any> = [];
  aTypeDropdownSettings: IDropdownSettings = {
    singleSelection: true,
    idField: 'id',
    textField: 'itemName',
    enableCheckAll: false
  };

  //Checkbox PeerReviewed
  peerReviewed = false;
  noPeerReviewed = true; // default

  //Checkbox RevisionState
  onHoldState = false;
  onGoingState = false;
  pendingState = false;
  reviewedState = false;
  acceptedState = false;

  state: string | null = null;

  article: Article = new Article();
  revision: Revision = new Revision();

  revisionExists: boolean | undefined;

  fieldsRequiredMsg = '';

  readonly MAX_STR_LENGTH = 255;
  readonly MAX_BLOB_LENGTH = 3000;

  constructor(
    private aTypesService: ArticleTypeService,
    private revisionService: RevisionService,
    private articleService: ArticleService,
    private categoryService: CategoryTreeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //get do ID do artigo passado da página articleList
    let articleId = null;
    this.route.queryParams.subscribe(params => {
      if (params['articleId']) {
        articleId = params['articleId'];
      }
    });

    //carregar dados base do artigo
    if (articleId) {
      this.articleService.getById(articleId).subscribe(res => {
        if (res) {
          Object.assign(this.article, res[0]);
        }
      });
    }

    if (articleId) {
      this.revisionService.getArticleRevision(articleId).subscribe(res => {
        if (Array.isArray(res) && res.length === 0) {
          //Não existe revisão
          this.revisionExists = false;
          this.onGoingState = true; //default

          //Temos de carregar as categorias todas e os tipos de artigos para o dropdown
          this.loadDropdownsData();
        } else if (res) {
          //Já existe revisão
          this.revisionExists = true;

          Object.assign(this.revision, res[0]);

          //Carregar dados para dropdowns e checkboxs
          this.loadDropdownsData();
          this.loadIsPeerReviewed(this.revision.isPeerReviewed);
          this.loadRevisionState(this.revision.reviewState);

          if (this.revision.ctrees) {
            // same ng-multiselect-dropdown mentioned below on this.loadDropdownsData()
            const cats = [];
            for (const cat of this.revision.ctrees) {
              if (cat.parent) {
                const catParent = cat.parent;
                cats.push({ id: catParent.id, itemName: `${catParent.itemName} > ${cat.itemName}` });
              } else {
                cats.push({ id: cat.id, itemName: cat.itemName });
              }
            }
            this.categorySelected = [...cats];
          }

          if (this.revision.atype) {
            const atype = this.revision.atype;
            // Para já cada artigo só tem um article type!
            this.aTypeSelected = [{ id: atype.id, itemName: atype.itemName }];
          }
        }
      });
    }
  }

  loadDropdownsData(): void {
    this.categoryService.getCategories().subscribe(categories => {
      // ng-multiselect-dropdown doesn't work if list items are added iteratively with .push()
      // so we make a temp array, fill it up, and then set categoryDropdown all at once in the end.
      const cats = [];
      for (const cat of categories) {
        if (cat.children && cat.children.length > 0) {
          const catChildren = cat.children;
          for (const subCat of catChildren) {
            cats.push({ id: subCat.id, itemName: `${cat.itemName} > ${subCat.itemName}` });
          }
        } else {
          cats.push({ id: cat.id, itemName: cat.itemName });
        }
      }
      this.categoryDropdown = [...cats];
    });
    this.aTypesService.getArticleTypes().subscribe(aTypes => {
      this.aTypeDropdown = aTypes;
    });
  }

  peerCheckboxChanged($event: any, checkbox: string): void {
    if (checkbox === IS_PEER_REVIEWED.YES) {
      this.noPeerReviewed = !$event;
      this.peerReviewed = $event;
      this.revision.isPeerReviewed = true;
    }
    if (checkbox === IS_PEER_REVIEWED.NO) {
      this.peerReviewed = !$event;
      this.noPeerReviewed = $event;
      this.revision.isPeerReviewed = false;
    }
  }

  stateCheckboxChanged($event: any, checkbox: string): void {
    if ($event) {
      if (checkbox === ReviewState.Hold) {
        this.state = checkbox;
        this.onHoldState = $event;
        this.onGoingState = !$event;
        this.pendingState = !$event;
        this.reviewedState = !$event;
        this.acceptedState = !$event;
      }
      if (checkbox === ReviewState.OnGoing) {
        this.state = checkbox;
        this.onGoingState = $event;
        this.onHoldState = !$event;
        this.pendingState = !$event;
        this.reviewedState = !$event;
        this.acceptedState = !$event;
      }
      if (checkbox === ReviewState.Pending) {
        this.state = checkbox;
        this.pendingState = $event;
        this.onGoingState = !$event;
        this.onHoldState = !$event;
        this.reviewedState = !$event;
        this.acceptedState = !$event;
      }
      if (checkbox === ReviewState.Reviewed) {
        this.state = checkbox;
        this.reviewedState = $event;
        this.onGoingState = !$event;
        this.pendingState = !$event;
        this.onHoldState = !$event;
        this.acceptedState = !$event;
      }

      if (checkbox === ReviewState.Accepted) {
        this.state = checkbox;
        this.acceptedState = $event;
        this.onGoingState = !$event;
        this.pendingState = !$event;
        this.reviewedState = !$event;
        this.onHoldState = !$event;
      }
    }
  }

  loadIsPeerReviewed(isPeerReviewed: boolean | undefined): void {
    if (isPeerReviewed) {
      this.peerCheckboxChanged(true, IS_PEER_REVIEWED.YES);
    } else if (isPeerReviewed === false) {
      this.peerCheckboxChanged(true, IS_PEER_REVIEWED.NO);
    }
  }

  loadRevisionState(state: ReviewState | undefined): void {
    if (state) {
      switch (state) {
        case ReviewState.Hold:
          this.stateCheckboxChanged(true, ReviewState.Hold);
          break;
        case ReviewState.OnGoing:
          this.stateCheckboxChanged(true, ReviewState.OnGoing);
          break;
        case ReviewState.Pending:
          this.stateCheckboxChanged(true, ReviewState.Pending);
          break;
        case ReviewState.Reviewed:
          this.stateCheckboxChanged(true, ReviewState.Reviewed);
          break;
        case ReviewState.Accepted:
          this.stateCheckboxChanged(true, ReviewState.Accepted);
          break;

        default:
          break;
      }
    }
  }

  checkRequiredFields(): boolean {
    let fieldsOk = true;
    if (!this.categoryDropdown || this.categoryDropdown.length === 0) {
      this.fieldsRequiredMsg += 'Necessário escolher pelo menos uma categoria<br>';
      fieldsOk = false;
    }
    if (!this.aTypeDropdown || this.aTypeDropdown.length === 0) {
      this.fieldsRequiredMsg += 'Necessário escolher um tipo de artigo<br>';
      fieldsOk = false;
    }
    if (this.revision.author === null || this.revision.author === undefined || this.revision.author.trim().length === 0) {
      this.fieldsRequiredMsg += 'Campo Autor é obrigatório<br>';
      fieldsOk = false;
    }
    if (this.revision.reviewer === null || this.revision.reviewer === undefined || this.revision.reviewer.trim().length === 0) {
      this.fieldsRequiredMsg += 'Campo Revisor é obrigatório<br>';
      fieldsOk = false;
    }
    if (this.revision.title === null || this.revision.title === undefined || this.revision.title.trim().length === 0) {
      this.fieldsRequiredMsg += 'Campo Tópicos do artigo é obrigatório<br>';
      fieldsOk = false;
    }
    if (this.revision.summary === null || this.revision.summary === undefined || this.revision.summary.trim().length === 0) {
      this.fieldsRequiredMsg += 'Campo Sinopse é obrigatório<br>';
      fieldsOk = false;
    }
    return fieldsOk;
  }

  cancel(): void {
    this.router.navigate(['/backoffice/articleList']);
  }

  save(): void {
    if (this.checkRequiredFields()) {
      const now = moment.utc();
      let revisionToSave: IRevision = {};
      const caterogiesId = [];
      for (const cat of this.categorySelected) {
        caterogiesId.push(cat.id);
      }

      if (this.revisionExists === false) {
        //nao existia revisao = POST

        revisionToSave = {
          ...this.revision,
          reviewDate: now,
          article: { id: this.article.id },
          atype: { id: this.aTypeSelected[0]['id'] },
          ctrees: caterogiesId
        };
        console.log('false', revisionToSave);
        this.revisionService.create(revisionToSave).subscribe(
          () => {
            //Criado com sucesso
            this.router.navigate(['/backoffice/articleList']);
          },
          () => {
            //error
          }
        );
      } else if (this.revisionExists === true) {
        //ja existia revisao = PUT
        Object.assign(revisionToSave, this.revision);
        revisionToSave.atype = { id: this.aTypeSelected[0]['id'] };
        revisionToSave.ctrees = caterogiesId;
        console.log(revisionToSave);

        this.revisionService.update(revisionToSave).subscribe(
          () => {
            //update com sucesso
            this.router.navigate(['/backoffice/articleList']);
          },
          () => {
            //erro
          }
        );
      }
    } else {
      alert(this.fieldsRequiredMsg);
    }
  }
}
