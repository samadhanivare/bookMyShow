
function createResult(error, data) {
    const result = {}
    console.log(result)
    if (error) {
        result['status'] = 'error'
        result['error'] = error
    } else {
        result['status'] = 'success'
        result['data'] = data
    }

    return result
}

module.exports = {
    createResult: createResult
}