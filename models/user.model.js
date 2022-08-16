const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
    {
        pseudo : {
            type : String,
            required : true,
            minLength :3,
            maxLength : 55,
            unique : true,
            trim : true
        },
        email : {
            type : String,
            required : true,
            validate : [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
          },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
          },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"
          },
        bio :{
            type: String,
            max: 1024,
          },
        followers: {
            type: [String]
          },
        following: {
            type: [String]
          },
        likes: {
            type: [String]
          }
        },
        {
        timestamps: true,
        }
      )

//Fonction de hashage passeword avant de sauvgarder à la BD

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
} )

userSchema.statics.login = async function(email, password) {
  const user = this.findOne({email})
  if(user) {
    const auth = await bcrypt.compare(password, user.password)
    if(auth) {
      return user
    }
    throw Error('incorrect password')
  }
  throw Error('incorrect email')
}

const UserModel = mongoose.model("user", userSchema)
module.exports = UserModel