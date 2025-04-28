function createResult(error, data) {

    if(data) {

        return createSuccessResult(data)
    } else {
        return createErrorResult(error)
    }
}
function createSuccessResult(data) {
    
    let result = {

        status: "Success",
        data: data
    }
    return result
}
function createErrorResult(error) {

    let result = {

        status: "error",
        error: error
    }
    return result
}

module.exports = {createResult, createSuccessResult, createErrorResult}