import { useCallback, useEffect, useState } from 'react'
import { format_date, QueryParams} from '../../utils'
import PacienteModal from '../PacinenteModal'
import {Card, CardBody, FormGroup, Search, Sort, Table, TdAction} from './styles'
import { useSelector, useDispatch } from 'react-redux'
import {patientAction} from '../../store/action/patientAction' 
import {ReactComponent as IconSort} from '../../assets/img/sort.svg'
import {ReactComponent as IconEye} from '../../assets/img/eye.svg'
import ShareSystem  from '../ShareSystem'

const natList = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IR', 'NO', 'NL', 'NZ', 'TR', 'US']

const PatienteList = ()=>{

    const {patient:list} = useSelector(state=>state.patientsReducer)

    const dispatch = useDispatch()
    //const [list, setList] = useState([])
    const [info, setInfo] = useState(null)
    const [open, setOpen] = useState(false)
    const [data_item_modal, setDataItemModal] = useState(null)
    const [current_page, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [params_query, setParamsQuery] = useState({})
    const [nat, setNat] = useState(()=>{
        let query = QueryParams()
        return query.nat ? query.nat :'BR'
    })
    const [search_term, setSearchTerm] = useState({
        term:'',
        filter:'name'
    })
    const [is_sort, setIsSort] = useState(false)


    const Details=(item)=>{
        setDataItemModal(item)
        setOpen(true)
    }

    const getUser = async (page=1, query, nar_query)=>{
        let n= nar_query ||  nat    
        let params = {
            "results": "50",
            "nat": n,
            "seed":"abc"+n.toLocaleLowerCase(),
            "page":page
        }
        let args = new URLSearchParams(params)
        setLoading(true)
        setCurrentPage(parseInt(page))
        if(params_query.pg && page>1){
            setParamsQuery({
                ...params_query,
                pg:page
            })
            const url = new URL(window.location.href);
            url.searchParams.set('pg', page);
            window.history.replaceState(null, null, url);
        }
        try {
            let response = await fetch('https://randomuser.me/api/?'+args)
            if(response.status ==200){
                let res = await response.json()
                const {results, info} = res
                
                if(page==1){
                    dispatch(patientAction(results))
                } else {
                    let patients = [...list, ...results]
                    dispatch(patientAction(patients))
                }
                setInfo(info)
                if(query.id){
                    let user = results.find(u=>u.login.uuid ===query.id)
                    if(user)
                        Details(user)
                    else    
                        alert("Desculpe! usuário não encontrado")
                }
                
            }
            
        } catch (error) {
            
        }
        setLoading(false)
        
    }

    const onClose=()=>{
        setOpen(false)
        
        if(params_query && Object.keys(params_query).length>0){
            const url = new URL(window.location.href);
            url.searchParams.delete('id');
            window.history.replaceState(null, null, url);
        }
    }

    const OrderList=(order)=>{
        let list_order = [...list]
        
        list_order = list_order.sort((a, b)=>{
            if(order)
                return a.name.first.localeCompare(b.name.first); 
            else      
                return b.name.first.localeCompare(a.name.first);   
        })
        //dispatch({type:'ADD_PATIENT',patient:list_order})
        dispatch(patientAction(list_order))
        setIsSort(!is_sort)
    }


    const Filters=result=>{
        
        if(search_term.filter=='genre' && search_term.term.length>0){
            return result.gender==search_term.term
        } else {
            let res = new RegExp(search_term.term, 'i')
            return res.test(result.name.first) || res.test(result.name.last)
        }
    }

    const Highlight=useCallback((str)=>{
        if(search_term.term.length>0){
            let pattern = new RegExp(search_term.term, "i");
            return str.replace(pattern, '<b>'+str.match(pattern)+'</b>')
        }
        
        return str    
    }, [search_term])


    const backToIni=()=>{
        const url = window.location.href.replace(window.location.search, '')
        const q={...params_query}
        window.history.replaceState(null, null, url);
        setParamsQuery({})
        getUser(1, undefined, q.nat || 'BR')
        
    }

    useEffect(()=>{
        
        let params=QueryParams()
        /**
         * Se o usuario mudar a naciolidade e tiver nacionalida na queryString
         * remove os parametros da url e do params para recarregar a lista na pagina 1
         */
        if(Object.keys(params_query).length>0 && params_query.nat && params_query.nat !==nat){
            const url = new URL(window.location.href);
            url.searchParams.delete('nat');
            url.searchParams.delete('pg');
            window.history.replaceState(null, null, url);
            params={}
        }
        getUser(params.pg ? params.pg:1, params, params.nat ? params.nat:null)
        setParamsQuery(params)
    }, [nat])

    return (
        <div className="container">
            <PacienteModal 
                isOpen={open} 
                item={data_item_modal}
                current_page={current_page}
                onClose={()=>onClose()}
            />
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <Card className="card border-0 shadow mb-5">
                        <CardBody className="card-body">
                            {(params_query.pg && params_query.pg>1) &&
                                <div className="d-flex justify-content-between mb-2">
                                    <button type="button" onClick={()=>backToIni()} className="btn btn-primary btn-sm">Voltar à primeira página</button>  
                                    <span>
                                        Página {params_query.pg}
                                    </span>
                                </div>
                            }
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt repudiandae cum iusto id provident ea nostrum officiis similique maiores corrupti vitae, fugit repellendus adipisci. Saepe debitis ut praesentium veritatis.
                            </p>
                            <div className="row mb-3">
                                <FormGroup className="form-group  col-md-7">
                                    <Search type="search" className="form-control" placeholder="Pesquisar" onChange={(ev)=>setSearchTerm({filter:'name', term:ev.target.value})} />
                                </FormGroup>
                                <FormGroup className="form-group col-md-5 filter-nac">
                                    <span className="d-flex justify-content-between align-items-center">
                                        <label htmlFor="">Nacionalidade</label>
                                        <select value={nat} className="form-select" onChange={(ev)=>setNat(ev.target.value)}>
                                            {natList.map(nac=>(
                                                <option value={nac} key={nac}>{nac}</option>
                                            ))}
                                        </select>
                                    </span>
                                </FormGroup>
                            </div>
                            {!(loading && current_page==1) &&
                            <div className="table-responsive-md">
                                <Table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <th>
                                                <Sort onClick={()=>OrderList(!is_sort)}>
                                                    Nome <IconSort className="icon-sort"/> 
                                                </Sort>
                                            </th>
                                            <th className="genrer">
                                                <span className="wraper-cell">
                                                    <span>Gênero</span>    
                                                    <select onChange={(ev)=>setSearchTerm({filter:'genre', term:ev.target.value})}>
                                                        <option value=''>{search_term.term.length>0 && search_term.filter=='genre'? 'Todos' :'Filtrar por'}</option>
                                                        <option value="male">Masculino</option>
                                                        <option value="female">Feminino</option>
                                                    </select> 
                                                </span>
                                            </th>
                                            <th>Nascimento</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list && list.filter(Filters).map((item, index)=>(
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td dangerouslySetInnerHTML={{__html:Highlight(`${item.name.first} ${item.name.last}`)}}></td>
                                                <td>{item.gender}</td>
                                                <td>{format_date(item.dob.date)}</td>
                                                <TdAction>
                                                    <div className="btn-group btn-group-sm" role="group">
                                                        <button type="button" onClick={()=>Details(item)} className="btn btn-outline-primary">
                                                            <IconEye/>
                                                        </button>
                                                        <ShareSystem type="button" className="btn btn-outline-primary" item={{item, current_page, index}} />
                                                        
                                                    </div>
                                                </TdAction>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>    
                            </div>
                            
                            }
                            <div className="text-center">
                                <button disabled={loading} className="btn btn-sm btn-primary" onClick={()=>getUser(current_page+1)}>
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>  :'Carregar mais'} 
                                </button>                       
                            </div>          
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}
export default PatienteList