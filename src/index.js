/* Dependencies */
import fetch from 'node-fetch'
import express from 'express'
import pkg from 'body-parser'

/* Constants */
const app = express()
const PORT = 4000

const fetchOptions = {
    method: "GET",
    headers: {
        "content-type": 'application/json'
    }
}

const { json } = pkg
const parser = json()

/* Methods */
app.all('/', (req, res) => res.send("Thanks!"))

app.get('/inventory/:id', parser,
    async (req, res) => {
        res.append('Content-Type', 'application/json')

        try {
            let id = req.params.id
            const urlToFetch = `https://www.roblox.com/users/inventory/list-json?assetTypeId=2&cursor=&itemsPerPage=100&pageNumber=1&sortOrder=Desc&userId=${id}`
          
            fetch(urlToFetch, fetchOptions).then((data) => {
                data.json().then(d => {
                  res.send(d)
                })
            }).catch(err => console.log(err))
        } catch (error) {
            res.send({
                error: error
            })
        }
    }
)

/* Listener */
app.listen(PORT, () => console.log('Came to life master uwu!'))