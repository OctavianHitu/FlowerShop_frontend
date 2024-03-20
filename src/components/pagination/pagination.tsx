import "./pagination.scss";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
interface Pagination {
    totalPages: number;
    handleClick: any;
    handleDown: any;
    handleUp: any
}

const Pagination: React.FC<Pagination> = (props): JSX.Element => {

    const pages = Array.from(Array(props.totalPages).keys()).map(x => x + 1);
    return (
        <div className="pagination">
            <button className="btn-pag left-right" onClick={props.handleDown}><ChevronLeftIcon /></button>
            <div>
                {pages.map((num) => {
                    return <button
                        className="btn-pag"
                        key={num}
                        onClick={() => { props.handleClick(num) }}
                    >{num}</button>
                })}
            </div>
            <button className="btn-pag left-right" onClick={props.handleUp}><ChevronRightIcon />   </button>
        </div>
    )
}

export default Pagination;