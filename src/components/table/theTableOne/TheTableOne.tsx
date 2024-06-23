import * as React from 'react';
import { userAPI } from '../../../api/api';
import { jsonRowDataSet,jsonRowDataAdd } from '../../../utils/rowJson';
import { setData,SetIsLoading } from '../../../store/slices/reducer';
import { v4 as uuidv4 } from 'uuid';
import { useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';
import {  columns } from '../../../constants/columns';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/DeleteOutlined';
import Save from '@mui/icons-material/Save';
import Cancel from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from '@mui/x-data-grid';
import axios from 'axios';

import { useAppDispatch } from '../../../hooks/hooks';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
  setCurrentID:(id:GridRowId)=>GridRowId
}

function EditToolbar(props: EditToolbarProps) {
  const {  setRowModesModel,setRows } = props;
const dispatch = useAppDispatch()
  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [...oldRows,
       { 
        id,
        documentStatus: "",
        employeeNumber: "",
        documentType: "",
        documentName: "",
        companySignatureName: "",
        employeeSignatureName: "",
        employeeSigDate: "",
        companySigDate: "", 
        isNew: true
      }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'id' },
    }));
    dispatch(SetIsLoading(true));
    axios.post(`${process.env.REACT_APP_HOST}/ru/data/v3/testmethods/docs/userdocs/create`,
      jsonRowDataAdd(), 
       {
         headers: {
           "x-auth": `${sessionStorage.getItem("token")}`,
         },
       }
     )
     .then(res=>{
      userAPI.loadData()
      .then((res) => {
        dispatch(setData(res));        
        dispatch(SetIsLoading(false));
        
      });
     })
  };
  let navigate= useNavigate();
  const logOut = ()=>{
    sessionStorage.removeItem('token')
    navigate('/')
}
  return (
    <GridToolbarContainer>
     
      <Button color="primary" startIcon={<Add/>} onClick={handleClick}>
        Add record
      </Button>
      <Button color="primary"  onClick={logOut}>
        Quite
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { data} = useAppSelector(state => state.red)
  const [rows, setRows] = React.useState<GridRowsProp>(data);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [currentID, setCurrentID] = React.useState<GridRowId>('')
  React.useEffect(()=>{
    let row = rows?.filter(row=>row.id===currentID)
    if(row.length!==0){
    axios.post(`${process.env.REACT_APP_HOST}/ru/data/v3/testmethods/docs/userdocs/set/${currentID}`,
      jsonRowDataSet(row[0]), 
        {
          headers: {
            "x-auth": `${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then(res=>console.log(res))
    }
  },[rows])
  console.log(rows,1)
  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId, rows:GridRowsProp) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
    setCurrentID(id)
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
    userAPI.deleteData(id)
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columnss: GridColDef[] = [
    ...columns,    
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id, rows)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columnss}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots['toolbar'],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}