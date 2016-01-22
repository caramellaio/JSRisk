var neig_gesture,rgn;
function void_region(){return {tank:1,player:null,path:null}}
function region(_n_tanks,_player,_path){
    var self = this;
    this.n_tanks=_n_tanks;
    this.player=_player;
    this.path=_path;
    this.selected=false;
    this.atk=function(el){
        var a =[], b=[];
        for(var i=0;i<self.n_tanks;i++)
            a.push(Math.floor((Math.random()*6)+1));
        
        for(var i=0;i<el.n_tanks;i++)
            b.push(Math.floor((Math.random()*6)+1));
        
        a.sort();
        b.sort();
        console.log("a="+a);
        console.log("b="+b);
        for(var i=0;i< Math.min(Math.min(a.length,b.length),3);i++){
            (a[i]>b[i]?el:self).n_tanks--;
            console.log(a[i]+" "+b[i]);
        }
        console.log("self:"+self.n_tanks+" el="+el.n_tanks);
    
    }
    
    // click zone
    this.click=function(){
        console.log(self.path);
        if(self.selected===undefined)
            self.selected=false;
        self.selected=!self.selected;
        // continue here, remember: u don't need neighbourds
        self.path.classList.remove(self.selected?"land":"pressed");
        self.path.classList.add(self.selected?"pressed":"land");
        console.log("pressed");
    }
    
    this.path.onclick=function(){
        
        self.click();
    }
    
    this.path.onmouseover=function(){
        //console.log("move_over");
        self.path.classList.remove(self.selected?"pressed":"land");
        self.path.classList.add("mouseover");
        neig_gesture.mouse_over = self;
    }
    
    this.path.onmouseout=function(){
        //console.log("move out");
        self.path.classList.remove("mouseover");
        self.path.classList.add(self.selected?"pressed":"land");
        neig_gesture.mouse_out = self;
    }
    //end click zone
}

function a(){
    neig_gesture = new neig_gest();
    rgn = [];
    var paths = document.getElementById("it").contentDocument.children[0].getElementsByTagName("g")[0].getElementsByTagName("path");
    for(var i=0;i<paths.length;i++)
        rgn.push(new region(3,null,paths[i]));
    rgn[0].atk(rgn[1]);
}
