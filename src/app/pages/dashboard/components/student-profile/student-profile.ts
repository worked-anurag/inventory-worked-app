import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { StudentProfileService } from '../../../../service/student-profile.service';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams
} from 'ag-grid-community';
// import * as moment from 'moment';
import { FormsModule } from '@angular/forms';

import { AgGridAngular } from 'ag-grid-angular';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-student-profile',
   standalone: true,
  imports: [CommonModule , AgGridAngular, MatIcon,FormsModule] ,
  templateUrl: './student-profile.html',
  styleUrls: ['./student-profile.scss'],
})
export class StudentProfile {
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

gridApi!: GridApi;
  totalRowCount = 0;

  constructor(private studentService: StudentProfileService) {}

  onGridReady(params: GridReadyEvent) {
      console.log('Grid Ready Fired'); 
    this.gridApi = params.api;

    const datasource: IServerSideDatasource = {
      getRows: (params) => {

        const requestPayload = {
          startRow: params.request.startRow,
          endRow: params.request.endRow,
          rowGroupCols: params.request.rowGroupCols,
          valueCols: params.request.valueCols,
          pivotCols: params.request.pivotCols,
          pivotMode: params.request.pivotMode,
          groupKeys: params.request.groupKeys,
          filterModel: params.request.filterModel,
          sortModel: params.request.sortModel
        };

        this.studentService.getStudentProfiles(requestPayload)
          .subscribe({
            next: (res) => {

              const rows = res?.data?.content || res?.data || [];
              const total = res?.data?.totalElements || rows.length;

              this.totalRowCount = total;

              params.success({
                rowData: rows,
                rowCount: total
              });
            },
            error: () => {
              params.fail();
            }
          });
      }
    };

   this.gridApi.setGridOption('serverSideDatasource', datasource);
  }

  gridOptions: GridOptions = {
  rowModelType: 'serverSide',
  pagination: true,
  paginationPageSize: 10,
};
 defaultColDef = {
    sortable: true,
    resizable: true,
    enableRowGroup: false,
    enablePivot: false,
    suppressSizeToFit: false, // Must be false for autoSize to work
  };

    columnDefs: ColDef[] = [
    {
      field: 'firstname',
      headerName: 'First Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'lastname',
      headerName: 'Last Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'contactNo',
      headerName: 'Contact No',
      filter: 'agTextColumnFilter',
      // cellRenderer: EmailCellComponent,
    },
    {
      field: 'dob',
      headerName: 'Date Of Birth',
     valueFormatter: (params) =>
  params.value
    ? new Date(params.value).toLocaleDateString('en-US')
    : '',
    },
    {
      field: 'registeredOn',
      headerName: 'Registered On',
     valueFormatter: (params) =>
  params.value
    ? new Date(params.value).toLocaleDateString('en-US')
    : '',
    },
    {
      field: 'emailId',
      headerName: 'Email',
      filter: 'agTextColumnFilter',
      // cellRenderer: EmailCellComponent,
    },
    {
      field: 'grade',
      headerName: 'Grade',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'citySpanId',
      headerName: 'City Span ID',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'numberOfEnrolledProgram',
      headerName: 'Programs Enrolled',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'ssid',
      headerName: 'SSID',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'schoolName',
      headerName: 'School Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'familyMemberFirstName',
      headerName: 'Parent First Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'familyMemberLastName',
      headerName: 'Parent Last Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'familyMemberEmail',
      headerName: 'Parent Email',
      filter: 'agTextColumnFilter',
      // cellRenderer: EmailCellComponent,
    },
    {
      field: 'familyMemberPhoneNumber',
      headerName: 'Parent Contact No',
      filter: 'agTextColumnFilter',
      // cellRenderer: EmailCellComponent,
    },
    {
      field: 'availableLoginAttempt',
      headerName: 'Login Attempts',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'isBackupPresent',
      headerName: 'Proxy Password',
      valueFormatter: (params) => {
        return params.value ? 'Yes' : 'No';
      },
    },
    
  {
  field: 'lastLogin',
  headerName: 'Last Login',
  valueFormatter: (params) => {
    if (!params.value) return '';

    const date = new Date(params.value);

    const formattedDate = date.toLocaleDateString('en-US');
    const formattedTime = date.toLocaleTimeString('en-US', {
      hour12: false
    });

    return `${formattedDate} | ${formattedTime}`;
  },
  pinned: 'right',
}
    // {
    //   headerName: 'Action',
    //   field: 'action',
    //   cellRenderer: StudentActionCellComponent,
    //   pinned: 'right',
    //   sortable: false,
    // },
  ];

   searchQuery: string = '';
   searchDebounceTimer: any;
   clearSearch() {
    this.searchQuery = '';
    // this.searchDebounceTimer = null; // Clear the timer when search is cleared
    if (this.gridApi) {
      this.gridApi.refreshServerSide({ purge: true });
    }
  }

    filterData(): void {
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(() => {
      if (this.gridApi) {
        this.gridApi.refreshServerSide({ purge: true });
      }
    }, 400); // Wait 400ms after user stops typing
  }
}
