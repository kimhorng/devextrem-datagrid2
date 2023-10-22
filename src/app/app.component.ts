import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IMovie } from './model/movie';
import { MovieService } from 'src/services/movie.service';
import { Toolbar } from 'devextreme/ui/data_grid';
import { DxDataGridComponent } from 'devextreme-angular';
import query from 'devextreme/data/query';
import 'devextreme/data/odata/store';
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
  constructor(private _movieService: MovieService) {}
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
    console.log(e.column.dataField);
  }

  onToolbarPreparing(e: any) {
    let toolbarItems = e.toolbarOptions.items;
    toolbarItems.forEach(function (item: any) {
      if (item.name === 'searchPanel') {
        item.location = 'before';
      }
    });
  }
  //
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent;

  MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

  dataSource: any = {
    store: {
      type: 'odata',
      url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
      key: 'Task_ID',
    },
    expand: 'ResponsibleEmployee',
    select: [
      'Task_ID',
      'Task_Subject',
      'Task_Start_Date',
      'Task_Due_Date',
      'Task_Status',
      'ResponsibleEmployee/Employee_Full_Name',
    ],
  };

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
}
