import { GridColDef } from '@mui/x-data-grid/models/colDef/gridColDef';
export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID',editable: true, width: 70 },
    {
        field: 'companySigDate',
        headerName: 'companySigDate',
        sortable: false,
        width: 180,
        type: "date",
        editable: true,
        valueGetter:(data:Date)=>new Date(data),
        valueParser: (data:Date)=>new Date(data)
      },
      {
        field: 'companySignatureName',
        headerName: 'companySignatureName',
        sortable: false,
        width: 160,
        editable: true,
      },
      {
        field: 'documentName',
        headerName: 'documentName',
        sortable: false,
        width: 160,
        editable: true,
      },
  { field: 'documentStatus', headerName: 'documentStatus',editable: true, width: 130 },
  {
    field: 'documentType',
    headerName: 'documentType',
    type: 'string',
    width: 90,
    editable: true,
  },
 
  { field: 'employeeNumber', headerName: 'employeeNumber',type: 'number',editable: true, width: 130 },
  {
    field: 'employeeSigDate',
    headerName: 'employeeSigDate',
    sortable: false,
    type: "date",
    width: 160,
    editable: true,
    valueGetter:(data:Date)=>new Date(data),
    valueParser: (data:Date)=>new Date(data)
  },

  {
    field: 'employeeSignatureName',
    headerName: 'employeeSignatureName',
    sortable: false,
    width: 160,
    editable: true,
  },

  
 
];
