const {Router} = require("express")
const { createNotebook, getNotebooks } = require("../Controllers/notebookController")

const router = Router()

router.post('/', createNotebook);
router.get('/', getNotebooks)



module.exports = {
    router
}


