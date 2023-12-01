const { Book, User } = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw AuthenticationError
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password })
            const token = signToken(user)

            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email })

            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password)

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user)
            return { token, user}
        },
        saveBook: async (parent, { user, body }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );

                if (!updatedUser) {
                    throw new Error('User not found');
                }
        
                return updatedUser;
            }
            throw AuthenticationError
        },
        removeBook: async (parent, { user, bookId }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: user },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                )
            }
            throw AuthenticationError
        }
    }
}

module.exports = resolvers