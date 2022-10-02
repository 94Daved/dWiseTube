import { createError } from "../error.js";
import User from "../model/User.js";
import Video from "../model/Video.js";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can update only your account"));
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("User has been deleted");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "You can delete only your account"));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscriberdUsers: req.params.id },
    }); // (here is ME) i AM, adding the channelId of the page we want to subscribe to
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 },
    });
    res.status(200).send("Subscription successful");
  } catch (error) {
    next(error);
  }
};

export const unSubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscriberdUsers: req.params.id },
    });
    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 },
    });
    res.status(200).send("Unsubscription successful");
  } catch (error) {
    next(error);
  }
};

export const like = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { disLikes: id },
    });
    res.status(200).send("The video has been liked");
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoId;

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { disLikes: id },
      $pull: { likes: id },
    });
    res.status(200).send("The video has been disliked");
  } catch (error) {
    next(error);
  }
};
