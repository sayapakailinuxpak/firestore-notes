
const authorId = 'dr-seuss'
const bookId = 'lorax'

// 7. Middle Man Collection - not shown in UI  but specifies relationship between collections
const userReviews = db.collection('reviews').where('author', '==', authorId)
const bookReviews = db.collection('reviews').where('book', '==', bookId)


// Single Read with composite key 
const specificReview = db.collection('reviews').doc(`${bookId}_${authorId}`)


// 8. Map - reviews embedded on books
const bookWithReviews = db.collection('books').doc(bookId)
const userReviews = db.collection('books').orderBy('reviews.jeff-delaney')

// 9. Array 
const books = db.collection('books').where('categories', 'array-contains', 'fiction')

// 10. Bucket
// Get a collection of documents with an array of IDs

const getLikedBooks = async() => {

    // Get books through user likes
    const userLikes = await db.collection('likes').orderBy('jeff-delaney').get();
    const bookIds = userLikes.docs.map(snap => snap.id);

    const bookReads = bookIds.map(id => db.collection('books').doc(id).get() );
    const books = Promise.all(bookReads)
}


// listening to events:
// onCreate, onUpdate, onDelete, onWrite 
// onWrite is triggered when onCreate, onUpdate or onDelete is triggered

// Custom claims VS Role-based auth: role based auth is good when you have global auth rules to apply 
// but when content itself must define who has access to it, use access control lists 
//e.g: if you sell a digital product and only want users that have paid for it to be able to download it

// ROLE BASED authorization: user collection > user doc > array of roles (roles = strings)
// roles can be defined as map instead if saving additional info about each role directly on the doc
// but you must add rules to make it work
// to lockdown a certain collection, match path to collection in the db
// & write function to get the user doc in order to determine what role they have
// Rules function: match /posts/{document} {
//function getRoles() {
//   return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.roles;
// }
// allow read;
// allow update: if getRoles().hasAny(['admin', 'editor']) == true;
// allow write: if getRoles().hasAny(['admin']) == true;
// }


// CUSTOM CLAIMS - alternative to role-based auth
// use custom claims directly on the user auth record 
// you have to write backend code to use firebase admin sdk to add an additional object
// with some custom properties to the firebase auth record 
// one way to do this is to embed members directly on product doc using user id's
// example of rule: match /posts/{document} { allow read;
// allow write: if resource.data.members.hasAny(request.auth.uid); }
// so user can only write to doc, if their user id already exists on the doc


 