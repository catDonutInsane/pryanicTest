import { GridValidRowModel } from "@mui/x-data-grid"
export const jsonRowDataSet = (data: GridValidRowModel)=>{
    return {
        "companySigDate": `${new Date(data?.companySigDate).toISOString()}\t`, 
       "companySignatureName": `${data?.companySignatureName}`, 
       "documentName": `${data?.documentName}`, 
       "documentStatus": `${data?.documentStatus}`, 
       "documentType": `${data?.documentType}`, 
       "employeeNumber": `${data?.employeeNumber}`, 
       "employeeSigDate": `${new Date(data?.employeeSigDate).toISOString()}\t`, 
       "employeeSignatureName": `${data?.employeeSignatureName}`,
       "id" :`${data?.id}`,
       }
}
export const jsonRowDataAdd = ()=>{
    return {
        "companySigDate": `${new Date().toISOString()}\t`, 
       "companySignatureName": `test`, 
       "documentName": `test`, 
       "documentStatus": `test`, 
       "documentType": `test`, 
       "employeeNumber": `0`, 
       "employeeSigDate": `${new Date().toISOString()}\t`, 
       "employeeSignatureName": `test`,
       }
}