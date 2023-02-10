export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,

    ) {  }

    // getter for token
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) 
            return null;
        return this._token;
    }

    // getter for token expiration date
    get tokenExpirationDate() {
        return this._tokenExpirationDate;
    }
}