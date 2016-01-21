var selected;
function init_g() {
    var paths;
    document.getElementsByTagName("h1")[0].className="pressed"
    paths = document.getElementById("it").contentDocument.children[0].getElementsByTagName("g")[0].getElementsByTagName("path");
    for ( var i = 0;i<paths.length;i++){
        var path = paths[i];
        path.onclick = function(path){
            return function(){
                if(path.selected===undefined)
                    path.selected=false;
                path.selected=!path.selected;
                selected = path;
                path.classList.remove(path.selected?"land":"pressed");
                path.classList.add(path.selected?"pressed":"land");
                console.log("pressed");
            }
        }(path);
        
        
    }
    return paths;
}

