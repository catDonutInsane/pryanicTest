import { useEffect} from "react"
import { useAppSelector,useAppDispatch } from "../../hooks/hooks"
import { setData } from "../../store/slices/reducer";
import { SetIsLoading } from "../../store/slices/reducer";
import { Spinner } from "../spinner/Spinner";
import FullFeaturedCrudGrid from "./theTableOne/TheTableOne";
import { userAPI } from "../../api/api";

export const Table = () =>{

    const dispatch = useAppDispatch()
    const { data} = useAppSelector(state => state.red)

    useEffect(()=>{        
        if(data?.length===0  || data===null){
            dispatch(SetIsLoading(true))
        userAPI.loadData()
        .then(res=>{
            console.log(res)
            dispatch(setData(res))
            dispatch(SetIsLoading(false))
        })
    }
   
    },[])

   
    return data?.length===0  || data===null
                ?<Spinner/>
                :<FullFeaturedCrudGrid/>
}