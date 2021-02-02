let token = undefined;
const loginPopup = ({url, title, w, h}) => {
    const dualScreenLeft = window.screenLeft !==  undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !==  undefined   ? window.screenTop  : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title, `scrollbars=yes,width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`)
    if (window.focus) newWindow.focus();
}

const HandlePopupResult = (result) => {
    token = result;
    localStorage.setItem("token", result);
}

const getGuilds = async () => {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("../guilds?token="+localStorage.getItem("token"), requestOptions)
        .then(response => response.text())
        .then(result =>  {
            let invite = []
            JSON.parse(result).forEach(element => {
                if(element.hasBot == "true") {
                    document.querySelector(".serverlist").innerHTML += `<div class="server"><div class="serverinfo"><img class="servericon" id='${element.id}' src="data:image/png;base64,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"><span class="servertext">${element.name}</span></div><button class="buttonspacer button" onclick="selectGuild('${element.id}')">Select</button></div>`;
                
                    getGuildIcon(element.id,element.icon,element.name);
                } else {
                    invite.push(`{"id":"${element.id}","icon":"${element.icon}","name":"${element.name}"}`);
                }
            });
            
            document.querySelector(".serverlist").innerHTML += `<h1 class="title">Invite the Bot to your servers</h1>`
            invite.forEach(element => {
                let data = JSON.parse(element)
                document.querySelector(".serverlist").innerHTML += `<div class="server"><div class="serverinfo"><img class="servericon" id='${data.id}' src="data:image/png;base64,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"><span class="servertext">${data.name}</span></div><button class="buttonspacer button" style="background-color: grey;" onclick="invite('${data.id}')">Invite</button></div>`;
                getGuildIcon(data.id,data.icon,data.name);
            })
            document.querySelector(".serverlist").innerHTML += `<div class="server"><div class="serverinfo"><img class="servericon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAE7ElEQVR4nO3aT0ybdRzH8Sfk2WDYCTRmEhBYyh9pUmZlQTMuZkfiYfHkhZvowQM7k3DDmyFmHjhxgpNHlhiXmC4BjUYThMUYTDFxzlRoYAurdSNG8vWgP/KUlra/50+fP33/kvftyfi1n1fZRjDeuPGWUPNm+H0BAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAamIAI6Nj0jeQKGlkdEzGJyYrPp9MpcueHxxOnvt8FIocgPGJSekbSIhpmmIYRsVM05Se3v7TYWs9bxiGXHm5J5IQIgUgde26tLZdqjqktda2S/JC7HLdz5umKclU2vfXCYBzxq/1KXarkdEx318vACyNT0yWffJ7W0xZjnXLbldC9uNDsh8fkt2uhCzHuqW3pRxKb4spC+0vyVbn1bLn02Zr2XeC115/0/fXDYD/6+ntLxno5oX2kuHPttuVkJsX2kue/6qjv+rzH7Z1lXyNjs64768bADf++/Rbh0mbrVXHP4ugFhZrVjSGYUTiu0DoAQwOJ0tGWY511zXmfnxIHl55VR51J+t+/vMXXyn5Wn0DCd9ff9MDOPvtv94x7Wb990AU/hoIPYCOzvjpILcuxjwHcOtiDABBCgBNDCCZSpf9989rANZ/CJqmKYPDSd/fh6YDkEylSz751j673OPZ+FudV8/9iWJYIYQKQLXhDcOQ6elp+W7xU88AZBc+lvn5+ao/Wg4bhFAAqGf4TCYjuVxOcrmc/PHRouvj77373umfv729HRkIgQagO7y17+c+cW38nXfer/g1ogAhkACcDH/3QV4WNw5k4f6hrN2+43j8b9/+QBbuH8rixoHcfZCPHITAAXBjeGtOEKjxrTmFELQfHwcOgFvDO0VQaXw3IATt9wkCDWBqasrR8HYR1BpfB8Ls7CwA7AJYWlpyPLwuAp3x64GQyWQA4AYAJ8PXi8Du+NUgAMAhALeGr4XAjfErQQCAAwBf//SbrO8euTpMJQRuj6+6ly3KL/sFANgFsPXzr1IoFCT/5KknENZu3/Fk/HvZojx+9o+IiDz58xgAdgF888OPUigUTvMKghfDq3NwVASAXQBrX3xZAiCoECoNr87e46cAsAtgdXW1IoCgQKg2vDqPcnsA8AqAXxDqGR4ADQTQKAg6wwPABwBeQbAzvDoPf88BoNEA3ILgZHh1stksAPwCYBeCG8OrAwDdC3kAoF4Ibg6vDgB0L+QhgPMgeDG8OgDQvVADAJz213N59veJg3lrHwDoXqgBAI6Pj+XkxNvh1QGA7oU8BNDI4dUBgO6FPADgx/DqAED3Qi4C8HN4dQCgeyEXAARheHUAoHshBwCCNLw6ANC9kA0AQRxeHQDoXkgDQJCHVwcAuheqA0AYhlcHALoXqgIgTMOrAwDdC1UAEMbh1QGA7oUsb9bGxkZoh1cnn88DwC6A9fV1B299ME6xyK+F2wawubnp4K0Pxjk8PASAXQA7OzsO3vpgnKOjIwDYBTAzMyMrKyuhbm5uDgB2AUQxAADA9/c40AA6OuORLnXtuu/vcaABEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABgABAACAAEAAIAAQAAgABoOkDQJP3L1RviBnV1gjuAAAAAElFTkSuQmCC"><span class="servertext">Server not listed? Invite anyway!</span></div><button class="buttonspacer button" style="background-color: grey;" onclick="invite('0')">Invite</button></div>`;
            document.querySelector(".spinner").style.display = "none";
        }).catch(error => console.log('error', error)
    );
}

const getGuildIcon = async (guildID,icon,name) => {
    if(icon != "null") {
        document.getElementById(guildID).src = `https://cdn.discordapp.com/icons/${guildID}/${icon}.png`
    } else {
        let match = /\s/.exec(name);
        if (match) {
            name = name[0]+name[match.index+1];
        } else {
            name = name.substring(0,1);
        }
        let tCtx = document.getElementById('genCanvas').getContext('2d')
        tCtx.canvas.width = 128;
        tCtx.canvas.height = 128;
        tCtx.fillStyle = "#36393F";
        tCtx.fillRect(0, 0, tCtx.canvas.width, tCtx.canvas.height);
        tCtx.fillStyle = "#D7D9DA";
        tCtx.font = "50px sans-serif";
        tCtx.textAlign = "center"; 
        tCtx.fillText(name, 64, 80);
        document.getElementById(guildID).src = tCtx.canvas.toDataURL()
    }
}

const selectGuild = (guildID) => {
    window.location.href = './guild?'+guildID
}
const invite = (guildID) => {
    loginPopup({url: 'https://discord.com/api/oauth2/authorize?client_id=746037195428724837&permissions=2147483639&scope=bot&guild_id='+guildID, title: 'Discord Invite', w: 500, h: 800})
}





if(localStorage.getItem("token") == null) {
    window.setInterval(function(){
        if(localStorage.getItem("token") != null) {
            window.location.reload(false); 
        }
    }, 500);
    loginPopup({url: '../login', title: 'Discord Login', w: 500, h: 800})
} else {
    getGuilds();
}