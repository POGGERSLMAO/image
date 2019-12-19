class npc
{
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
        this.size = new Vector(1, 1);
    }

    get type()
    {
        return "npc";
    }

    static create(pos, color, speed) 
    {
        if (speed ) {
            return new npc(pos, speed);
        } else {
            return new npc(pos, new Vector(0, 0));
        }
    }

    collide = function(state, keys)
    {
        if (keys.KeyG) {
            let npc = state.npc + 1;
            console.log("gabba blahgg blahgg " + npc);
            let filtered = state.actors.filter(a => a != this);
            return new State(state.level, filtered, state.status, state.score, npc);
        }
        return state;
    }

    update = function(time, state)
    {
        let newPos = this.pos.plus(this.speed.times(time));
        return new npc(newPos, this.speed);
    }
    
}