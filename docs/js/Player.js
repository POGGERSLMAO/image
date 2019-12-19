class Player
{
    constructor(pos, speed, prevX, prevY, size, unCrouched, crouched, facing)
    {
        this.pos = pos;
        this.size = size || new Vector(2, 2);
        this.speed = speed;
        this.xOverlap = 4;
        this.xSpeed = 8;
        this.ySpeed = 16;
        this.prevX = prevX;
        this.prevY = prevY;
        this.crouched = crouched || 0;
        this.unCrouched = unCrouched || 0;
        this.facing = facing || "left";

        

    }

    static create(pos)
    {
        return new Player(pos.plus(new Vector(0, -1)), new Vector(0, 0));
    }

    get type()
    { 
        return "player";
    }

    update = function(time, state, keys)
    {
        let currentXSpeed = 0;
        if (keys.ArrowLeft || keys.KeyA) currentXSpeed -= this.xSpeed;
        if (keys.ArrowRight || keys.KeyD) currentXSpeed += this.xSpeed;
        let pos = this.pos;
        let crouchSize = this.size;
        let movedX = pos.plus(new Vector(currentXSpeed * time, 0));

        if (!state.level.touches(movedX, this.size, groundTypes)) {
            pos = movedX;
        }

        let currentYSpeed = this.speed.y + time * gravity;
        let movedY = pos.plus(new Vector(0, currentYSpeed * time));

        if (keys.KeyC) {
            crouchSize = new Vector(2, 0.99);
            console.log(keys.KeyC);
            
            if (this.crouched == 0) {
                pos.y = (pos.y -1.01);
                this.crouched = 1;
                this.unCrouched = 0;
            }   
        else if (this.unCrouched == 0 && this.crouched == 1) {
            pos.y = (pos.y -1.01);
            crouchSize = new Vector(2,2);
            this.unCrouched = 1;
        }
        }   else if (this.crouched == 1) {
            pos.y = (pos.y -1.01);
            crouchSize = new Vector(2,2);
            this.crouched = 0;
            this.unCrouched = 1;
        }

        if (!state.level.touches(movedY, this.size, groundTypes)) {
            pos = movedY;
        } else if ( (keys.ArrowUp || keys.KeyW) && currentYSpeed > 0) {
            if (currentYSpeed > 25) {
                state.health = Math.floor(state.health - currentYSpeed);
                console.log("ouch cant dodge by uparrow " + state.health); // call on function for taking damage                
            }
            currentYSpeed = -this.ySpeed;
        } else {
            if (currentYSpeed > 25) {
                state.health = Math.floor(state.health - currentYSpeed);
                console.log("ouch " + state.health); // call on function for taking damage                
            }
            currentYSpeed = 0;
        }

        return new Player(pos, new Vector(currentXSpeed, currentYSpeed), 
                                        this.prevX, this.prevY, crouchSize, 
                                        this.unCrouched, this.crouched, this.facing);
    }
}