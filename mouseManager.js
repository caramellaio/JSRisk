function mouse_manager(_players,_regions) {
    var array_func = [
            function(reg){
                if(reg.parent_id == self.turn_index){
                    reg.path.classList.remove()
                }
            },
            function(reg){

            }
    ];
    var self = this;
    this.turn_index = 0;
    this.players = _players;
    var reset_on_click = function (region) {
        region.path.onClick = function () { region.path.onClick(); self.on_click(region);}
    }

    this.on_click = function (region) {
        for (var i = 0; i < array_func.length; i++) {

        }
    }

    this.reset_on_clicks = function () {
        for(var i = 0;i< self.players.length;i++){
            for (var k = 0; k < self.players[i].regions.length; k++) {
                reset_on_click(self.players[i].regions[k]);
            }
        }
    }
}

function turn_manager(players,region){

}