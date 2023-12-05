import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ACTION_BUTTON, IMovie } from './model/movie';
import { MovieService } from 'src/services/movie.service';
import { Toolbar } from 'devextreme/ui/data_grid';
import { DxDataGridComponent } from 'devextreme-angular';
import query from 'devextreme/data/query';
import 'devextreme/data/odata/store';
import * as _ from 'lodash';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MovieService],
})
export class AppComponent implements OnInit, AfterViewInit {
  movieList!: Array<IMovie>;
  filteredMovie!: Array<IMovie>;
  readonly allowedPageSizes = [5, 10, 'all'];
  moreInfoButtonOptions: any;
  actionButtons = ACTION_BUTTON;
  dataSource: any;

  constructor(private _movieService: MovieService) {
    this.dataSource = [
      {
        text: 'Share',
        icon: 'dx-icon-globe',
        items: [{ text: 'Facebook' }, { text: 'Twitter' }],
      },
      { text: 'Download', icon: 'dx-icon-download' },
      { text: 'Add Comment', icon: 'dx-icon-add' },
      { text: 'Add to Favorite', icon: 'dx-icon-favorites' },
    ];
    this.closeButtonOptions = {
      text: 'Close',
      onClick() {
        this.popupVisible = false;
      },
    };

    this.moreInfoButtonOptions = {
      text: 'More info',
      onClick(e: any) {
        const message = `More info about`;
      },
    };
  }
  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this._movieService.getMovies('/popular').subscribe((movie) => {
      this.movieList = movie.results;
      this.filteredMovie = [...this.movieList];
    });
  }

  customizeText(e: any) {
    return 'Total Record: ' + e.value;
  }

  onCellPrepared(e: any) {
    if (
      e.column.dataField === 'original_language' &&
      e.rowType === 'data'
      // e.data.original_language === 'en'
    ) {
      e.cellElement.style.background =
        e.data.original_language === 'en' ? 'green' : 'red';
    }
  }

  onToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items;
    toolbarItems.forEach(function (item: any) {
      if (item.name === 'searchPanel') {
        item.location = 'before';
      }
    });
  }

  contextMenuItems = [
    { text: 'Zoom In', icon: 'plus' },
    { text: 'Share', icon: 'message' },
    { text: 'Download', icon: 'download' },
  ];
  isContextMenuVisible = false;

  //
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

  taskCount = 0;

  peopleCount = 0;

  avgDuration = 0;

  ngAfterViewInit() {
    this.calculateStatistics();
  }

  calculateStatistics() {
    this.dataGrid.instance.getSelectedRowsData().then((rowData) => {
      let commonDuration = 0;

      for (let i = 0; i < rowData.length; i++) {
        commonDuration += rowData[i].Task_Due_Date - rowData[i].Task_Start_Date;
      }
      commonDuration /= this.MILLISECONDS_IN_DAY;

      this.taskCount = rowData.length;
      this.peopleCount = query(rowData)
        .groupBy('ResponsibleEmployee.Employee_Full_Name')
        .toArray().length;

      this.avgDuration = Math.round(commonDuration / rowData.length) || 0;
    });
  }
  closeButtonOptions: any;
  popupVisible = false;
  showInfo() {
    this.popupVisible = true;
  }

  sItemsList = [
    {
      title: 'Title 1',
      content: 'this is the first conents',
    },
    {
      title: 'Title 2',
      content: 'this is the second conents',
    },
    {
      title: 'Title 3',
      content: 'this is the third conents',
    },
  ];
  stepIndex: number = 0;
  disablePre = true;
  disableNext = false;

  nextStep(n: number) {
    this.stepIndex = this.stepIndex + n;
    console.log(this.stepIndex);
    this.disablePre = false;

    if (this.stepIndex === 0) {
      this.disablePre = true;
      this.disableNext = false;
    } else if (this.stepIndex >= this.sItemsList.length - 1) {
      this.stepIndex = this.sItemsList.length - 1;
      this.disableNext = true;
    } else {
      this.disableNext = false;
    }
  }
}
