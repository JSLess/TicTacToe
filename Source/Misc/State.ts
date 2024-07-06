
export { database , sessions , users }


const database = await Deno.openKv('./Data/Database.db');


const sessions = new Map<string,string>

const users = new Map<string,User>


interface User {
    match ?: Match
}

interface Match {

}
