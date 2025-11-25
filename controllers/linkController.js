const { nanoid } = require("nanoid");
const links = require("../models/linkModel");

// Create link 
exports.createLinkController = async (req, res) => {
    console.log("inside linkController API");

    const {originalUrl} = req.body;
    try {
        const existingUrl = await links.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(409).json({
                message: "Short URL already exists",
                data: existingUrl
            });
        }
        // -----------Generate short code--------
        const shortCode = nanoid(6);
     const newLink = new links({
            originalUrl,
            shortCode,
            totalClicks: 0,
            lastClicked: null,
            createdAt: new Date()
        });
        await newLink.save();
        res.status(200).json({
            message: "Short URL created successfully",
            data: newLink
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// List all links
exports.allLinkController = async (req,res)=>{
console.log("inside allLinkController");
try{
   
const allUrl = await links.find()
res.status(200).json(allUrl)  
}catch(err){
res.status(500).json(err)
}
}

// Stats for one code - find one code 
exports.statsController = async (req, res) => {
  const { code } = req.params; 
  try {
    const link = await links.findOne({ shortCode: code });
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    res.status(200).json({
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
      totalClicks: link.totalClicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Delete link
exports.deleteUrlController = async (req, res) => {
  const { code } = req.params; 
  try {
    const link = await links.findOneAndDelete({ shortCode: code });
    if (!link) {
      return res.status(404).json( "Link not found" );
    }
    res.status(200).json("Successfully deleted")
  } catch (err) {
    res.status(500).json(err);
  }
};