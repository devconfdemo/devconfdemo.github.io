sessionStorage["hosted-signin"] = "true";

document.addEventListener('alpine:init', async () => {
    setTimeout(function(){
        //By default draftsman will not wait for teleports
        Draftsman.contains_teleports = false;
        //Optionally you can disable data caching for this page
        //Draftsman.disable_cache_for_page();
    },1);
});

$vui.config = {
    namespace: 'ui'
}
$vui.config.importMap = {
    "*": '/components/${path}${component}.html'
}

// The next two functions are only used for the generated demo-main-page

function update_toc_highlight(element){
    let pos = 1000;
    let active = "";
    element.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(x => {
        let top = Math.abs(x.getBoundingClientRect().top - 50);
        if (top < pos){
          pos = top;
          active = x.id;
        }
    });
    if (active != ""){
        document.querySelectorAll(".toc").forEach(x => {
            x.classList.remove("active");
        });
        document.getElementById("handle-" + active).classList.add("active");
    }
}

function create_toc(element){
    let toc = [];
    let indexes = [-1,-1,-1,-1,-1,-1];
    function update_index(position){
        indexes = indexes.map((element,index) => {
            if (index < position){
                return element;
            } else if (index == position){
                return element + 1;
            } else {
                return -1;
            }
        });
    }
    element.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(x => {
    let position = parseInt(x.nodeName.replace('H','')) - 1;
    let item = {
        title: x.innerText,
        id: x.id,
        toc: []
    };
    switch(position) {
        case 0:
            toc.push(item);
            break;
        case 1:
            toc[indexes[0]].toc.push(item);
            break;
        case 2:
            toc[indexes[0]].toc[indexes[1]].toc.push(item);
            break;
        case 3:
            toc[indexes[0]].toc[indexes[1]].toc[indexes[2]].toc.push(item);
            break;
        case 4:
            toc[indexes[0]].toc[indexes[1]].toc[indexes[2]].toc[indexes[3]].toc.push(item);
            break;
        case 5:
            toc[indexes[0]].toc[indexes[1]].toc[indexes[2]].toc[indexes[3]].toc[indexes[4]].toc.push(item);
            break;
        default:
        // pass
        }
        update_index(position);
    });
    setTimeout(function(){
        update_toc_highlight(element);
    },100);
    return toc;
}

const Experimental = {
    sign_out: function(){
        let logout_uri = `${localStorage["aws-congnito-ui"]}/logout?client_id=${localStorage["aws-congnito-app-id"]}&logout_uri=${window.location.origin}`;
        for(var i in localStorage){
            localStorage.removeItem(i);
        }
        location = logout_uri;
    },
    update_credentials: function(target_location){
        if (target_location){
            sessionStorage["prevLoc"] = target_location;
        } else {
            sessionStorage["prevLoc"] = location;
        }
        Draftsman.clear_cache();
        location = `${localStorage["aws-congnito-ui"]}/logout?client_id=${localStorage["aws-congnito-app-id"]}&logout_uri=${window.location.origin}/auth`;
    },
    show_trace_modal: function(){
        let modal = new bootstrap.Modal(document.getElementById("traceModal"), {});
        modal.show();
    }
}