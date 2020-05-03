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
    enableCheckAll: false
  };

  //Dropdown Tipo de Artigo
  aTypeDropdown: Array<IArticleType> = [];
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
            for (const cat of this.revision.ctrees) {
              if (cat.parent) {
                const catParent = cat.parent;
                this.categorySelected.push({ id: catParent.id, itemName: catParent.itemName });
              }
            }
          }

          if (this.revision.atype) {
            const atype = this.revision.atype;

            this.aTypeSelected.push({ id: atype.id, itemName: atype.itemName });
          }
          console.log(this.aTypeSelected);
        }
      });
    }
  }

  loadDropdownsData(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categoryDropdown = categories;
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

  cancel(): void {
    this.router.navigate(['/backoffice/articleList']);
  }

  save(): void {
    let revisionToSave: IRevision = {};
    const caterogiesId = [];
    for (const cat of this.categorySelected) {
      caterogiesId.push(cat.id);
    }

    if (this.revisionExists === false) {
      //nao existia revisao = POST

      revisionToSave = {
        ...this.revision,
        reviewDate: moment.utc(),
        article: { id: this.article.id },
        atype: { id: this.aTypeSelected[0]['id'] },
        ctrees: caterogiesId
      };

      this.articleService.create(revisionToSave).subscribe(
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
      revisionToSave = {
        ...this.revision,
        id: this.revision.id,
        atype: { id: this.aTypeSelected[0]['id'] },
        ctrees: caterogiesId
      };
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
  }
}
