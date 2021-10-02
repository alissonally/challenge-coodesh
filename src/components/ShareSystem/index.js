import React from 'react'
import {ReactComponent as IconShare} from '../../assets/img/share.svg'
import { ShareButton } from './styles';
    
const ShareSystem = ({item:data_user, className})=>{
    
    const openShareSistem=()=>{
        let location = window.location

        let id = data_user.item.login.uuid



        let link_share = `${location.origin}?id=${id}&pg=${data_user.current_page}&nat=${data_user.item.nat}`
        
        if (window.navigator.share) {
            window.navigator.share({
                title: `${data_user.item.name.first} ${data_user.item.name.last}`,
                url: link_share
            }).then(() => {
                console.log('Obrigado por compartilhar');
            })
            .catch(console.error)
        }
        
    }

    return (
        <ShareButton className={className} onClick={()=>openShareSistem()}>
            <IconShare/>
        </ShareButton>
    )
}
export default ShareSystem