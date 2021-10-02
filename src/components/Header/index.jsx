import { BrandCompany, Container, ContentTopBar, UserTopBar } from "./styles"
import Logo from '../../assets/img/logo.png'
import User from '../../assets/img/user.png'
   
const Header = ()=>{
    return (
        <Container>
            <div className="container-fluid">
                <ContentTopBar>
                    <BrandCompany>
                        <img src={Logo} alt="Logo"/>
                    </BrandCompany>
                    <UserTopBar>
                        <img src={User} alt="User"/>
                    </UserTopBar>
                </ContentTopBar>

            </div>
        </Container>
    )
}
export default Header