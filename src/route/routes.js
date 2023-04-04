const router = require("express").Router();
const Pmodel = require("../model/photomodel")

router.get("/", async(req,res)=>{
    try {
        const photos = await Pmodel.find({}).sort({_id:-1});
        res.json({
            status:"successfull",
            photos,
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.post("/post", async(req,res)=>{
    try {
        const {imageurl, label} = req.body;
        if(!imageurl || !label){
            return res.json({
                status:"Enter all details"
            })
        }
        const result = await Pmodel.create({
            label:label,
            imageurl:imageurl
        })
        res.json({
            status:"successfull",
            result 
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.get("/search/:label", async(req,res)=>{
    try {
        const {label} = req.params;
        if(!label){
            return res.json({
                status:"Enter a lebel to search"
            })
        }
        const result = await Pmodel.find({label:label});
        res.json({
            status:"successfull",
            result
        })
    } catch (error) {
        console.log(error.message);
    }
})

router.delete("/delpost/:id", async(req,res)=>{
    try {
        const {id} = req.params;
        const result = await Pmodel.deleteOne({_id:id});
        res.json({
            status:"successfull",
            result
        })
    } catch (error) {
        console.log(error.message);    
    }
})

module.exports = router;