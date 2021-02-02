const getAvatar = (userID, name, id) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("../user/"+userID, requestOptions)
        .then(response => response.text())
        .then(result =>  {
            let data = JSON.parse(result);
            console.log(data)
            checkAvatar(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.gif`, function(){ loadOwner(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.gif`,data.username+"#"+data.discriminator,id); }, function(){ loadOwner(`https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,data.username+"#"+data.discriminator,id) } );
        })
}

const getGuild = (guildID) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("../guild/"+guildID, requestOptions)
        .then(response => response.text())
        .then(result => {
            document.title = JSON.parse(result).name + " - Server Information"
            getAvatar(JSON.parse(result).owner_id, JSON.parse(result).name, JSON.parse(result).id)
        }).catch(error => console.log('error', error)
    );
}

const getStats = (guildID) => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("../guild/stats/"+guildID, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result)
            loadStat("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABjUlEQVR4nO3aMQ6CQBRFUXagsTcmdiYmaqOxcjuzEbbCNnEDxsAI+eA/xe0fw6lgmvvz1StvTfQAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAHQb7a7qqJ3AzDVQzZNVdG7AQAAAAAAmBRAKaXvuu5jpRQA/jEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACB6AAAAAAAAAAAAAAAAAACQHcD+cJy8WgBzbLncHuFnvGgAtde3hjYGwBydztfwMwYAAAAAWAGAby9rLbVtCwAAAAAAAAAAAAAAAAAAsIBzXgUA3wEAAAAAAFIB8DcwOYBZHrISQPRuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGABhT9G4AAAAAAAB+rvYCZ/RuAASAABAAAkAACAABIAAEgAAQAAJAAAgAASAABIAAEAACQAAIAAEgAASAABAAAkAACAABIAAEQPYASB4AyQMgeW/8OpHNZsXtxgAAAABJRU5ErkJggg==","Prefix: "+data.prefix,"")
            loadStat("data:image/png;base64,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","Member Count: "+data.member_count,"")
            loadStat("data:image/png;base64,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","Region: "+data.region,"")
        }).catch(error => console.log('error', error)
    );
}

const loadOwner = (img, name, id) => {
    document.querySelector(".ownerlist").innerHTML = `<div class="owner"><div class="ownerinfo"><img class="ownericon" id='${id}' src="${img}"><span class="ownertext">${name}</span></div></div>`;
}
const loadStat = (img, name, id) => {
    document.querySelector(".statslist").innerHTML += `<div class="stat"><div class="statinfo"><img class="staticon" id='${id}' src="${img}"><span class="stattext">${name}</span></div></div>`;
}

const getEdit = () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("../guilds/?token="+localStorage.getItem("token"), requestOptions)
        .then(response => response.text())
        .then(result => {
            JSON.parse(result).forEach(element => {
                if(element.id == window.location.search.substr(1)) {
                    if(element.owner == "true") {
                        document.querySelector(".statslist").innerHTML += `<h1 class="title">Edit Bot</h1>`
                        document.querySelector(".statslist").innerHTML += `<div class="stat"><div class="statinfo"><img class="staticon"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD2ElEQVR4nO3dT0sicRzH8TkMVKiULTs3KQwLQdrWxZYEiR5AnXoKUbeCmGseOzb3ILCOnTLwljBQnXxO3z2E4qijTk37m/n93of3ZfuDw+c1KTY7Wbt7+0LmZql+AAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAASAb61aq8tGqSyFteKg9eKm/Pr9V/ljA8A3D19YK4pt22JZ1sSWV1YTDwEAnxw/k82FDj+cbduyUSorf8wAUDD+cOXKjvLHDoBvGN9xHPE8T3zfl16vJ71eT+7v7+Xw8DDweQuLS1Kt1ZUfAwBiHD+fz8vb29tg+NFOT08Dn79e3FR+HACIcfyTkxNptVqhAHzfF8dxBl+TyeaUHwsAYhzfdV1xXXcqgsvLy8DXqj4eAMQ8/iwEnucl+sUgAGIYfxqC6+vrwPdI2vsCAIhp/DAEoy8EVR8bAGIcv91uS6vVCkXQ6XQC32f1x0/lxweAGMfvn+W3t7djH7+7u5NGo5Ho538AxDB+t9uVZrMZ+Pj5+blsbW2N/V5A9TECQNH4mWwuke8CAuA/jG/btlS2/yg/TgAwPgAYHwCMbzoAxjcYAOMbDCDK+I+Pj0aMbwyAqO/t9wHoPr4RACaN32g0Jr6HP9zNzc3Yv+k2vvYAwsbvX7/Xbrdn/nZP5/G1BhD2Y//i4kJeXl4Gz/HzINB1fG0BzHrObzab0u1250Kg8/haApj3Bd88CHQfXzsAUV/tT0NgwvhaAfjsZVyTEJgyvjYAvnIN3ygC3/fl4ODAiPG1APDV8YcRPD09jV3GpfP4qQcQ1/gmPedrA4DxDQbA+AYDYHyDATC+wQAY32AAjG84gMJakfFNBVCt1QO3YiuVSoxvEoDRs9/zvEgXcjB+igGMnv2O48jr62ukq3kYP8UARs/+q6urwM0XZiFg/BQDmHT2D9+LbxYCxk85gFln/zQEjJ9yAPOe/ZMQML4GAKKc/cM9PDwwvg4Aop79nU5n7G5cjJ9SABul8txnf9jwjJ9iAMM//sPO/mnDW9bHnbkZXwMAZ2dn8v7+Hmn4JP9xhiSWOAD9p4BCoSCu+/GfNJ+fnxneFAC7e/uysLgklmXJ0dGRHB8fSz6fZ3iTAFS2/0z9Y0wMrzmAPoLlldXA8JlsjuFNAdCvWqtLubKTuNus61LiARAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgAJgeAAwPAIYHAMMDgOH9A7BQTV5hOqKuAAAAAElFTkSuQmCC"><span class="stattext">Edit the Bot's Server Settings</span></div><button onclick="alert('Coming soon! lmao')" class="buttonspacer button">Edit</button></div>`;
                    } else {
                        document.querySelector(".statslist").innerHTML += `<h1 class="title">Edit Bot</h1>`
                        document.querySelector(".statslist").innerHTML += `<div class="stat"><div class="statinfo"><img class="staticon"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAD2ElEQVR4nO3dT0sicRzH8TkMVKiULTs3KQwLQdrWxZYEiR5AnXoKUbeCmGseOzb3ILCOnTLwljBQnXxO3z2E4qijTk37m/n93of3ZfuDw+c1KTY7Wbt7+0LmZql+AAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAASAb61aq8tGqSyFteKg9eKm/Pr9V/ljA8A3D19YK4pt22JZ1sSWV1YTDwEAnxw/k82FDj+cbduyUSorf8wAUDD+cOXKjvLHDoBvGN9xHPE8T3zfl16vJ71eT+7v7+Xw8DDweQuLS1Kt1ZUfAwBiHD+fz8vb29tg+NFOT08Dn79e3FR+HACIcfyTkxNptVqhAHzfF8dxBl+TyeaUHwsAYhzfdV1xXXcqgsvLy8DXqj4eAMQ8/iwEnucl+sUgAGIYfxqC6+vrwPdI2vsCAIhp/DAEoy8EVR8bAGIcv91uS6vVCkXQ6XQC32f1x0/lxweAGMfvn+W3t7djH7+7u5NGo5Ho538AxDB+t9uVZrMZ+Pj5+blsbW2N/V5A9TECQNH4mWwuke8CAuA/jG/btlS2/yg/TgAwPgAYHwCMbzoAxjcYAOMbDCDK+I+Pj0aMbwyAqO/t9wHoPr4RACaN32g0Jr6HP9zNzc3Yv+k2vvYAwsbvX7/Xbrdn/nZP5/G1BhD2Y//i4kJeXl4Gz/HzINB1fG0BzHrObzab0u1250Kg8/haApj3Bd88CHQfXzsAUV/tT0NgwvhaAfjsZVyTEJgyvjYAvnIN3ygC3/fl4ODAiPG1APDV8YcRPD09jV3GpfP4qQcQ1/gmPedrA4DxDQbA+AYDYHyDATC+wQAY32AAjG84gMJakfFNBVCt1QO3YiuVSoxvEoDRs9/zvEgXcjB+igGMnv2O48jr62ukq3kYP8UARs/+q6urwM0XZiFg/BQDmHT2D9+LbxYCxk85gFln/zQEjJ9yAPOe/ZMQML4GAKKc/cM9PDwwvg4Aop79nU5n7G5cjJ9SABul8txnf9jwjJ9iAMM//sPO/mnDW9bHnbkZXwMAZ2dn8v7+Hmn4JP9xhiSWOAD9p4BCoSCu+/GfNJ+fnxneFAC7e/uysLgklmXJ0dGRHB8fSz6fZ3iTAFS2/0z9Y0wMrzmAPoLlldXA8JlsjuFNAdCvWqtLubKTuNus61LiARAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgABAACAAEAAIAAYAAQAAgAJgeAAwPAIYHAMMDgOH9A7BQTV5hOqKuAAAAAElFTkSuQmCC"><span class="stattext">Edit the Bot's Server Settings</span></div><button class="buttonspacer button" style="background-color: grey;">Only the Server Owner can edit the Bot!</button></div>`;
                    }
                }
            });
        }).catch(error => console.log('error', error)
    );
}

const checkAvatar = (src, good, bad) => {
    var img = new Image();
    img.onload = good; 
    img.onerror = bad;
    img. src = src;
}

getGuild(window.location.search.substr(1))
getStats(window.location.search.substr(1))
getEdit();
