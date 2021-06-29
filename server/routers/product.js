const express = require('express');
const router = express.Router();
const db = require('../firebase');

// router.get('/getAllCategories', async (req, res) => {
//     try {
//         let idList = [];
//         let categoryList = []
//         const categories = await db.collection('categories').get();
//         const category = await db.collection('categories');
//         const categoriesList = await categories.docs.map(data => data.data())
//         const idCategoriesList = await categories.docs.map(data => data.data())

//         console.log(categoriesList)
//         res.send({
//             categoriesList: categoriesList,
//         })
//     } catch (error) {
//         res.send({
//             message: 'Can not get categories list'
//         })
//     }
// });

router.post('/createCategory', async (req, res) => {
    const { id, name } = req.body;
    try {
        let temp = await db.collection('categories').add({
            id: id,
            name: name
        });
        res.send({
            message: 'Create new category successful'
        })
    } catch (error) {
        res.send({
            message: `Add ${category.name} fail`
        })
    }
})

router.put('/updateCategory', async (req, res) => {
    const { category, item } = req.body;
    try {
        await db.collection('categories').doc(item.idDoc).set({
            id: category.id,
            name: category.name
        });
        res.send({
            message: 'Update successful'
        })
    } catch (error) {
        res.send({
            message: `Update ${item.name} failed`
        })
    }
});

router.delete('/deleteCategory', async (req, res) => {
    const {category} = req.body;
    try {
        await db.collection('categories').doc(category.idDoc).delete();
        res.send({
            message: 'Delete successful'
        })
    } catch (error) {
        res.send({
            message: `Delete ${category.name} failed`
        })
    }
})

module.exports = router;