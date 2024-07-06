
export { isDocument }

import { Request } from 'Oak'


function isDocument (
    request : Request
){

    const { headers } = request

    const destination = headers
        .get('sec-fetch-dest')

    return ( destination === 'document' )
}
