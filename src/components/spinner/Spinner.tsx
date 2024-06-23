import img from '../../images/spinner/loader.gif'
export const Spinner = () =>{
    return(
        <div className='spinner_container'>
            <span>LOADING...</span>
            <img className="spinner" src={img} alt='spinner'/>
        </div>
    )
}