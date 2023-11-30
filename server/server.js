const  express=require('express')
const app=express()
const mongoose=require('mongoose')
const postmodel=require('./postschema')
const cors=require("cors")

//midaleware
app.use(express.json({limit:"30mb", extended : true}));
app.use(express.urlencoded({ extended: false }));
app.use(cors())


app.listen(process.env.PORT || 3082,(err)=>
{
if(!err)
{
       console.log("servre connect 3082 port");
}
else
{
       console.log(err);
}

})

mongoose.connect("mongodb://localhost/instcomment", (err) => {
  if (!err) {
    console.log("connected to Database");
  } else {
    console.log(err);
  }
});

app.post("/addComment/:postId", async (req, res) => {
       try {
         const postId = req.params.postId;
         const { text, username } = req.body;
     
         const post = await postmodel.findById(postId);
         if (!post) {
           return res.status(404).json({ error: "Post not found" });
         }
     
         // Add new comment to the post
         post.comments.push({ text, username });
         await post.save();
     
         res.json(post);
       } catch (error) {
         res.status(500).json({ error: "Internal Server Error" });
       }
     });
     



app.post("/post",(req,res)=>{
  
       postmodel.create({
                  
              name:req.body.name,
              location:req.body.location,
              likes:req.body.likes,
              postimage:req.body.postimage,
              descripation:req.body.descripation,
              date:req.body.date
              //some change done

    }).then(()=> { 
       res.status(200).send( "added successfully"); 
   }).catch((err)=> {
       res.status(400).send(err.message)
})
})

app.get("/post", (req, res)=> {
       postmodel.find().then((itemData)=> {
           res.status(200).send({item: itemData});
       }).catch((err)=> {
              res.status(400).send(err.message)
       })
   });



   


