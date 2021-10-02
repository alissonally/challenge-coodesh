export const format_date=(date)=>{
    if (typeof date == 'undefined' || date == null) {
        return '';
    }

    let date_to_str = date.substr(0,10).replace(/^[-]/, '/')
    let _date = new Date(date_to_str);
        
    if (isNaN(_date.valueOf())) return '';

    return _date.toLocaleDateString()
}

export const QueryParams=()=>{
    return Object.fromEntries(new URLSearchParams(window.location.search))
}