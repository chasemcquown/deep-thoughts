// import User and Thought models
const { User, Thought } = require('../models')

const { AuthenticationError } = require('apollo-server-express');

const { signToken } = require('../utils/auth')

const resolvers = {

    Query: {

        // returns user that is signed in
        me: async (parent, args, context) => {
            // the following conditional statement checks for the existence of context.user, which is what we are using to verify whether or not a user is signed in
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('thoughts')
                .populate('friends');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },

        // return all thoughts associated with a specific username
        thoughts: async (parent, {username}) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 })
        },

        // return a single thought based on ID
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },

        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        },

        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('friends')
            .populate('thoughts');
        }

    },

    Mutation: {
        
        // create a user
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
        },

        // allow user to login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },

        // create a thought
        addThought: async (parent, args, context) => {
            // we only want to allow users that are logged in to create thoughts, which is why we check for the existence of context.user
            // also note that context also includes everything we need  to know about a user, which is why we can set username equal to contex.user.username
            if (context.user) {
              const thought = await Thought.create({ ...args, username: context.user.username });
          
              await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { thoughts: thought._id } },
                { new: true }
              );
          
              return thought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },

        // create a reaction (reply) to a thought
        addReaction: async (parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
              const updatedThought = await Thought.findOneAndUpdate(
                { _id: thoughtId },
                { $push: { reactions: { reactionBody, username: context.user.username } } },
                { new: true, runValidators: true }
              );
          
              return updatedThought;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },

        // allow logged in users to add friend(s)
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                // NOTE: a user can't be friends with the same person twice, though, hence why we're using the $addToSet operator instead of $push to prevent duplicate entries
                { $addToSet: { friends: friendId } },
                { new: true }
              ).populate('friends');
          
              return updatedUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        }
    }

};

module.exports = resolvers;

// NOTES: 
// resolver is a SINGLE function that will return every single piece of data associated with a user