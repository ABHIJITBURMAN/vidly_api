const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{ useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: authorSchema
}));

async function createCourse(name, author) {
  const course = new Course({
    name, 
    author
  }); 
  try{
    const result = await course.save();
    console.log(result);
  }
  catch(err){
    console.log(err.message);
  }
  
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}
async function addAuthor(courseId, author){
  try{
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
    console.log(course);
  }
  catch(err){
    console.log(err.message);
  }
}
async function removeAuthor(courseId, authorId){
  try{
    const course = await Course.findById(courseId);
    const author = course.authors.id(authorId);
    author.remove();
    course.save();
    console.log(course);
  }
  catch(err){
    console.log(err.message);
  }
}
async function updateAuthor(courseId){
  try{
    const course = await Course.findById(courseId);
    course.author.name='Abhijit Burman';
    course.save();
  }
  catch(err){
    console.log(err.message);
  }
  
}
createCourse('Node Course', new Author({ name: 'Mosh'}));
// updateAuthor('5febba7acdb0e93b74d7e21e');
// removeAuthor('5febbe18d59fc90c409171ac','5febbe18d59fc90c409171aa');