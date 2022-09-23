import Video from "../model/Video.js";
import User from "../model/User.js";

import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });

  try {
    const savedVideo = await newVideo.save();
    res.status(200).send(savedVideo);
  } catch (error) {
    next(error);
  }
};
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).send(updatedVideo);
    }
  } catch (error) {
    return next(createError(403, "You can only update your video"));
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    await Video.findByIdAndDelete(req.params.id);

    return res.status(200).send("Video has been delelted!");
  } catch (error) {
    return next(createError(403, "You can only delete your video"));
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    return res.status(200).send(video);
  } catch (error) {
    next(error);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdUpate(req.params.id, {
      $inc: { views: 1 },
    });
    return res.status(200).send("The view has been added");
  } catch (error) {
    next(error);
  }
};

export const random = async (req, res, next) => {
  try {
    const randVideos = await Video.aggregate([{ $sample: { size: 40 } }]);
    return res.status(200).send(randVideos);
  } catch (error) {
    next(error);
  }
};
export const trend = async (req, res, next) => {
  try {
    const trendVideos = await Video.find().sort({ views: -1 });
    return res.status(200).send(trendVideos);
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscriberdChannels = user.subscriberdUsers;

    const list = await Promise.all(
      subscriberdChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    return res
      .status(200)
      .send(list.flat().sort((a, b) => a.createdAt - b.createdAt));
  } catch (error) {
    next(error);
  }
};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
