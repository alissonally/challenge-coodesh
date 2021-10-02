import styled from "styled-components";

export const Container = styled.header`
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    background:#e5e5e5;
    z-index: 999;
`

export const ContentTopBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`


const ElementsBar = styled.span`
    height: 60px;
    display: inline-flex;
    align-items: center;
    @media(max-width:768px){
        height:45px
    }
`

export const BrandCompany = styled(ElementsBar)`
    img{
        max-height: 90%;
    }
`
export const UserTopBar = styled(ElementsBar)`
    img{
        max-height: 80%;
    }
`