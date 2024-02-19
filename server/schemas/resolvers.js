const { User, Location } = require("../models");
const { signToken, AuthenticationError, getToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("locations");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("locations");
    },
    locations: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Location.find(params).sort({ createdAt: -1 });
    },
    location: async (parent, { locationId }) => {
      return Location.findOne({ _id: locationId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("locations");
      }
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addLocation: async (parent, { locationText, locationAuthor }) => {
      const location = await Location.create({ locationText, locationAuthor });

      await User.findOneAndUpdate(
        { username: locationAuthor },
        { $addToSet: { locations: location._id } }
      );

      return location;
    },
    addIdea: async (parent, { locationId, ideaText, ideaAuthor }) => {
      return Location.findOneAndUpdate(
        { _id: locationId },
        {
          $addToSet: { ideas: { ideaText, ideaAuthor } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeLocation: async (parent, { locationId }) => {
      return Location.findOneAndDelete({ _id: locationId });
    },
    removeIdea: async (parent, { locationId, ideaId }) => {
      return Location.findOneAndUpdate(
        { _id: locationId },
        { $pull: { ideas: { _id: ideaId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
