import axios from "axios"


const yahoo = async () => {
    try {
        const res = await axios.get("http://www.yahoo.com")
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

console.log(yahoo())
