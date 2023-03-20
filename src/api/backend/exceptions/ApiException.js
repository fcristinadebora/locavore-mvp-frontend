class ApiException {
    constructor (message, errorCode, httpCode, errors, fullResult) {
        this.message = message
        this.errors = errors
        this.errorCode = errorCode
        this.httpCode = httpCode
        this.fullResult = fullResult
    }
}

export default ApiException;