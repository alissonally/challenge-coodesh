import styled from 'styled-components'

export const Table = styled.table`
    thead{
        tr{
            th{
                &.genrer{
                    width: 180px;
                    .wraper-cell{
                        display: flex;
                        flex: 1;
                        justify-content: space-between;
                        select{
                            display: block;
                            //padding: .200rem 0 .200rem 0;
                            outline: none;
                            font-size: 1rem;
                            font-weight: 400;
                            line-height: 1.5;
                            color: #212529;
                            border: 1px solid #ced4da;
                            border-radius: .25rem;
                        }
                    }
                }
            }
        }
    }
`
export const Card = styled.div`

`
export const CardBody = styled.div`

`
export const Search = styled.input`

`
export const FormGroup = styled.div`
    &.filter-nac{
        label{
            margin-right: 10px;
        }
    }
    @media(max-width:768px){
        &.filter-nac{
            margin-top: 10px;
        }
    }
`
export const TdAction = styled.td`
    width: 150px;
    text-align: center;
    
    button{    
        display: inline-flex;
        svg{
            height: 16px;
            vertical-align: top;
            fill: #333;
        }
        &:hover{
            svg{
                fill: #fff;
            }
        }
    }
    
`
export const Sort = styled.span`
    cursor: pointer;
`

