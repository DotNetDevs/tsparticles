import {IRemove} from "../../../../Interfaces/Options/Interactivity/Modes/IRemove";

export class Remove implements IRemove {
    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     */
    public get particles_nb(): number {
        return this.quantity;
    }

    /**
     *
     * @deprecated this property is obsolete, please use the new quantity
     * @param value
     */
    public set particles_nb(value) {
        this.quantity = value;
    }

    public quantity: number;

    constructor() {
        this.quantity = 2;
    }
}