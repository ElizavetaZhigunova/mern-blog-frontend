import PostModel from "../models/Post.js"


export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить статьи',
    });
  }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();
        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        
        PostModel.findOneAndUpdate(
            {
              _id: postId,
            },
            {
              $inc: { viewsCount: 1 },
            },
            {
              returnDocument: 'after',
            }
          )
            .then((doc) => {
              res.json(doc);
            })
            .catch((err) => {
              console.log(err);
              res.status(404).json({ message: 'Статья не найдена' });
            });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось получить статьи"
        })
    }
}

export const remove = async (req, res) => {
    PostModel.findByIdAndDelete(req.params.id)
      .then(() => {
        res.send({ message: 'Post deleted successfully.' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Error deleting post.' });
      });
  };
        

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })

        const post = await doc.save()

        res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Не удалось создать статью"
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id
       await PostModel.updateOne({
            _id: postId
        }, {
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            user: req.userId,
            tags: req.body.tags
        })
      .then(() => {
        res.send({ message: 'Post updated successfully.' });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({ message: 'Error updating post.' });
      });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Не удалось обновить статью"})
    }
}