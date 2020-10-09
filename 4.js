function ajax(options) {
    options = options||{};
    options.type = options.type || 'json';
    params = formatParams(options.data);

    let xhr;

    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function() {
        if(xhr.readyState===4){
            let status = xhr.state;
            if(status>=200&&status<300){
                options.success&&options.success(xhr.responseText,xhr.responseXML);

            }else{
                options.err&&options.err(status)
            }
        }
    }

    if(options.type==='GET'){
        xhr.open('GET',options.url+'?'+params,true);
        xhr.send(null);
    }else if(options.type === 'POST'){
        xhr.open('POST',options.url,true);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    }


}



function formatParams(data){
    let arr = [];
    for(let name in data){
        arr.push(encodeURIComponent(name)+'='+encodeURIComponent(data[name]));
    }
    arr.push(('v='+Math.random()).replace('.',''))
    return arr.join('&');
}