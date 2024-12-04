export default class Address {

    private _street: string = ""
    private _number: string = ""
    private _zip: string = ""
    private _city: string = ""
    private _complement: string = ""
    private _state: string = ""

    constructor(street: string, number: string, zip: string, city: string, complement: string, state: string) {
        this._street = street
        this._number = number
        this._zip = zip
        this._city = city
        this._complement = complement
        this._state = state
        this.validate();
    }

    get street(): string {
        return this._street
    }

    get number(): string {
        return this._number
    }

    get zip(): string {
        return this._zip
    }

    get city(): string {
        return this._city
    }

    get complement(): string {
        return this._complement
    }

    get state(): string {
        return this._state
    }

    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required")
        }
        if (this._number.length === 0) {
            throw new Error("Number is required")
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required")
        }
        if (this._city.length === 0) {
            throw new Error("City is required")
        }
    }

}