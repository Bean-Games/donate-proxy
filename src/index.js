/* Dependencies */
import fetch from 'node-fetch'
import express from 'express'
import pkg from 'body-parser'

/* Constants */
const app = express()
const PORT = 4000

const urlToFetch = "https://inventory.roblox.com/v2/users/{0}/inventory/2"
const fetchOptions = {
    method: "GET",
    headers: {
        "content-type": 'application/json'
    }
}

const { json } = pkg
const parser = json()

/* Formatter function */
String.prototype.format = function () {
    let args = arguments;

    return this.replace(/{([0-9]+)}/g, function (match, index) {
        return typeof args[index] == 'undefined' ? match : args[index];
    })
}

/* Methods */
app.get('/inventory', parser,
    async (req, res) => {
        res.append('Content-Type', 'application/json')

        try {
            let id = req.body.playerid

            fetch(urlToFetch.format(toString(id)), fetchOptions).then((data) => {
                res.send(data.json())
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