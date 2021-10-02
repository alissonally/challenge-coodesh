import styled,{keyframes} from 'styled-components'

const scale = keyframes`
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
`;

export const MainModal = styled.div`
    &.show{
        .modal-dialog{
            animation: ${scale} .2s;
            transition: .2s;
            transform:scale(1);
        }
    }
`
export const  WarpperContent= styled.div`
    position: relative;
    .wrapper-btn-shared-modal{
        margin-top: 15px;
        text-align:right;
        button{
            display: inline-flex;
            padding-top: 8px ;
            padding-bottom: 8px ;
            svg{
                height: 16px;
                fill: #fff;
            }
        }
    }
`
export const  ModalContent= styled.div`
    position: relative;
    padding:   0 15px 15px;

    @media(max-width:768px){
        margin-top: calc(72px / 2 );
    }
`
export const  Header= styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`
export const  Avatar= styled.span`
    width: 72px;
    height: 72px;
    border-radius:50%;
    display: inline-flex;
    overflow: hidden;
    margin-top:calc(72px / 2 * -1);
    border:1px solid #fff;
    background: #efefef;
`

export const CloseButton = styled.button`
    position: absolute;
    top:5px;
    right: 15px;
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    z-index:10;
    span{
        font-size: 1.5rem;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        opacity: .5;
    }
`